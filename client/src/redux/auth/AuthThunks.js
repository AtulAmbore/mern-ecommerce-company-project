import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/axiosInstance";

export const loginThunk = createAsyncThunk(
  "/api/auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", loginData);
      const data = await response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const signupThunk = createAsyncThunk(
  "/api/auth/signup",
  async (signupData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/signup", signupData);
      const data = await response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "/api/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/logout");
      const data = await response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  "/api/auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/auth/refresh");
      const data = await response.data;
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
