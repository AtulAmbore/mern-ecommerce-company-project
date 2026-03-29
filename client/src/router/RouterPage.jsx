import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { HomePage } from "../pages/HomePage";
import { FormPage } from "../pages/FormPage";
import { ProductPage } from "../pages/ProductPage";
// import { ProductDetailsPage } from "../pages/ProductDetailsPage";

export const RouterPage = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/form",
        element: <FormPage />,
      },
      {
        path: "/products",
        element: <ProductPage />,
      },
      // {
      //   path: "/products/:id",
      //   element: <ProductDetailsPage />,
      // },
    ],
  },
]);
