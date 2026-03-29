import { configDotenv } from "dotenv";
import { userModel } from "../models/authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

configDotenv();

const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRE, NODE_ENV } = process.env;

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, msg: "Backend - Email not available" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, msg: "Backend - Password not available" });
    }

    const existingUser = await userModel.findOne({ email }).select("+password");

    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "Backend - Invalid Email" });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Backend - Invalid Password" });
    }

    const userId = existingUser._id;
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRE,
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: NODE_ENV === "production" ? "Strict" : "Lax",
      secure: NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const sendUser = existingUser.toObject();
    delete sendUser.password;
    delete sendUser._id;
    return res.status(200).json({
      success: true,
      user: sendUser,
      msg: "Backend - Login Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: `Backend - Server error during login - ${err.message}`,
    });
  }
};

export const signupController = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, msg: "Backend - Name not available" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ success: false, msg: "Backend - Email not available" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: false, msg: "Backend - Password not available" });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "Backend - User already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashPassword,
      isAdmin,
    });
    await newUser.save();
    const sendUser = newUser.toObject();
    delete sendUser.password;
    return res.status(200).json({
      success: true,
      user: sendUser,
      msg: "Backend - Signup Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: `Backend - Server error during signup - ${err.message}`,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(400)
        .json({ success: false, msg: "Access Token not available" });
    }

    const decode = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);

    if (!decode) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid access token" });
    }

    res.clearCookie("accessToken");

    return res.status(200).json({
      success: true,
      // user: sendUser,
      msg: "Backend - Logout Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: `Backend - Server error during logout - ${err.message}`,
    });
  }
};

export const refreshController = async (req, res, next) => {
  // console.log("refreshController");
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(400)
        .json({ success: false, msg: "Access Token not available" });
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
    // next();
    return res.status(200).json({
      success: true,
      user: existingUser,
      msg: "Backend - Token verified",
    });
  } catch (err) {
    res.clearCookie("accessToken");
    return res.status(500).json({
      success: false,
      msg: `Backend - Invalid or expired token - Server error during verify - ${err.message}`,
    });
  }
};

// Admin-only middleware
export const verifyAdminMiddleware = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res
      .status(403)
      .json({ success: false, msg: "Admin access required" });
  }
  next();
};
