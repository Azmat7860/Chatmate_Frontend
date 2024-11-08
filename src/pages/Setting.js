import React, { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";

const Setting = () => {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  const languages = ["English", "Spanish", "French", "German", "Chinese"];

  return (
    <>
      <Header />
      <div
        className={`min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-white"
        } p-6 transition-colors duration-300`}
      >
        <div
          className={`max-w-xl mx-auto ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } rounded-lg shadow-lg p-8 transition-colors duration-300`}
        >
          <h1 className="text-2xl font-bold mb-6">Settings</h1>

          {/* Notifications Checkbox */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="mr-2 rounded focus:ring-2 focus:ring-blue-600"
              />
              <span>Enable Notifications</span>
            </label>
          </div>

          {/* Theme Checkbox */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Theme</h2>
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="mr-2 rounded focus:ring-2 focus:ring-blue-600"
              />
              <span>Enable Dark Mode</span>
            </label>
          </div>

          {/* Language Selector */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Language</h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`p-2 border rounded w-full ${
                darkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {languages.map((lang, index) => (
                <option
                  key={index}
                  value={lang}
                  className={`${
                    darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md font-medium transition duration-200 ${
              darkMode
                ? "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 hover:bg-gray-600"
                : "bg-gradient-to-r from-green-500 via-green-400 to-green-300 hover:bg-green-400"
            } text-white`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default Setting;
