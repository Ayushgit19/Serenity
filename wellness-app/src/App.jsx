import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashBoard from "./pages/DashBoard";
import CreateSession from "./pages/CreateSession";
import Login from "./pages/Login";

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/login"]; // Add any paths where Navbar should be hidden

  return (
    <div>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/create-session" element={<CreateSession />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
