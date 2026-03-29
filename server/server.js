import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./connect.js";
import { authRouter } from "./router/authRouter.js";
import { productRouter } from "./router/productRouter.js";
import { initProducts } from "./utils/initProducts.js";
import { cartRouter } from "./router/cartRouter.js";

configDotenv();

const { PORT, FRONTEND_URL } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use("/api/auth", authRouter);
// "/api/auth/login" - loginController
// "/api/auth/signup" - signupController
// "/api/auth/logout" - logoutController
// "/api/auth/refresh" - refreshController

app.use("/api/products", productRouter);
// "/api/products/import" - importProductsController
// "/api/products" - getProductsController
// "/api/products/:id" - getProductByIdController

app.use("/api/cart", cartRouter);
// "/api/cart/addToCart" - addToCartController
// "/api/cart/removeFromCart" - removeFromCartController
// "/api/cart/incCartProductQty" - incCartQuantityController
// "/api/cart/decCartProductQty" - decCartQuantityController
// "/api/cart/emptyCart" - emptyCartController

const port = PORT || 4000;

const startServer = async () => {
  await connectToMongoDB();
  await initProducts(); // 👈 IMPORTANT: after DB connection
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};
startServer();
