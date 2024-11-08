import React, { useState } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";
import axios from "axios";

const Register = () => {
  const { darkMode } = useThemeContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/auth/register`,
        formData
      );
      toast.success("Registration successful! 🎉", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.error || "An error occurred!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div
        className={`flex justify-center items-center min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className={`p-8 rounded-lg shadow-md w-full max-w-md transition-colors duration-300 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 ${
              darkMode
                ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-500"
                : "border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
            }`}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 ${
              darkMode
                ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-500"
                : "border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
            }`}
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 ${
              darkMode
                ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-gray-500"
                : "border-gray-300 bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
            }`}
          />
          <button
            type="submit"
            className={`w-full py-2 rounded-md font-medium transition duration-200 ${
              darkMode
                ? "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 hover:bg-gray-600"
                : "bg-gradient-to-r from-green-500 via-green-400 to-green-300 hover:bg-green-400"
            } text-white`}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
