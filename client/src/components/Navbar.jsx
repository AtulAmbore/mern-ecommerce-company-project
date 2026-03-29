import { NavLink, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { HiOutlineMinusCircle } from "react-icons/hi2";
import {
  resetLoginState,
  resetSignupState,
  resetRefreshState,
} from "../redux/auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logoutThunk } from "../redux/auth/AuthThunks";
import {
  decCartProductQtyThunk,
  emptyCartThunk,
  incCartProductQtyThunk,
  removeFromCartThunk,
} from "../redux/cart/CartThunk";

export function Navbar() {
  const dispatch = useDispatch();

  const logoutRef = useRef(null);
  const cartRef = useRef(null);
  const checkoutRef = useRef(null);

  const { isLogin, isLoading, isError, error, user } = useSelector(
    (state) => state.authKey.loginState,
  );

  const { cartProducts } = useSelector((state) => state.cartKey.cartState);

  let cartTotal = 0;

  // console.log("Navbar - cartProducts");
  // console.log(cartProducts[0].product._id);

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        logoutOpen &&
        logoutRef.current &&
        !logoutRef.current.contains(event.target)
      ) {
        setLogoutOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [logoutOpen, setLogoutOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        cartOpen &&
        cartRef.current &&
        !cartRef.current.contains(event.target)
      ) {
        setCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen, setCartOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        checkoutOpen &&
        checkoutRef.current &&
        !checkoutRef.current.contains(event.target)
      ) {
        setCheckoutOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [checkoutOpen, setCheckoutOpen]);

  useEffect(() => {
    if (checkoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [checkoutOpen]);

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutThunk()).unwrap();
      toast.success(result.msg);
      navigate("/");
    } catch (err) {
      toast.error(err.msg);
    }
  };

  const handleIncQtyCart = async (qty, productId) => {
    try {
      const result = await dispatch(
        incCartProductQtyThunk({
          productId: productId, // ✅ use `id`
          quantity: 1, // ✅ send quantity
        }),
      ).unwrap();
      toast.success(result.msg);
    } catch (err) {
      toast.error(err.msg);
    }
  };

  const handleDecQtyCart = async (qty, productId) => {
    if (qty === 1) {
      toast.error("Quantity can not be 0");
      return;
    }
    try {
      const result = await dispatch(
        decCartProductQtyThunk({
          productId: productId, // ✅ use `id`
          quantity: 1, // ✅ send quantity
        }),
      ).unwrap();
      toast.success(result.msg);
    } catch (err) {
      toast.error(err.msg);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const result = await dispatch(
        removeFromCartThunk({ productId }),
      ).unwrap();
      toast.success(result.msg);
    } catch (err) {
      toast.error(err.msg);
    }
  };

  const handleEmptyCart = async () => {
    try {
      const result = await dispatch(emptyCartThunk()).unwrap();
      toast.success(result.msg);
    } catch (err) {
      toast.error(err.msg);
    }
  };

  return (
    <div
      data-testid="navbar"
      className="w-full h-1/10 bg-white flex justify-around gap-2"
    >
      {/* first section */}
      <NavLink to="/" className="w-3/20 flex items-center justify-center">
        {/* <h1 className="font-bold text-3xl text-gray-500">AVA</h1> */}
        <img src="company-logo2.png" alt="" className="w-40 h-12" />
      </NavLink>

      {/* second section */}
      <div className="w-10/20 flex justify-evenly items-center font-bold text-gray-500">
        <NavLink
          className={({ isActive }) => (isActive ? "border-b" : "")}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "border-b" : "")}
          to="/form"
        >
          Form
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "border-b" : "")}
          to="products"
        >
          Products
        </NavLink>
      </div>

      <div ref={logoutRef} className="w-3/20 h-full relative">
        {/* third section */}
        <div className="flex gap-2 items-center w-full h-full">
          <p className="text-gray-500 font-bold">WELCOME, {user.name}</p>
          <img
            src="profile-pic.png"
            alt="User Profile"
            className="w-10 h-10 cursor-pointer"
            onClick={() => setLogoutOpen((prev) => !prev)}
          />
        </div>
        {logoutOpen && (
          <div className="border border-gray-500 rounded-2xl p-2 flex gap-2 flex-col absolute top-15 right-5 w-full z-2">
            <button className="border-2 p-2 rounded-2xl font-bold bg-gray-500 text-white cursor-pointer hover:bg-white hover:text-gray-500">
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="border-2 p-2 rounded-2xl font-bold bg-gray-500 text-white cursor-pointer hover:bg-white hover:text-gray-500"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* fourth section */}
      <div className="flex gap-8 justify-end-safe pr-10 items-center w-4/20 h-full relative">
        <IoSearchOutline
          className="cursor-pointer hover:scale-110 duration-300"
          size={30}
        />
        <IoIosHeartEmpty
          className="cursor-pointer hover:scale-110 duration-300"
          size={30}
        />
        <BsHandbag
          className="cursor-pointer hover:scale-110 duration-300"
          size={30}
          onClick={() => setCartOpen((prev) => !prev)}
        />
        <div className="rounded-full h-6 w-6 border-2 flex justify-center items-center absolute bg-gray-800 text-white top-2 right-7">
          {cartProducts?.length ?? 0}
        </div>
        {cartOpen &&
          (cartProducts.length === 0 ? (
            <div className="fixed inset-0 bg-black/10 z-40">
              <div
                ref={cartRef}
                className="w-110 min-h-[88vh] bg-gray-700 absolute right-2 top-14 z-1 rounded-sm flex justify-center items-center"
              >
                <h1 className="font-bold text-white text-4xl">Cart is Empty</h1>
              </div>
            </div>
          ) : (
            <div className="fixed inset-0 bg-black/10 z-40">
              <div
                ref={cartRef}
                className={`w-110 ${cartProducts.length >= 3 ? "max-h-[88vh]" : "min-h-[88vh]"} bg-gray-700 absolute right-2 top-14 z-1 rounded-sm flex flex-col ${cartProducts.length >= 3 ? "justify-center items-center" : "justify-between items-center"}  gap-2 pl-2 ${cartProducts.length >= 3 ? "pr-0" : "pr-2"} pt-2 pb-2`}
              >
                <div className="w-full max-h-[88vh] overflow-y-auto flex flex-col gap-2">
                  {/*   console.log(cartProducts[0].product._id); */}
                  {cartProducts.map((item) => {
                    cartTotal = cartTotal + item.product.price * item.quantity;
                    return (
                      <div
                        key={item.product._id}
                        className="p-2 bg-white flex gap-2 w-full rounded-sm"
                      >
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.thumbnail}
                          className="p-2 w-1/3 h-40"
                        />
                        <div className="w-2/3 flex flex-col p-2 justify-around items-center">
                          <h1 className="font-bold text-gray-600 text-xl">
                            {item.product.title}
                          </h1>
                          <p className="font-bold text-xl text-green-500 flex justify-around w-full items-center">
                            <span>
                              <span className="font-bold text-xl text-yellow-400">
                                $
                              </span>
                              <span className="font-bold text-xl">
                                {item.product.price}
                              </span>
                            </span>{" "}
                            <span className="text-gray-600 text-2xl"> × </span>
                            <span className="text-red-400 text-xl">
                              {item.quantity}
                            </span>{" "}
                            ={" "}
                            <span>
                              <span className="font-bold text-2xl text-yellow-400">
                                $
                              </span>
                              <span className="font-bold text-2xl text-green-500">
                                {(item.product.price * item.quantity).toFixed(
                                  2,
                                )}
                              </span>
                            </span>
                          </p>
                          <div className="w-full flex justify-around items-center">
                            <button
                              onClick={() =>
                                handleIncQtyCart(
                                  item.quantity,
                                  item.product._id,
                                )
                              }
                              className="cursor-pointer font-bold text-blue-400 text-4xl hover:scale-110 duration-300"
                            >
                              <IoAddCircleOutline />
                            </button>
                            <button
                              onClick={() =>
                                handleRemoveFromCart(item.product._id)
                              }
                              className="cursor-pointer font-bold text-red-600 text-sm hover:scale-110 duration-300 border rounded-full text-center px-4 py-1"
                            >
                              REMOVE
                            </button>
                            <button
                              onClick={() =>
                                handleDecQtyCart(
                                  item.quantity,
                                  item.product._id,
                                )
                              }
                              className="cursor-pointer font-bold text-blue-400 text-4xl hover:scale-110 duration-300"
                            >
                              <HiOutlineMinusCircle />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {/* discountPercentage,price,stock,thumbnail,title,_id,quantity */}
                </div>
                <div
                  className={`flex flex-col ${cartProducts.length <= 2 ? "h-42" : ""} justify-center items-center gap-2 p-0`}
                >
                  <h1 className="">
                    <span className="font-bold text-white text-2xl">
                      Cart Total -{" "}
                    </span>
                    <span className="text-2xl font-bold text-yellow-300">
                      $
                    </span>
                    <span className="text-2xl font-bold text-green-300">
                      {cartTotal.toFixed(2)}
                    </span>
                  </h1>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutOpen(true);
                    }}
                    className="font-bold bg-gray-600 text-white border-2 hover:text-gray-600 hover:bg-white cursor-pointer w-full rounded-2xl p-2 mb-1"
                  >
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          ))}
        {checkoutOpen && (
          <div className="fixed inset-0 bg-black/10 z-40">
            <div
              ref={checkoutRef}
              className={`w-110 ${cartProducts.length >= 7 ? "max-h-[88vh]" : "min-h-[88vh]"} bg-gray-700 absolute right-2 top-14 z-1 rounded-sm flex flex-col ${cartProducts.length >= 7 ? "justify-center items-center" : "justify-between items-center"}  gap-2 pl-2 ${cartProducts.length >= 7 ? "pr-0" : "pr-2"} pt-2 pb-2`}
            >
              <div className="w-full max-h-[88vh] overflow-y-auto flex flex-col gap-2 items-center">
                <h1 className="font-bold text-white text-3xl">Checkout page</h1>
                <div className="w-full max-h-[88vh] overflow-y-auto flex flex-col gap-2">
                  {cartProducts.map((item) => {
                    cartTotal = cartTotal + item.product.price * item.quantity;
                    return (
                      <div
                        key={item.product._id}
                        className="p-1 min-h-15 bg-white flex gap-1 w-full rounded-sm"
                      >
                        <div className="w-full flex p-0 justify-around items-center gap-1 h-full">
                          <h1 className="font-bold text-gray-800 w-3/7">
                            {item.product.title}
                          </h1>
                          <p className="font-bold text-xl text-green-500 flex justify-around w-4/7 items-center">
                            <span>
                              <span className="font-bold text-yellow-400">
                                $
                              </span>
                              <span className="font-bold">
                                {item.product.price}
                              </span>
                            </span>{" "}
                            <span className="text-gray-600 text-2xl"> × </span>
                            <span className="text-red-400">
                              {item.quantity}
                            </span>{" "}
                            ={" "}
                            <span>
                              <span className="font-bold text-yellow-400">
                                $
                              </span>
                              <span className="font-bold text-green-500">
                                {(item.product.price * item.quantity).toFixed(
                                  2,
                                )}
                              </span>
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col justify-around items-center gap-3">
                <h1 className="">
                  <span className="font-bold text-white text-2xl">
                    Cart Total -{" "}
                  </span>
                  <span className="text-2xl font-bold text-yellow-300">$</span>
                  <span className="text-2xl font-bold text-green-300">
                    {cartTotal.toFixed(2)}
                  </span>
                </h1>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCheckoutOpen(false);
                    handleEmptyCart();
                  }}
                  className="font-bold bg-gray-600 text-white border-2 hover:text-gray-600 hover:bg-white cursor-pointer rounded-2xl py-2 px-20 mb-1"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
