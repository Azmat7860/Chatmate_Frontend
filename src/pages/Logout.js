import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";

const Logout = () => {
  const { logoutUser } = useAuthContext();
  const navigate = useNavigate();
  const { darkMode } = useThemeContext();

  const handleLogout = () => {
    logoutUser();
    localStorage.removeItem("chat-user");
    navigate("/");
  };

  return (
    <>
      <Header />
      <div
        className={`flex items-center justify-center h-screen ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <div
          className={`text-center ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          } p-6 rounded-lg shadow-lg`}
        >
          <h1 className="text-3xl font-bold mb-4">Logout</h1>
          <p className="mb-4">Are you sure you want to log out?</p>
          <button
            className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 
            font-medium text-white py-2 px-4 rounded-md hover:bg-red-600 
            transition duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Logout;
