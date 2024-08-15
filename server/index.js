import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cron from "node-cron";

import authRoute from "./route/authRoute.js";
import userRoute from './route/userRoute.js'
import adminRoute from './route/adminRoute.js'

import userModel from "./models/userModel.js";

app.use(cookieParser());

const allowedOrigins = [
  "https://etsubprinting.onrender.com",
  "https://adminet.onrender.com",
  "http://localhost:5173",
];

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        // Allow requests from the allowed origins or requests with no origin
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(bodyParser.json());
dotenv.config();
const parseRawReqBody = express.raw({
  limit: 10,
  type: ["image/jpeg", "image/png", "image/jpg"],
});
app.use("/files", express.static("files"));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

cron.schedule("* * * * *", async () => {
  const now = new Date();
  try {
    const result = await userModel.updateMany(
      { otpExpires: { $lt: now } },
      { $unset: { otp: "", otpExpires: "" } }
    );
    // console.log(`OTP fields cleared for ${result.email} users`);
  } catch (error) {
    console.error("Error clearing OTP fields:", error);
  }
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "server error";
  res.status(status).json({
    status: false,
    message: message,
  });
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  mongoose
    .connect(process.env.MONGODB)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));
});
