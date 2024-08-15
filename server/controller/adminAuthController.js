import adminUserModel from "../models/adminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const admincreateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await adminUserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new adminUserModel({ email, password });

    // Generate salt and hash the password using bcryptjs
    const salt = bcrypt.genSaltSync(10); // Use bcryptjs' synchronous method
    user.password = bcrypt.hashSync(password, salt); // Use bcryptjs' synchronous method

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const adminsignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await adminUserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Use bcryptjs to compare the password
    const isMatch = bcrypt.compareSync(password, user.password); // Use bcryptjs' synchronous method
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
        email: user.email,
      },
    };

    // Generate the JWT tokens
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // Set the refresh token as a cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to `true` in production
      sameSite: "Strict", // Optional, adds additional security
      maxAge: 60 * 60 * 1000,
    });

    // Respond with the access token
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export const adminrefresh = async (req, res) => {
  const cookies = req.cookies;
  console.log("Cookies:", cookies);

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
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

    const foundUser = await adminUserModel.findById(decoded.user.id).exec();

    if (!foundUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = {
      user: {
        id: foundUser._id,
        email: foundUser.email,
      },
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1m",
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

