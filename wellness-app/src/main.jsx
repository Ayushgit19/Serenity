import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { SessionProvider } from "./context/SessionContext";
import { AppContextProvider } from "./context/AppContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render( 
    <BrowserRouter>
      <AppContextProvider>
        <SessionProvider>
          <App />
        </SessionProvider>
      </AppContextProvider>
    </BrowserRouter>
);
