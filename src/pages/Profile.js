import React, { useState, useEffect } from "react";
import { useThemeContext } from "../context/ThemeContext";
import { useAuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { FaCamera } from "react-icons/fa";
import Header from "../components/Header";
import axios from "axios";

const Profile = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const { darkMode } = useThemeContext();
  const [formData, setFormData] = useState({
    name: authUser.name || "",
    email: authUser.email || "",
    profilePic: authUser.profileImage || "",
    newPassword: "",
  });
  const [profilePicFile, setProfilePicFile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/users/${authUser._id}`
        );
        const { name, email, profileImage } = response.data;
        setFormData({
          name,
          email,
          profilePic: `${process.env.REACT_APP_BASE_URL}/${profileImage}`,
          newPassword: "",
        });
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        toast.error("Failed to load profile. Please try again later.", {
          theme: darkMode ? "dark" : "light",
        });
      }
    };
    fetchUserProfile();
  }, [authUser._id, darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setFormData({ ...formData, profilePic: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("email", formData.email);
    if (formData.newPassword)
      updatedData.append("password", formData.newPassword);
    if (profilePicFile) updatedData.append("profileImage", profilePicFile);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/users/${authUser._id}`,
        updatedData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setAuthUser(response.data);
      toast.success("Profile updated successfully!", {
        theme: darkMode ? "dark" : "light",
      });

      setFormData({
        ...formData,
        profilePic: `${process.env.REACT_APP_BASE_URL}/${response.data.profileImage}`,
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error(
        error.response?.data?.message || "Profile update failed. Try again.",
        { theme: darkMode ? "dark" : "light" }
      );
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div
        className={`flex justify-center items-center min-h-screen ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        <div
          className={`w-full max-w-lg p-6 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } rounded-lg shadow-md`}
        >
          <h2 className="text-3xl font-semibold text-center mb-6">
            My Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-center relative">
              <img
                src={formData.profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-28 h-28 rounded-full mb-4 object-cover"
              />
              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-10 cursor-pointer bg-green-500 rounded-full p-2"
              >
                <FaCamera className="text-white" />
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div>
              <label
                className={`block ${
                  darkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 w-full px-4 py-2 border rounded-md ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-500"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400"
                }`}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label
                className={`block ${
                  darkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                className={`mt-1 w-full px-4 py-2 border rounded-md ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-gray-400 placeholder-gray-400 focus:ring-2 focus:ring-gray-500"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400"
                }`}
                placeholder="Enter your email"
                readOnly
              />
            </div>

            <div>
              <label
                className={`block ${
                  darkMode ? "text-gray-400" : "text-gray-700"
                }`}
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className={`mt-1 w-full px-4 py-2 border rounded-md ${
                  darkMode
                    ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-gray-500"
                    : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-400"
                }`}
                placeholder="Enter your new password"
              />
            </div>

            <div className="flex justify-center mt-6">
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
