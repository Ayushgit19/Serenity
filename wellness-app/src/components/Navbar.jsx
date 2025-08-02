import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RiGeminiLine } from "react-icons/ri";
import { MdOutlineLogin } from "react-icons/md";
import icon from "../assets/Leaf-icon.jpg";
import pic1 from "../assets/pic1.webp";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "bg-black text-white"
      : "text-black hover:bg-gray-200";

  return (
    <header className="flex justify-around py-1 shadow-md bg-white/80 w-full items-center fixed z-30 backdrop-blur-sm">
      <div onClick={() => navigate('/dashboard')} className="flex cursor-pointer">
        <img src={icon} alt="icon" className="h-10 w-10 rounded-full object-cover" />
        <div className="flex flex-col">
          <span className="font-semibold text-xl text-gray-900">Serenity</span>
          <span className="text-xs text-gray-500">Wellness Sessions</span>
        </div>
      </div>

      <nav className="flex items-center">
        <button
          onClick={() => navigate("/dashboard")}
          className={`flex mr-1 items-center justify-center gap-2 px-5 h-10 rounded-2xl text-sm font-medium transition-colors duration-200 cursor-pointer ${isActive("/dashboard")}`}
        >
          <RiGeminiLine />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/create-session")}
          className={`px-5 mx-3 h-10 rounded-2xl text-sm font-medium transition-colors duration-200 cursor-pointer ${isActive("/create-session")}`}
        >
          Create Session
        </button>

        <div className="flex items-center m-1 p-1">
          <img src={pic1} alt="User" className="h-7 w-7 rounded-full object-cover" />
          <div className="flex flex-col ml-1">
            <span className="font-semibold text-sm text-gray-900">Username</span>
            <span className="text-xs text-gray-500">Wellness Creator</span>
          </div>
        </div>

        <button onClick={() => navigate('/login')} className="flex items-center justify-center gap-2 text-black px-5 h-10 rounded-2xl text-sm font-medium hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
          <MdOutlineLogin />
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
