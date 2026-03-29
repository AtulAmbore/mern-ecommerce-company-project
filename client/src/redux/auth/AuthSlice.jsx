import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  signupThunk,
  refreshThunk,
} from "./AuthThunks";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loginState: {
      isLogin: false,
      isLoading: false,
      isError: false,
      error: null,
      user: null,
    },
    signupState: {
      isSignup: false,
      isLoading: false,
      isError: false,
      error: null,
    },
    verifyState: {
      isLoading: false,
    },
  },
  reducers: {
    resetLoginState(state, action) {
      state.loginState.isLogin = false;
      state.loginState.isLoading = false;
      state.loginState.isError = false;
      state.loginState.error = null;
      state.loginState.user = null;
    },
    resetSignupState(state, action) {
      state.signupState.isLogin = false;
      state.signupState.isLoading = false;
      state.signupState.isError = false;
      state.signupState.error = null;
    },
    resetRefreshState(state, action) {
      state.verifyState.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loginState.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loginState.isLoading = false;
        state.loginState.isLogin = true;
        state.loginState.user = action.payload.user;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loginState.isLoading = false;
        state.loginState.isError = true;
        state.loginState.error = action.payload.msg;
      });

    // Logout
    builder
      .addCase(logoutThunk.pending, (state) => {
        state.loginState.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.loginState.isLoading = false;
        state.loginState.isLogin = false;
        state.loginState.user = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loginState.isLoading = false;
        state.loginState.isError = true;
        state.loginState.error = action.payload.msg;
      });

    // Signup
    builder
      .addCase(signupThunk.pending, (state) => {
        state.signupState.isLoading = true;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.signupState.isLoading = false;
        state.signupState.isSignup = true;
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.signupState.isLoading = false;
        state.signupState.isError = true;
        state.signupState.error = action.payload.msg;
      });

    // Verify
    builder
      .addCase(refreshThunk.pending, (state) => {
        state.loginState.isLoading = true;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.loginState.isLoading = false;
        state.loginState.isLogin = true;
        state.loginState.user = action.payload.user;
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.loginState.isLoading = false;
        state.loginState.isError = true;
        state.loginState.error = action.payload.msg;
      });
  },
});

export default AuthSlice.reducer;
export const { resetLoginState, resetSignupState, resetRefreshState } =
  AuthSlice.actions;
