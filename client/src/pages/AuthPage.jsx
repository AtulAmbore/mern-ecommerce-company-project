import { useRef, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  resetLoginState,
  resetSignupState,
  resetRefreshState,
} from "../redux/auth/AuthSlice";
import { loginThunk, signupThunk } from "../redux/auth/AuthThunks";
import { AdminToggle } from "../components/AdminToggle";

export function AuthPage() {
  const dispatch = useDispatch();

  const loginRef = useRef();
  const signupRef = useRef();

  const { isLogin, isLoading, isError, error, user } = useSelector(
    (state) => state.authKey.loginState,
  );

  const [formState, setFormState] = useState(true);
  const [isPasswordSeen, setIsPasswordSeen] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const { email, password } = data;
    if (!email) {
      toast.error("Email is not available");
      return;
    }
    if (!password) {
      toast.error("Password is not available");
      return;
    }
    try {
      const result = await dispatch(loginThunk({ email, password })).unwrap();
      toast.success(result.msg);
      event.target.reset();
    } catch (err) {
      toast.error(err.msg);
      loginRef.current.elements.password.value = "";
      loginRef.current.elements.email.value = "";
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const { name, email, password } = data;

    if (!name) {
      toast.error("Name is not available");
      return;
    }
    if (!email) {
      toast.error("Email is not available");
      return;
    }
    if (!password) {
      toast.error("Password is not available");
      return;
    }
    try {
      const result = await dispatch(
        signupThunk({ name, email, password, isAdmin }),
      ).unwrap();
      toast.success(result.msg);
      event.target.reset();
      setIsAdmin(false);
      setFormState(true);
    } catch (err) {
      signupRef.current.elements.name.value = "";
      signupRef.current.elements.email.value = "";
      signupRef.current.elements.password.value = "";
      setIsAdmin(false);
      toast.error(err.msg);
    }
  };

  return (
    <div
      data-testid="auth-page"
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(bg-morning-sun.jpg)` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex w-full h-screen items-center justify-center">
        {formState ? (
          <form
            ref={loginRef}
            onSubmit={handleLogin}
            className="bg-white/20 p-8 rounded-xl w-full max-w-sm flex flex-col gap-5 items-center"
          >
            <h1 className="text-white font-bold text-3xl">Login</h1>
            <div className="w-full flex relative">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="border w-full border-white text-white px-4 py-2 rounded-full placeholder:white placeholder:font-bold outline-none"
              />
              <MdEmail
                className="absolute text-white right-3 top-1.5"
                size={30}
              />
            </div>
            <div className="w-full flex relative">
              <input
                type={isPasswordSeen ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="border w-full border-white text-white px-4 py-2 rounded-full placeholder:white placeholder:font-bold outline-none"
              />
              {isPasswordSeen ? (
                <FaLockOpen
                  onClick={() => setIsPasswordSeen(false)}
                  className="absolute text-red-400 right-3 top-2"
                  size={25}
                />
              ) : (
                <FaLock
                  onClick={() => setIsPasswordSeen(true)}
                  className="absolute text-green-400 right-3 top-2 "
                  size={25}
                />
              )}
            </div>
            <div className="flex justify-between w-full text-white">
              <div className="text-white">
                <input
                  type="checkbox"
                  name="isAdmin"
                  id="isAdmin"
                  className="mx-2"
                />
                Is Admin
              </div>
              <p className="border-b cursor-pointer">Forget password ?</p>
            </div>
            <button
              type="submit"
              className="text-gray-700 font-bold text-xl bg-white w-full rounded-2xl p-2 cursor-pointer hover:bg-transparent border-2 border-white hover:text-white"
            >
              LOGIN
            </button>
            <p className="text-white">
              Don't have an account ?{" "}
              <span
                onClick={() => setFormState(false)}
                className="border-b text-blue-200 cursor-pointer hover:text-blue-400"
              >
                Signup
              </span>{" "}
            </p>
          </form>
        ) : (
          <form
            ref={signupRef}
            onSubmit={handleSignup}
            className="bg-white/20 p-8 rounded-xl w-full max-w-sm flex flex-col gap-5 items-center"
          >
            <h1 className="text-white font-bold text-3xl">Signup</h1>
            <div className="w-full flex relative">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className="border w-full border-white text-white px-4 py-2 rounded-full placeholder:white placeholder:font-bold outline-none"
              />
              <IoMdPerson
                className="absolute text-white right-3 top-1.5"
                size={30}
              />
            </div>
            <div className="w-full flex relative">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="border w-full border-white text-white px-4 py-2 rounded-full placeholder:white placeholder:font-bold outline-none"
              />
              <MdEmail
                className="absolute text-white right-3 top-1.5"
                size={30}
              />
            </div>
            <div className="w-full flex relative">
              <input
                type={isPasswordSeen ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="border w-full border-white text-white px-4 py-2 rounded-full placeholder:white placeholder:font-bold outline-none"
              />
              {isPasswordSeen ? (
                <FaLockOpen
                  onClick={() => setIsPasswordSeen(false)}
                  className="absolute text-red-400 right-3 top-2"
                  size={25}
                />
              ) : (
                <FaLock
                  onClick={() => setIsPasswordSeen(true)}
                  className="absolute text-green-400 right-3 top-2 "
                  size={25}
                />
              )}
            </div>
            <div className="flex justify-between w-full text-white">
              <AdminToggle
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
                // value={isAdmin}
                // onChange={(val) => setIsAdmin(val)}
              />
              <p className="border-b cursor-pointer">Forget password ?</p>
            </div>
            <button
              type="submit"
              className="text-gray-700 font-bold text-xl bg-white w-full rounded-2xl p-2 cursor-pointer hover:bg-transparent border-2 border-white hover:text-white"
            >
              SIGNUP
            </button>
            <p className="text-white">
              Already have an account ?{" "}
              <span
                onClick={() => setFormState(true)}
                className="border-b text-blue-200 cursor-pointer hover:text-blue-400"
              >
                Login
              </span>{" "}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
