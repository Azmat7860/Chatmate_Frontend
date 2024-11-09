import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useThemeContext } from "../context/ThemeContext";
import { useAuthContext } from "../context/AuthContext";

const PageNotFound = () => {
  const { darkMode } = useThemeContext();
  const { authUser } = useAuthContext();

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 py-8 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-md text-center">
        <h1
          className={`text-9xl font-extrabold mb-4 ${
            darkMode ? "text-gray-700" : "text-gray-300"
          }`}
        >
          404
        </h1>
        <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
        <p className="text-lg mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        {authUser ? (
          <Link
            to="/chat"
            className={`inline-flex items-center px-5 py-3 rounded-lg font-semibold transition-all duration-300  ${
              darkMode
                ? "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 hover:bg-gray-600"
                : "bg-gradient-to-r from-green-500 via-green-400 to-green-300 hover:bg-green-400"
            } text-white`}
          >
            <FaHome className="mr-2" />
            Go to Chats
          </Link>
        ) : (
          <Link
            to="/"
            className={`inline-flex items-center px-5 py-3 rounded-lg font-semibold transition-all duration-300  ${
              darkMode
                ? "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 hover:bg-gray-600"
                : "bg-gradient-to-r from-green-500 via-green-400 to-green-300 hover:bg-green-400"
            } text-white`}
          >
            <FaHome className="mr-2" />
            Go to Home
          </Link>
        )}
      </div>
    </div>
  );
};

export default PageNotFound;
