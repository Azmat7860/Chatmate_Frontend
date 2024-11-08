import React, { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { useAuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.webp";

const Header = () => {
  const { authUser } = useAuthContext();
  const { darkMode, toggleDarkMode } = useThemeContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`bg-gray-100 text-dark shadow-lg top-0 left-0 w-full z-50 dark:bg-gray-800 dark:text-white transition-all duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img className="h-12 w-12 rounded-full" src={logo} alt="shopbizz" />
        </Link>

        {/* Hamburger Menu (visible on mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none text-gray-500 hover:text-green-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          {authUser ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-medium transition duration-200"
                    : "hover:text-green-400 font-medium transition duration-200"
                }
              >
                Profile
              </NavLink>
              <NavLink
                to="/chat"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-medium transition duration-200"
                    : "hover:text-green-400 font-medium transition duration-200"
                }
              >
                Chats
              </NavLink>
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-medium transition duration-200"
                    : "hover:text-green-400 font-medium transition duration-200"
                }
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-medium transition duration-200"
                    : "hover:text-green-400 font-medium transition duration-200"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-green-400 font-medium transition duration-200"
                    : "hover:text-green-400 font-medium transition duration-200"
                }
              >
                Signup
              </NavLink>
            </>
          )}
        </nav>

        {/* Dark Mode Toggle Button */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center p-2 mr-2 text-xs font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                aria-hidden="true"
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav
          className={`md:hidden ${darkMode ? "bg-gray-700" : "bg-gray-200"} `}
        >
          <ul className="flex flex-col items-center space-y-4 py-4">
            {authUser ? (
              <>
                <li>
                  <Link
                    to="/profile"
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    } hover:text-green-400`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/chat"
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    } hover:text-green-400`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Chats
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    } hover:text-green-400`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    } hover:text-green-400`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    } hover:text-green-400`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
            <li>
              {/* Dark Mode Toggle Button for mobile */}
              <button
                onClick={toggleDarkMode}
                className={`flex items-center p-2 ${
                  darkMode ? "text-gray-300" : "text-gray-800"
                }`}
              >
                {darkMode ? (
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                )}
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
