import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartThunk,
  decCartProductQtyThunk,
  emptyCartThunk,
  getCartThunk,
  incCartProductQtyThunk,
  removeFromCartThunk,
} from "./CartThunk";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartState: {
      isLoading: false,
      isError: false,
      error: null,
      cartProducts: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // addToCart
    builder
      .addCase(addToCartThunk.pending, (state) => {
        state.cartState.isLoading = true;
      })
      .addCase(addToCartThunk.fulfilled, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.cartProducts = action.payload.cart.items;
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.isError = true;
        state.cartState.error = action.payload.msg;
      });

    // increaseCartProductQuantity
    builder
      .addCase(incCartProductQtyThunk.pending, (state) => {
        state.cartState.isLoading = true;
      })
      .addCase(incCartProductQtyThunk.fulfilled, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.cartProducts = action.payload.cart.items;
      })
      .addCase(incCartProductQtyThunk.rejected, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.isError = true;
        state.cartState.error = action.payload.msg;
      });

    // decreaseCartProductQuantity
    builder
      .addCase(decCartProductQtyThunk.pending, (state) => {
        state.cartState.isLoading = true;
      })
      .addCase(decCartProductQtyThunk.fulfilled, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.cartProducts = action.payload.cart.items;
      })
      .addCase(decCartProductQtyThunk.rejected, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.isError = true;
        state.cartState.error = action.payload.msg;
      });

    // removeFromCart
    builder
      .addCase(removeFromCartThunk.pending, (state) => {
        state.cartState.isLoading = true;
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.cartProducts = action.payload.cart.items;
      })
      .addCase(removeFromCartThunk.rejected, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.isError = true;
        state.cartState.error = action.payload.msg;
      });

    // emptyCart
    builder
      .addCase(emptyCartThunk.pending, (state) => {
        state.cartState.isLoading = true;
      })
      .addCase(emptyCartThunk.fulfilled, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.cartProducts = action.payload.cart.items;
      })
      .addCase(emptyCartThunk.rejected, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.isError = true;
        state.cartState.error = action.payload.msg;
      });

    // getCartProducts
    builder
      .addCase(getCartThunk.pending, (state) => {
        state.cartState.isLoading = true;
      })
      .addCase(getCartThunk.fulfilled, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.cartProducts = action.payload.cart.items;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.cartState.isLoading = false;
        state.cartState.isError = true;
        state.cartState.error = action.payload.msg;
      });
  },
});

export default CartSlice.reducer;
