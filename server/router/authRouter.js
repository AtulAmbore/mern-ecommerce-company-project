import express from "express";
import {
  loginController,
  logoutController,
  refreshController,
  signupController,
} from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.post("/login", loginController);
authRouter.post("/signup", signupController);
authRouter.post("/logout", logoutController);
authRouter.post("/refresh", refreshController);
