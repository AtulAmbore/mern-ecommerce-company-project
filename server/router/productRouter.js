import express from "express";
import {
  getProductByIdController,
  getProductsController,
  importProductsController,
} from "../controllers/productController.js";
import { verifyAdminMiddleware } from "../controllers/authController.js";
import { verifyUserMiddleware } from "../middleware/verifyMiddleware.js";

export const productRouter = express.Router();

productRouter.post(
  "/import",
  verifyUserMiddleware,
  verifyAdminMiddleware,
  importProductsController,
);
productRouter.get("/", getProductsController);
productRouter.get("/:id", getProductByIdController);

// export const privateApi = createApi({
//   reducerPath: "privateApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "/api",
//     credentials: "include", // 🔥 send cookies
//   }),
//   endpoints: (builder) => ({
//     getProfile: builder.query({
//       query: () => "/profile",
//     }),
//     getOrders: builder.query({
//       query: () => "/orders",
//     }),
//   }),
// });
