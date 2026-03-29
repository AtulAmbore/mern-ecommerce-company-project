import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice";
import productsReducer from "./product/ProductSlice";
import cartReducer from "./cart/CartSlice";

export const AppStore = configureStore({
  reducer: {
    authKey: authReducer,
    productKey: productsReducer,
    cartKey: cartReducer,
  },
});
