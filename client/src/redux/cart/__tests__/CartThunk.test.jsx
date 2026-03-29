import { describe, it, expect, vi, beforeEach } from "vitest";
import { axiosInstance } from "../../../api/axiosInstance";

import {
  addToCartThunk,
  removeFromCartThunk,
  incCartProductQtyThunk,
  decCartProductQtyThunk,
  getCartThunk,
  emptyCartThunk,
} from "../CartThunk";

vi.mock("../../../api/axiosInstance", () => ({
  axiosInstance: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("CartThunk", () => {
  const dispatch = vi.fn();
  const getState = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("addToCartThunk success", async () => {
    const mockData = { msg: "Added to cart" };

    axiosInstance.post.mockResolvedValue({ data: mockData });

    const thunk = addToCartThunk({ productId: "1", quantity: 1 });

    const result = await thunk(dispatch, getState, undefined);

    expect(axiosInstance.post).toHaveBeenCalledWith("/api/cart/addToCart", {
      productId: "1",
      quantity: 1,
    });

    expect(result.payload).toEqual(mockData);
  });

  it("removeFromCartThunk success", async () => {
    const mockData = { msg: "Removed from cart" };

    axiosInstance.post.mockResolvedValue({ data: mockData });

    const thunk = removeFromCartThunk({ productId: "1" });

    const result = await thunk(dispatch, getState, undefined);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/api/cart/removeFromCart",
      { productId: "1" },
    );

    expect(result.payload).toEqual(mockData);
  });

  it("incCartProductQtyThunk success", async () => {
    const mockData = { msg: "Quantity increased" };

    axiosInstance.post.mockResolvedValue({ data: mockData });

    const thunk = incCartProductQtyThunk({ productId: "1" });

    const result = await thunk(dispatch, getState, undefined);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/api/cart/incCartProductQty",
      { productId: "1" },
    );

    expect(result.payload).toEqual(mockData);
  });

  it("decCartProductQtyThunk success", async () => {
    const mockData = { msg: "Quantity decreased" };

    axiosInstance.post.mockResolvedValue({ data: mockData });

    const thunk = decCartProductQtyThunk({ productId: "1" });

    const result = await thunk(dispatch, getState, undefined);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/api/cart/decCartProductQty",
      { productId: "1" },
    );

    expect(result.payload).toEqual(mockData);
  });

  it("getCartThunk success", async () => {
    const mockData = { cart: { items: [] }, msg: "Fetched cart" };

    axiosInstance.get.mockResolvedValue({ data: mockData });

    const thunk = getCartThunk();

    const result = await thunk(dispatch, getState, undefined);

    expect(axiosInstance.get).toHaveBeenCalledWith("/api/cart/getCartProducts");

    expect(result.payload).toEqual(mockData);
  });

  it("emptyCartThunk success", async () => {
    const mockData = { msg: "Cart emptied" };

    axiosInstance.post.mockResolvedValue({ data: mockData });

    const thunk = emptyCartThunk();

    const result = await thunk(dispatch, getState, undefined);

    expect(axiosInstance.post).toHaveBeenCalledWith("/api/cart/emptyCart");

    expect(result.payload).toEqual(mockData);
  });

  it("handles API error", async () => {
    const error = {
      response: { data: { msg: "Error occurred" } },
    };

    axiosInstance.post.mockRejectedValue(error);

    const thunk = addToCartThunk({ productId: "1", quantity: 1 });

    const result = await thunk(dispatch, getState, undefined);

    expect(result.payload).toEqual({ msg: "Error occurred" });
  });
});
