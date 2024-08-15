import adminUserModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const admincreateUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await adminUserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new adminUserModel({email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = {
      user: {
        id: user._id,
        email: user.email,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to `true` in production
      sameSite: "Strict", // Optional, adds additional security
      maxAge: 24 * 60 * 60 * 1000,
    });

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

