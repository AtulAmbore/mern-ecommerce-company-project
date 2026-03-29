import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  loginThunk,
  signupThunk,
  logoutThunk,
  refreshThunk,
} from "../AuthThunks";
import { axiosInstance } from "../../../api/axiosInstance";

vi.mock("../../../api/axiosInstance", () => ({
  axiosInstance: {
    post: vi.fn(),
  },
}));

describe("AuthThunks", () => {
  const dispatch = vi.fn();
  const rejectWithValue = vi.fn((v) => v);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loginThunk success", async () => {
    const mockData = { user: { name: "Atul" } };

    axiosInstance.post.mockResolvedValue({
      data: mockData,
    });

    const result = await loginThunk(
      { email: "test@test.com", password: "123456" },
      { rejectWithValue },
    )(dispatch, () => {}, undefined);

    expect(axiosInstance.post).toHaveBeenCalledWith("/api/auth/login", {
      email: "test@test.com",
      password: "123456",
    });

    expect(result.payload).toEqual(mockData);
  });

  it("signupThunk success", async () => {
    const mockData = { msg: "User created" };

    axiosInstance.post.mockResolvedValue({
      data: mockData,
    });

    const result = await signupThunk(
      { email: "test@test.com", password: "123456" },
      { rejectWithValue },
    )(dispatch, () => {}, undefined);

    expect(result.payload).toEqual(mockData);
  });

  it("logoutThunk success", async () => {
    const mockData = { msg: "Logout success" };

    axiosInstance.post.mockResolvedValue({
      data: mockData,
    });

    const result = await logoutThunk(undefined, { rejectWithValue })(
      dispatch,
      () => {},
      undefined,
    );

    expect(axiosInstance.post).toHaveBeenCalledWith("/api/auth/logout");

    expect(result.payload).toEqual(mockData);
  });

  it("refreshThunk success", async () => {
    const mockData = { user: { name: "Atul" } };

    axiosInstance.post.mockResolvedValue({
      data: mockData,
    });

    const result = await refreshThunk(undefined, { rejectWithValue })(
      dispatch,
      () => {},
      undefined,
    );

    expect(axiosInstance.post).toHaveBeenCalledWith("/api/auth/refresh");

    expect(result.payload).toEqual(mockData);
  });

  it("loginThunk failure", async () => {
    const error = { msg: "Invalid credentials" };

    axiosInstance.post.mockRejectedValue({
      response: { data: error },
    });

    const result = await loginThunk(
      { email: "test@test.com", password: "wrong" },
      { rejectWithValue },
    )(dispatch, () => {}, undefined);

    expect(result.payload).toEqual(error);
  });
});
