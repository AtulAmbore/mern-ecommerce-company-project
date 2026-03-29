import { cartModel } from "../models/cartModel.js";

export const addToCartController = async (req, res) => {
  const userId = req.user._id; // from auth middleware
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      msg: "Product ID is required",
    });
  }
  try {
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      cart = new cartModel({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId,
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }
    await cart.save();
    await cart.populate({
      path: "items.product",
      select: "title price thumbnail discountPercentage stock",
    });
    return res.status(200).json({
      success: true,
      cart,
      msg: "product added success",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

export const incCartQuantityController = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity = 1 } = req.body;
  if (!productId) {
    return res.status(400).json({
      success: false,
      msg: "Product ID is required",
    });
  }
  try {
    let cart = await cartModel.findOne({ user: userId });
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );
    cart.items[itemIndex].quantity += quantity;
    await cart.save();
    await cart.populate({
      path: "items.product",
      select: "title price thumbnail discountPercentage stock",
    });
    return res.status(200).json({
      success: true,
      cart,
      msg: "product quantity increase success",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

export const decCartQuantityController = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity = 1 } = req.body;
  if (!productId) {
    return res.status(400).json({
      success: false,
      msg: "Product ID is required",
    });
  }
  try {
    let cart = await cartModel.findOne({ user: userId });
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );
    cart.items[itemIndex].quantity -= quantity;
    await cart.save();
    await cart.populate({
      path: "items.product",
      select: "title price thumbnail discountPercentage stock",
    });
    return res.status(200).json({
      success: true,
      cart,
      msg: "product quantity decrease success",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

export const removeFromCartController = async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json({
      success: false,
      msg: "Product Id is required",
    });
  }
  try {
    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        msg: "Cart not found",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        msg: "Product not found in cart",
      });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    await cart.populate({
      path: "items.product",
      select: "title price thumbnail discountPercentage stock",
    });
    return res.status(200).json({
      success: true,
      cart,
      msg: "product remove success",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

export const getCartController = async (req, res) => {
  // console.log("getCartController");
  const userId = req.user._id;
  try {
    const cart = await cartModel.findOne({ user: userId }).populate({
      path: "items.product",
      select: "title price thumbnail discountPercentage stock",
    });
    // OR .populate("items.product")
    if (!cart) {
      return res.status(200).json({ success: true, cart: { items: [] } });
    }
    return res
      .status(200)
      .json({ success: true, cart, msg: "Got cart successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, msg: err.message });
  }
};

export const emptyCartController = async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  try {
    let cart = await cartModel.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        msg: "Cart not found",
      });
    }
    cart.items = []; // empty cart
    await cart.save();

    /*
  const cart = await cartModel.findOneAndUpdate(
      { user: userId },
      { $set: { items: [] } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        msg: "Cart not found",
      });
    }

    return res.status(200).json({
      success: true,
      cart,
      msg: "Cart emptied successfully",
    });
*/

    return res.status(200).json({
      success: true,
      cart,
      msg: "Order placed successfully and Cart emptied successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};
