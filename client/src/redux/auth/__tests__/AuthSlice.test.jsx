import authReducer, {
  resetLoginState,
  resetSignupState,
  resetRefreshState,
} from "../AuthSlice";

import {
  loginThunk,
  logoutThunk,
  signupThunk,
  refreshThunk,
} from "../AuthThunks";

describe("AuthSlice", () => {
  const initialState = {
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
  };

  test("returns initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  // -----------------------------
  // Reset Reducers
  // -----------------------------

  test("resetLoginState works", () => {
    const modifiedState = {
      ...initialState,
      loginState: {
        isLogin: true,
        isLoading: true,
        isError: true,
        error: "error",
        user: { name: "Test" },
      },
    };

    const state = authReducer(modifiedState, resetLoginState());

    expect(state.loginState).toEqual(initialState.loginState);
  });

  test("resetSignupState works", () => {
    const modifiedState = {
      ...initialState,
      signupState: {
        isSignup: true,
        isLoading: true,
        isError: true,
        error: "error",
      },
    };

    const state = authReducer(modifiedState, resetSignupState());

    expect(state.signupState.isLoading).toBe(false);
    expect(state.signupState.isError).toBe(false);
    expect(state.signupState.error).toBe(null);
  });

  test("resetRefreshState works", () => {
    const modifiedState = {
      ...initialState,
      verifyState: { isLoading: true },
    };

    const state = authReducer(modifiedState, resetRefreshState());

    expect(state.verifyState.isLoading).toBe(false);
  });

  // -----------------------------
  // Login Thunk
  // -----------------------------

  test("loginThunk pending", () => {
    const action = { type: loginThunk.pending.type };
    const state = authReducer(initialState, action);

    expect(state.loginState.isLoading).toBe(true);
  });

  test("loginThunk fulfilled", () => {
    const action = {
      type: loginThunk.fulfilled.type,
      payload: { user: { name: "Atul" } },
    };

    const state = authReducer(initialState, action);

    expect(state.loginState.isLoading).toBe(false);
    expect(state.loginState.isLogin).toBe(true);
    expect(state.loginState.user).toEqual({ name: "Atul" });
  });

  test("loginThunk rejected", () => {
    const action = {
      type: loginThunk.rejected.type,
      payload: { msg: "Invalid credentials" },
    };

    const state = authReducer(initialState, action);

    expect(state.loginState.isError).toBe(true);
    expect(state.loginState.error).toBe("Invalid credentials");
  });

  // -----------------------------
  // Logout Thunk
  // -----------------------------

  test("logoutThunk fulfilled resets login", () => {
    const loggedInState = {
      ...initialState,
      loginState: {
        ...initialState.loginState,
        isLogin: true,
        user: { name: "Atul" },
      },
    };

    const action = { type: logoutThunk.fulfilled.type };

    const state = authReducer(loggedInState, action);

    expect(state.loginState.isLogin).toBe(false);
    expect(state.loginState.user).toBe(null);
  });

  // -----------------------------
  // Signup Thunk
  // -----------------------------

  test("signupThunk fulfilled sets signup true", () => {
    const action = { type: signupThunk.fulfilled.type };

    const state = authReducer(initialState, action);

    expect(state.signupState.isSignup).toBe(true);
  });

  // -----------------------------
  // Refresh Thunk
  // -----------------------------

  test("refreshThunk fulfilled sets login true", () => {
    const action = {
      type: refreshThunk.fulfilled.type,
      payload: { user: { name: "Atul" } },
    };

    const state = authReducer(initialState, action);

    expect(state.loginState.isLogin).toBe(true);
    expect(state.loginState.user).toEqual({ name: "Atul" });
  });
});
