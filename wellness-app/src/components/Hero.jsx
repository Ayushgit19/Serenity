import React from "react";
import { MdOutlineStarOutline } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import pic1 from "../assets/pic1.webp";
import mountain from "../assets/6205248.jpg"

const Hero = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden min-h-[200px] mt-4 shadow-md">
      {/* Background image */}
      <img src={mountain} className="absolute bg-cover bg-center -z-20 h-full w-full object-cover" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5712E0] via-[#9409B0] to-[#D9239F] opacity-30 -z-10"></div>

      {/* Content */}
      <div className="relative z-10 flex justify-between p-10">
        {/* Left Column */}
        <div className="flex flex-col">
          <div className="flex items-center mb-3 gap-2">
            <MdOutlineStarOutline className="text-yellow-300 h-6 w-6" />
            <p className="text-white/90 font-normal">Welcome Back!</p>
          </div>

          <div className="flex flex-col justify-center mb-4">
            <h1 className="text-2xl font-bold text-white mb-1  ">
              Good morning, Username
            </h1>
            <p className="text-white/70 text-sm mt-1 max-w-[60%] ">
              Ready to continue your wellness journey? Discover new sessions or
              continue where you left off.
            </p>
          </div>

          <div className="flex items-center text-xs gap-4">
            <div className="flex items-center gap-2">
              <FaRegHeart className="text-red-300" />
              <p className="text-white">5 Sessions available</p>
            </div>
            <div className="flex items-center gap-2">
              <FaArrowTrendUp className="text-green-400" />
              <p className="text-white">Your Practice Growing</p>
            </div>
          </div>
        </div>

        {/* Right Avatar */}
        <div className="flex items-center justify-end">
          <img
            src={pic1}
            className="h-20 w-20 rounded-full object-cover border-white/20 border-4 backdrop-blur-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
