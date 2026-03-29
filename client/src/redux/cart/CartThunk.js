import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

export const addToCartThunk = createAsyncThunk(
  "/api/cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/cart/addToCart", {
        productId,
        quantity,
      });
      const data = await response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// /api/cart/removeFromCart
export const removeFromCartThunk = createAsyncThunk(
  "/api/cart/removeFromCart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/cart/removeFromCart", {
        productId,
      });
      const data = await response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// /api/cart/incCartProductQty
export const incCartProductQtyThunk = createAsyncThunk(
  "/api/cart/incCartProductQty",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/cart/incCartProductQty", {
        productId,
      });
      const data = await response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

// /api/cart/decCartProductQty
export const decCartProductQtyThunk = createAsyncThunk(
  "/api/cart/decCartProductQty",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/cart/decCartProductQty", {
        productId,
      });
      const data = await response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getCartThunk = createAsyncThunk(
  "/api/cart/getCartProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/cart/getCartProducts");
      const data = await response.data;
      // console.log("getCartThunk - data");
      // console.log(data);
      // console.log("getCartThunk - data.cart");
      // console.log(data.cart);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const emptyCartThunk = createAsyncThunk(
  "/api/cart/emptyCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/cart/emptyCart");
      const data = await response.data;
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
