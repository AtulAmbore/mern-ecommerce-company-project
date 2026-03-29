import { describe, it, expect } from "vitest";
import cartReducer from "../CartSlice";

import {
  addToCartThunk,
  incCartProductQtyThunk,
  decCartProductQtyThunk,
  removeFromCartThunk,
  emptyCartThunk,
  getCartThunk,
} from "../CartThunk";

const initialState = {
  cartState: {
    isLoading: false,
    isError: false,
    error: null,
    cartProducts: [],
  },
};

const mockItems = [
  { product: { _id: "1", title: "iPhone" }, quantity: 1 },
  { product: { _id: "2", title: "MacBook" }, quantity: 2 },
];

describe("CartSlice", () => {
  // addToCart
  it("handles addToCart pending", () => {
    const state = cartReducer(initialState, addToCartThunk.pending());

    expect(state.cartState.isLoading).toBe(true);
  });

  it("handles addToCart fulfilled", () => {
    const state = cartReducer(
      initialState,
      addToCartThunk.fulfilled({ cart: { items: mockItems } }),
    );

    expect(state.cartState.isLoading).toBe(false);
    expect(state.cartState.cartProducts).toEqual(mockItems);
  });

  it("handles addToCart rejected", () => {
    const state = cartReducer(
      initialState,
      addToCartThunk.rejected(null, null, null, { msg: "Error" }),
    );

    expect(state.cartState.isError).toBe(true);
    expect(state.cartState.error).toBe("Error");
  });

  // increase qty
  it("handles incCartProductQty fulfilled", () => {
    const state = cartReducer(
      initialState,
      incCartProductQtyThunk.fulfilled({ cart: { items: mockItems } }),
    );

    expect(state.cartState.cartProducts).toEqual(mockItems);
  });

  // decrease qty
  it("handles decCartProductQty fulfilled", () => {
    const state = cartReducer(
      initialState,
      decCartProductQtyThunk.fulfilled({ cart: { items: mockItems } }),
    );

    expect(state.cartState.cartProducts).toEqual(mockItems);
  });

  // remove from cart
  it("handles removeFromCart fulfilled", () => {
    const state = cartReducer(
      initialState,
      removeFromCartThunk.fulfilled({ cart: { items: [] } }),
    );

    expect(state.cartState.cartProducts).toEqual([]);
  });

  // empty cart
  it("handles emptyCart fulfilled", () => {
    const state = cartReducer(
      initialState,
      emptyCartThunk.fulfilled({ cart: { items: [] } }),
    );

    expect(state.cartState.cartProducts).toEqual([]);
  });

  // get cart
  it("handles getCart fulfilled", () => {
    const state = cartReducer(
      initialState,
      getCartThunk.fulfilled({ cart: { items: mockItems } }),
    );

    expect(state.cartState.cartProducts).toEqual(mockItems);
  });

  it("handles getCart rejected", () => {
    const state = cartReducer(
      initialState,
      getCartThunk.rejected(null, null, null, { msg: "Failed" }),
    );

    expect(state.cartState.isError).toBe(true);
    expect(state.cartState.error).toBe("Failed");
  });
});
