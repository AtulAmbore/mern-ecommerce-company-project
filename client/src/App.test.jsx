import { vi } from "vitest";

// ✅ mock FIRST
vi.mock("./components/Navbar", () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));

vi.mock("./pages/AuthPage", () => ({
  AuthPage: () => <div data-testid="auth-page">Auth Page</div>,
}));

import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import App from "./App";
import authReducer from "./redux/auth/AuthSlice";
import cartReducer from "./redux/cart/CartSlice";

// PARTIAL MOCK (keeps loginThunk etc.)

vi.mock("./redux/auth/AuthThunks", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,

    refreshThunk: createAsyncThunk("auth/refresh", async () => {
      return { msg: "ok" };
    }),

    loginThunk: createAsyncThunk("auth/login", async () => {
      return { user: { name: "Atul" } };
    }),
  };
});

// helper store
const createTestStore = (preloadedState) =>
  configureStore({
    reducer: {
      authKey: authReducer,
      cart: cartReducer,
    },
    preloadedState,
  });

describe("App", () => {
  test("renders AuthPage when user is not logged in", () => {
    const store = createTestStore({
      authKey: {
        loginState: {
          isLogin: false,
          isLoading: false,
          isError: false,
          error: null,
          user: null,
        },
      },
      cart: {
        cartState: {
          items: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId("auth-page")).toBeInTheDocument();
  });

  test("renders Navbar and Outlet when user is logged in", () => {
    const store = createTestStore({
      authKey: {
        loginState: {
          isLogin: true,
          isLoading: false,
          isError: false,
          error: null,
          user: { name: "Atul" },
        },
      },
      cart: {
        cartState: {
          items: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("outlet-container")).toBeInTheDocument();
  });

  test("renders outlet container when logged in", () => {
    const store = createTestStore({
      authKey: {
        loginState: {
          isLogin: true,
          isLoading: false,
          isError: false,
          error: null,
          user: { name: "Atul" },
        },
      },
      cart: {
        cartState: {
          items: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId("outlet-container")).toBeInTheDocument();
  });
});

/*
OR
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

import App from "./App";
import authReducer from "./redux/auth/AuthSlice";
import cartReducer from "./redux/cart/CartSlice";

// mock refresh thunk so useEffect does not break
// vi.mock("./redux/auth/AuthThunks", async (importOriginal) => {
//   const actual = await importOriginal();

//   return {
//     ...actual,
//     refreshThunk: () => ({
//       unwrap: () => Promise.resolve({ msg: "ok" }),
//     }),
//   };
// });

// mock Navbar
vi.mock("./components/Navbar", () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));

// mock AuthPage
vi.mock("./pages/AuthPage", () => ({
  AuthPage: () => <div data-testid="auth-page">Auth Page</div>,
}));

// helper store
const createTestStore = (preloadedState) =>
  configureStore({
    reducer: {
      authKey: authReducer,
      cart: cartReducer,
    },
    preloadedState,
  });

describe("App", () => {
  test("renders AuthPage when user is not logged in", () => {
    const store = createTestStore({
      authKey: {
        loginState: {
          isLogin: false,
          isLoading: false,
          isError: false,
          error: null,
          user: null,
        },
      },
      cart: {
        cartState: {
          isLoading: false,
          isError: false,
          error: null,
          cartProducts: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId("auth-page")).toBeInTheDocument();
  });

  test("renders Navbar and Outlet when user is logged in", () => {
    const store = createTestStore({
      authKey: {
        loginState: {
          isLogin: true,
          isLoading: false,
          isError: false,
          error: null,
          user: { name: "Atul" },
        },
      },
      cart: {
        cartState: {
          isLoading: false,
          isError: false,
          error: null,
          cartProducts: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("outlet-container")).toBeInTheDocument();
  });

  test("renders outlet container when logged in", () => {
    const store = createTestStore({
      authKey: {
        loginState: {
          isLogin: true,
          isLoading: false,
          isError: false,
          error: null,
          user: { name: "Atul" },
        },
      },
      cart: {
        cartState: {
          isLoading: false,
          isError: false,
          error: null,
          cartProducts: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId("outlet-container")).toBeInTheDocument();
  });
});

*/
