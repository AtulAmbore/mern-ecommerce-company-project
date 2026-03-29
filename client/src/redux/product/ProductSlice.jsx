import { createSlice } from "@reduxjs/toolkit";
import { getProductsThunk } from "./ProductThunk";

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    getProductsState: {
      isLoading: false,
      isError: false,
      error: null,
      products: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    // get products
    builder
      .addCase(getProductsThunk.pending, (state) => {
        state.getProductsState.isLoading = true;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.getProductsState.isLoading = false;
        state.getProductsState.products = action.payload.products;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.getProductsState.isLoading = false;
        state.getProductsState.isError = true;
        state.getProductsState.error = action.payload.msg;
      });
  },
});

export default ProductSlice.reducer;
