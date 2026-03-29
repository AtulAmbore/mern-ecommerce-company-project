import { Outlet } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { Navbar } from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { refreshThunk } from "./redux/auth/AuthThunks";
import { getCartThunk } from "./redux/cart/CartThunk";

function App() {
  const dispatch = useDispatch();

  const { isLogin, isLoading, isError, error, user } = useSelector(
    (state) => state.authKey.loginState,
  );

  useEffect(() => {
    dispatch(refreshThunk())
      .unwrap()
      .then((response) => {
        toast.success(response.msg);
      })
      .catch((err) => {
        toast.error(err.msg);
      });
  }, [dispatch]);

  return isLogin ? (
    <div className="w-full h-screen bg-gray-200 flex flex-col gap-2 p-2">
      <Navbar />
      <div
        data-testid="outlet-container"
        className="w-full h-9/10 overflow-hidden"
      >
        <div className="w-full h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <AuthPage />
  );
}

export default App;
