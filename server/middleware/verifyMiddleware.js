import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import { userModel } from "../models/authModel.js";

configDotenv();

const { ACCESS_TOKEN_SECRET } = process.env;

export const verifyUserMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    // console.log("verifyUserMiddleware - ", accessToken);
    if (!accessToken) {
      return res
        .status(400)
        .json({ success: false, msg: "Backend - Access Token not available" });
    }

    const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    if (!decode) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid access token" });
    }

    const userId = decode.userId;

    const existingUser = await userModel.findById(userId);

    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "User not available" });
    }
    req.user = existingUser; // ✅ attach user
    next();
  } catch (err) {
    // console.log("verifyUserMiddleware catch - clearCookie");
    res.clearCookie("accessToken");
    return res.status(500).json({
      success: false,
      msg: `Backend - Invalid or expired token - Server error during verify - ${err.message}`,
    });
  }
};
