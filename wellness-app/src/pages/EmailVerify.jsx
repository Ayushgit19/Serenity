import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { RiFlowerLine } from "react-icons/ri";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmailVerify = () => {
  axios.defaults.withCredentials = true;

  const inputRefs = useRef([]);
  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContext);

  const navigate = useNavigate();

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e, ind) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
    inputRefs.current[ind - 1].focus();
  };

  const onSubmithandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData && userData.isVerified) {
      navigate("/");
    }
  }, [isLoggedIn, userData]);

  return (
    <div className="relative flex items-center justify-center min-h-screen sm:px-0">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
        alt="Background"
        className="absolute inset-0 -z-20 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5712E0] via-[#9409B0] to-[#D9239F] opacity-15 -z-10"></div>
      <div className="absolute inset-0 bg-black opacity-25 -z-10"></div>

      {/* Top-left icon */}
      <div
        onClick={navigate("/")}
        className="absolute top-4 left-4 p-1 rounded-lg cursor-pointer"
      >
        <RiFlowerLine className="h-10 w-10 text-white" />
      </div>

      {/* Centered form */}
      <form
        onSubmit={onSubmithandler}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6 digit code sent to your email.
        </p>
        <div
          className="flex justify-between mb-8"
          onPaste={(e) => handlePaste(e, 6)}
        >
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                required
                className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                ref={(e) => (inputRefs.current[index] = e)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900">
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
