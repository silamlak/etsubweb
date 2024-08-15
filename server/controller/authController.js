import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { sendConfirmationEmail } from "../emailController.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const createUser = async (req, res, next) => {
  await body("first_name")
    .not()
    .isEmpty()
    .withMessage("First name is required")
    .run(req);
  await body("father_name")
    .not()
    .isEmpty()
    .withMessage("Father name is required")
    .run(req);
  await body("ethPhone")
    .not()
    .isEmpty()
    .withMessage("Phone is required")
    .run(req);
  await body("email")
    .isEmail()
    .withMessage("Please include a valid email")
    .run(req);
  await body("password")
    .isLength({ min: 8 })
    .withMessage("Please enter a password with 8 or more characters")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { first_name, father_name, ethPhone, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ first_name, father_name, ethPhone, email, password });

    const salt = bcrypt.genSaltSync(10); // Use bcryptjs' genSaltSync
    user.password = bcrypt.hashSync(password, salt); // Use bcryptjs' hashSync

    await user.save();

    await createOtp(email, "Confirmation Code");

    res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const createOtp = async (email, msg) => {
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };
  console.log(email);
  try {
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 3600000);
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { otp, otpExpires } },
      { new: true }
    );
    console.log(user);
    await sendConfirmationEmail(email, otp, msg);
  } catch (error) {
    // next(error);
    console.log(error);
  }
};

export const confirmOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the user by email
    const user = await User.findOne({ email }).session(session);

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // Check if OTP matches and is not expired
    if (user.otp && user.otp === otp && user.otpExpires > Date.now()) {
      // Clear the OTP and otpExpires fields
      await User.findOneAndUpdate(
        { email },
        { $unset: { otp: "", otpExpires: "" } },
        { new: true },
        { session }
      );

      await User.updateOne(
        { email },
        { $set: { confirmed: true } },
        { new: true },
        { session }
      );

      await session.commitTransaction();
      session.endSession();
      return res.status(200).json({ msg: "OTP confirmed successfully" });
    } else {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  await body("email")
    .isEmail()
    .withMessage("Please include a valid email")
    .run(req);
  await body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (user.confirmed === false) {
      return res.status(400).json({ msg: "Confirmation needed" });
    }

    const isMatch = bcrypt.compareSync(password, user.password); // Use bcryptjs' compareSync
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        father_name: user.father_name,
        ethPhone: user.ethPhone,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const refresh = async (req, res) => {
  const cookies = req.cookies;
  console.log("Cookies:", cookies?.jwt);

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized First" });
  }

  const refreshToken = cookies.jwt;

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        }
      );
    });

    console.log("Decoded:", decoded);

    const foundUser = await userModel.findById(decoded.user.id).exec();

    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    const payload = {
      user: {
        id: foundUser._id,
        email: foundUser.email,
        first_name: foundUser.first_name,
        father_name: foundUser.father_name,
        ethPhone: foundUser.ethPhone,
      },
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });

    res.json(accessToken);
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Forbidden" });
    }
    console.error("Error during token refresh:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const requestPasswordReset = async (req, res, next) => {
  // Validate request body
  await body("email")
    .isEmail()
    .withMessage("Please include a valid email")
    .run(req);
    console.log(req.body.email)

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    if (user.confirmed === false) {
      return res.status(400).json({ msg: "unconfirmed account" });
    }

    const generateOTP = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };
    const resetToken = generateOTP();

    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour

    // Save the reset token and expiration to the user's document
    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    // Send the reset token to the user's email
    await sendConfirmationEmail(email, resetToken, 'Reset Code');

    res
      .status(200)
      .json({ msg: "Password reset link has been sent to your email" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const resetPassword = async (req, res, next) => {
  // Validate request body
  await body("resetToken")
    .not()
    .isEmpty()
    .withMessage("Reset token is required")
    .run(req);
  await body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { resetToken, password } = req.body;

  try {
    // Find the user by reset token
    const user = await User.findOne({
      resetToken,
      resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid or expired reset token" });
    }

    // Hash the new password and save it
    const salt = bcrypt.genSaltSync(10); // Use bcryptjs' genSaltSync method
    user.password = bcrypt.hashSync(password, salt); // Use bcryptjs' hashSync method

    // Clear reset token and expiration
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    res.status(200).json({ msg: "Password has been successfully reset" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};