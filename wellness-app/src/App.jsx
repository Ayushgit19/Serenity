import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashBoard from "./pages/DashBoard";
import CreateSession from "./pages/CreateSession";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import EditDraftPage from "./pages/Edit-Draft";
import MyPublishedSessionsPage from "./pages/MyPublishedSessionsPage";

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/email-verify", "/reset-password"]; //paths where Navbar should be hidden

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
        <Route path="/edit-draft/:id" element={<EditDraftPage />} />
        <Route path="/my-published-sessions/:id" element={<MyPublishedSessionsPage />} />
      </Routes>
    </div>
  );
};

export default App;
