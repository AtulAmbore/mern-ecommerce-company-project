import express from "express";
import {
  addToCartController,
  decCartQuantityController,
  emptyCartController,
  getCartController,
  incCartQuantityController,
  removeFromCartController,
} from "../controllers/cartController.js";
import { verifyUserMiddleware } from "../middleware/verifyMiddleware.js";

export const cartRouter = express.Router();

cartRouter.post("/addToCart", verifyUserMiddleware, addToCartController);

cartRouter.get("/getCartProducts", verifyUserMiddleware, getCartController);

cartRouter.post(
  "/removeFromCart",
  verifyUserMiddleware,
  removeFromCartController,
);

cartRouter.post(
  "/incCartProductQty",
  verifyUserMiddleware,
  incCartQuantityController,
);

cartRouter.post(
  "/decCartProductQty",
  verifyUserMiddleware,
  decCartQuantityController,
);

cartRouter.post("/emptyCart", verifyUserMiddleware, emptyCartController);
