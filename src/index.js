import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { SocketContextProvider } from "./context/SocketContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <SocketContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
