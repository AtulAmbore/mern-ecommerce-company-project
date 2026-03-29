import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

export const getProductsThunk = createAsyncThunk(
  "/api/products",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/products");
      const data = await response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);
