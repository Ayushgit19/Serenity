import React, { useState } from "react";
import mountain from "../assets/6205248.jpg";
import { RiFlowerLine } from "react-icons/ri";
import { IoSparklesOutline } from "react-icons/io5";

const Login = () => {
  const [activeTab, setActiveTab] = useState("Login");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeTab === "Register") {
      console.log("Registering:", { name, email, password });
      // Add register logic here
    } else {
      console.log("Logging in:", { email, password });
      // Add login logic here
    }
  };

  return (
    <div className="relative min-h-screen">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="Background"
        className="absolute inset-0 -z-20 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#5712E0] via-[#9409B0] to-[#D9239F] opacity-15 -z-10"></div>
      <div className="absolute inset-0 bg-black opacity-25 -z-10"></div>

      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-white gap-3">
        <div className="bg-white p-1 rounded-lg">
          <RiFlowerLine className="h-10 w-10 text-black" />
        </div>
        <h1 className="text-3xl font-bold">Welcome to Serenity</h1>
        <span className="text-sm opacity-85">
          Your Journey to wellness begins here
        </span>

        <div className="flex text-xs gap-4 opacity-85">
          <div className="flex items-center justify-center gap-1">
            <IoSparklesOutline />
            <span>Mindful</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-white self-center"></div>
          <div className="flex items-center justify-center gap-1">
            <IoSparklesOutline />
            <span>Healing</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-white self-center"></div>
          <div className="flex items-center justify-center gap-1">
            <IoSparklesOutline />
            <span>Growth</span>
          </div>
        </div>

        <div className="bg-white/80 p-6 rounded-2xl shadow-xl min-w-sm w-80">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl text-black">Begin your Practise</h1>
            <span className="text-sm text-black/70">
              {activeTab === "Login"
                ? "Sign in to access your wellness sessions"
                : "Register to begin your journey"}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-1 shadow-sm border border-gray-200 flex mt-6 w-full gap-2">
            {["Login", "Register"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-1 rounded-xl text-xs cursor-pointer font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-white text-black shadow-sm"
                    : "bg-gray-200 text-black hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-7">
            {activeTab === "Register" && (
              <div className="flex flex-col gap-1">
                <span className="text-xs text-black/80 font-semibold">
                  Full name
                </span>
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

            <div className="flex flex-col gap-1">
              <span className="text-xs text-black/80 font-semibold">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-xs text-black/70 bg-white p-1 px-2 rounded-md"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs text-black/80 font-semibold">
                Password
              </span>
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-xs text-black/70 bg-white p-1 px-2 rounded-md"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-2 bg-gradient-to-r from-[#5712E0] to-[#D9239F] text-white text-xs py-2 rounded-md shadow-md hover:opacity-90 transition-all"
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
