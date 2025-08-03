import React, { useContext, useEffect, useRef, useState } from "react";
import { RiFlowerLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { BsMailboxFlag } from "react-icons/bs";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const inputRefs = useRef([]);
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

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );

      data.success ? toast.success(data.message) : toast.error(data.message);
      data.success && setIsEmailSent(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        {
          email,
          otp,
          newPassword: password,
        }
      );
      data.success ? toast.success(data.message) : toast.error(data.message);

      data.success && navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

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

      <div
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 p-1 rounded-lg cursor-pointer"
      >
        <RiFlowerLine className="h-10 w-10 text-white" />
      </div>

      {/* Enter email id */}

      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email address
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <BsMailboxFlag className="w-3.5 h-3.5 text-white" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter you email"
              className="bg-transparent outline-none text-white flex-1"
              required
            />
          </div>

          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3 cursor-pointer">
            Submit
          </button>
        </form>
      )}

      {/* OTP input form */}

      {!isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset password OTP
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
          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full">
            Submit
          </button>
        </form>
      )}

      {/* Enter new password */}

      {isOtpSubmitted && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the new password below
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <BsMailboxFlag className="w-3.5 h-3.5 text-white" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-transparent outline-none text-white"
              required
            />
          </div>

          <button className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3 cursor-pointer">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
