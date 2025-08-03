import React, { useContext, useState } from "react";
import { RiFlowerLine } from "react-icons/ri";
import { IoSparklesOutline } from "react-icons/io5";
import { AppContext } from "../context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

// Enable cookies for requests (e.g., JWT)
axios.defaults.withCredentials = true;

const Login = () => {
  const [activeTab, setActiveTab] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const navigate = useNavigate();

  // Handle form submission for both Login and Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (activeTab === "Register") {
        // Register new user
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          toast.success("Registration successful!");
          getUserData();
          navigate("/dashboard");
        } else {
          toast.error(data.message || "Registration failed.");
        }
      } else {
        // Login user
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedIn(true);
          toast.success("Login successful!");
          getUserData();
          navigate("/dashboard");
        } else {
          toast.error(data.message || "Login failed.");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="Background"
        className="absolute inset-0 -z-20 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5712E0] via-[#9409B0] to-[#D9239F] opacity-15 -z-10"></div>
      <div className="absolute inset-0 bg-black opacity-25 -z-10"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-white gap-3">
        {/* Logo / Icon */}
        <div className="bg-white p-1 rounded-lg">
          <RiFlowerLine className="h-10 w-10 text-black" />
        </div>

        {/* Title and tagline */}
        <h1 className="text-3xl font-bold">Welcome to Serenity</h1>
        <span className="text-sm opacity-85">
          Your Journey to wellness begins here
        </span>

        {/* Subtitle */}
        <div className="flex text-xs gap-4 opacity-85">
          {" "}
          <div className="flex items-center justify-center gap-1">
            {" "}
            <IoSparklesOutline /> <span>Mindful</span>{" "}
          </div>{" "}
          <div className="h-1 w-1 rounded-full bg-white self-center"></div>{" "}
          <div className="flex items-center justify-center gap-1">
            {" "}
            <IoSparklesOutline /> <span>Healing</span>{" "}
          </div>{" "}
          <div className="h-1 w-1 rounded-full bg-white self-center"></div>{" "}
          <div className="flex items-center justify-center gap-1">
            {" "}
            <IoSparklesOutline /> <span>Growth</span>{" "}
          </div>{" "}
        </div>

        {/* Login/Register card */}
        <div className="bg-white/80 p-6 rounded-2xl shadow-xl w-90">
          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-xl text-black font-semibold">
              Begin your Practice
            </h2>
            <p className="text-sm text-black/70 mt-1">
              {activeTab === "Login"
                ? "Sign in to access your wellness sessions"
                : "Register to begin your journey"}
            </p>
          </div>

          {/* Tab Switch */}
          <div className="flex bg-white border border-gray-200 rounded-2xl p-1 gap-2">
            {["Login", "Register"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setEmail("");
                  setName("");
                  setPassword("");
                }}
                className={`flex-1 px-4 py-1 text-xs font-medium rounded-xl cursor-pointer transition-all duration-400 ${
                  activeTab === tab
                    ? "bg-white text-black shadow-sm"
                    : "bg-gray-200 text-black hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-7">
            {/* Name Field for Register */}
            {activeTab === "Register" && (
              <div className="flex flex-col gap-1">
                <label className="text-xs text-black/80 font-semibold">
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-xs text-black/70 bg-white p-1 px-2 rounded-md"
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-black/80 font-semibold">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-xs text-black/70 bg-white p-1 px-2 rounded-md"
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-black/80 font-semibold">
                Password
              </label>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-xs text-black/70 bg-white p-1 px-2 rounded-md"
                required
              />
            </div>

            {activeTab === "Login" && (
              <div
                className="text-xs font-semibold text-indigo-500 text-left mt-1 ml-1 hover:underline cursor-pointer w-fit"
                onClick={() => navigate("/reset-password")}
              >
                Forgot password?
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 bg-gradient-to-r from-[#5712E0] to-[#D9239F] text-white text-xs py-2 rounded-md shadow-md hover:opacity-90 transition-all cursor-pointer"
            >
              {activeTab === "Login" ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
