import React from "react";
import { IoSparklesOutline } from "react-icons/io5";
import mountain from "../assets/snow.jpg";
import {useNavigate} from "react-router-dom"

const CreateMsg = () => {
    const navigate = useNavigate()
  return (
    <div className="relative rounded-3xl overflow-hidden mt-4 shadow-xl min-h-[180px]">
      {/* Background image */}
      <img
        src={mountain}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            "linear-gradient(168deg, rgba(147, 42, 155, 1) 4%, rgba(12, 36, 247, 1) 100%)",
        }}
      ></div>

      {/* Foreground content */}
      <div className="relative z-10 flex justify-between items-center p-7">
        {/* Left Text Section */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <IoSparklesOutline className="text-2xl text-yellow-300 animate-bounce" />
            <span className="text-white/90 text-sm">
              Create something beautiful
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-white font-bold text-2xl mb-1">
              Design Your Wellness Session
            </span>
            <span className="text-white/80 text-sm max-w-[90%]">
              Share your knowledge and help others on their wellness journey
            </span>
          </div>
        </div>

        {/* Right Button */}
        <button onClick={() => navigate('/')} className="border border-white/40 px-4 py-1 text-white rounded-md text-sm font-semibold bg-white/20 hover:bg-white/10 transition cursor-pointer">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateMsg;
