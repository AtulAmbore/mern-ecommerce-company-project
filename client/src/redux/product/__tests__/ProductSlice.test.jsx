import { describe, it, expect } from "vitest";
import reducer from "../ProductSlice";
import { getProductsThunk } from "../ProductThunk";

describe("ProductSlice", () => {
  const initialState = {
    getProductsState: {
      isLoading: false,
      isError: false,
      error: null,
      products: [],
    },
  };

  it("should return the initial state", () => {
    const state = reducer(undefined, { type: undefined });
    expect(state).toEqual(initialState);
  });

  it("should handle getProductsThunk.pending", () => {
    const action = { type: getProductsThunk.pending.type };

    const state = reducer(initialState, action);

    expect(state.getProductsState.isLoading).toBe(true);
    expect(state.getProductsState.isError).toBe(false);
  });

  it("should handle getProductsThunk.fulfilled", () => {
    const mockProducts = [
      { _id: "1", title: "iPhone", price: 1000 },
      { _id: "2", title: "Samsung", price: 900 },
    ];

    const action = {
      type: getProductsThunk.fulfilled.type,
      payload: { products: mockProducts },
    };

    const state = reducer(initialState, action);

    expect(state.getProductsState.isLoading).toBe(false);
    expect(state.getProductsState.products).toEqual(mockProducts);
  });

  it("should handle getProductsThunk.rejected", () => {
    const action = {
      type: getProductsThunk.rejected.type,
      payload: { msg: "Failed to fetch products" },
    };

    const state = reducer(initialState, action);

    expect(state.getProductsState.isLoading).toBe(false);
    expect(state.getProductsState.isError).toBe(true);
    expect(state.getProductsState.error).toBe("Failed to fetch products");
  });

  it("should keep previous products if pending is triggered again", () => {
    const prevState = {
      getProductsState: {
        isLoading: false,
        isError: false,
        error: null,
        products: [{ _id: "1", title: "MacBook" }],
      },
    };

    const action = { type: getProductsThunk.pending.type };

    const state = reducer(prevState, action);

    expect(state.getProductsState.isLoading).toBe(true);
    expect(state.getProductsState.products).toHaveLength(1);
  });
});
