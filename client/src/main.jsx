import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { RouterPage } from "./router/RouterPage.jsx";
import { Provider } from "react-redux";
import { AppStore } from "./redux/AppStore.jsx";
import { Toaster } from "react-hot-toast";

// test("renders navbar", () => {
//   });

createRoot(document.getElementById("root")).render(
  <Provider store={AppStore}>
    <RouterProvider router={RouterPage} />
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toasterId="default"
      toastOptions={{
        // Define default options
        className: "",
        duration: 1000,
        removeDelay: 1000,
        style: {
          // background: "#363636",
          background: "white",
          // color: "#fff",
          color: "black",
        },

        // Default options for specific types
        success: {
          duration: 1000,
          iconTheme: {
            primary: "green",
            secondary: "white",
          },
        },
      }}
    />
  </Provider>,
);
