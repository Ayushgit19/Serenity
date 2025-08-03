import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashBoard from "./pages/DashBoard";
import CreateSession from "./pages/CreateSession";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/email-verify", "/reset-password"]; // Add any paths where Navbar should be hidden

  return (
    <div>
      <Toaster />
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/create-session" element={<CreateSession />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;
