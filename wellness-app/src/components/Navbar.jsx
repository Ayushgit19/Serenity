import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiGeminiLine } from "react-icons/ri";
import { MdOutlineLogin } from "react-icons/md";
import icon from "../assets/Leaf-icon.jpg";
import pic1 from "../assets/pic1.webp";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiFlowerLine } from "react-icons/ri";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-black text-white"
      : "text-black hover:bg-gray-200";

  const sendVerificationOTP = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="flex justify-around py-1 shadow-md bg-white/80 w-full items-center fixed z-30 backdrop-blur-sm">
      <div
        onClick={() => navigate("/dashboard")}
        className="flex cursor-pointer gap-2"
      >
        <div className="p-1 rounded-lg">
          <RiFlowerLine className="h-10 w-10 text-black" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-xl text-gray-900">Serenity</span>
          <span className="text-xs text-gray-500">Wellness Sessions</span>
        </div>
      </div>

      <nav className="flex items-center">
        <button
          onClick={() => navigate("/dashboard")}
          className={`flex mr-1 items-center justify-center gap-2 px-5 h-10 rounded-2xl text-sm font-medium transition-colors duration-200 cursor-pointer ${isActive(
            "/dashboard"
          )}`}
        >
          <RiGeminiLine />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/create-session")}
          className={`px-5 mx-3 h-10 rounded-2xl text-sm font-medium transition-colors duration-200 cursor-pointer ${isActive(
            "/create-session"
          )}`}
        >
          Create Session
        </button>

        {userData ? (
          <div className="relative group cursor-pointer">
            <div className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition">
              <img
                src={pic1}
                alt="User"
                className="h-8 w-8 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-gray-900">
                  {userData.name}
                </span>
                <span className="text-xs text-gray-500">Wellness Creator</span>
              </div>
            </div>

            {/* Fixed dropdown alignment */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-44 bg-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 origin-left z-50 overflow-hidden mt-4">
              <ul className="flex flex-col text-sm text-gray-700">
                {!userData.isVerified && (
                  <li
                    onClick={sendVerificationOTP}
                    className="px-4 py-2 hover:bg-gray-100 transition duration-200 cursor-pointer font-medium text-yellow-600"
                  >
                    Verify Email
                  </li>
                )}
                <li
                  onClick={logout}
                  className="px-4 py-2 hover:bg-red-100 transition duration-200 hover:text-red-600 cursor-pointer font-medium"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
          >
            Login <FaArrowRightLong />
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
