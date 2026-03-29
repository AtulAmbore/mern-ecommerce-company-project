import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { AuthPage } from "../AuthPage";
import authReducer from "../../redux/auth/AuthSlice";

// mock toast
vi.mock("react-hot-toast", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      authKey: authReducer,
    },
    preloadedState: {
      authKey: {
        loginState: {
          isLogin: false,
          isLoading: false,
          isError: false,
          error: null,
          user: {},
        },
      },
    },
  });

const renderAuthPage = () => {
  const store = createTestStore();

  render(
    <Provider store={store}>
      <AuthPage />
    </Provider>,
  );
};

describe("AuthPage", () => {
  test("renders login form by default", () => {
    renderAuthPage();

    expect(
      screen.getByPlaceholderText(/enter your email/i),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/enter your password/i),
    ).toBeInTheDocument();
  });

  test("switches to signup form", () => {
    renderAuthPage();

    fireEvent.click(screen.getAllByText(/signup/i)[0]);

    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
  });

  test("switches back to login form", () => {
    renderAuthPage();

    fireEvent.click(screen.getAllByText(/signup/i)[0]);
    fireEvent.click(screen.getAllByText(/login/i)[0]);

    expect(
      screen.getByPlaceholderText(/enter your email/i),
    ).toBeInTheDocument();
  });

  test("updates login input fields", () => {
    renderAuthPage();

    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);

    fireEvent.change(emailInput, {
      target: { value: "test@mail.com" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    expect(emailInput.value).toBe("test@mail.com");
    expect(passwordInput.value).toBe("123456");
  });

  test("renders admin toggle in signup form", () => {
    renderAuthPage();

    fireEvent.click(screen.getAllByText(/signup/i)[0]);

    expect(screen.getByText(/admin/i)).toBeInTheDocument();
  });
});
