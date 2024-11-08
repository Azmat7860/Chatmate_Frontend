import React, { useState } from "react";
import { FaUserCircle, FaTimesCircle } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = ({
  users,
  usersList,
  selectedChat,
  setSelectedChat,
  setReceiver,
  isSidebarOpen,
  setSidebarOpen,
  darkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`${isSidebarOpen ? "w-16 sm:w-24" : "w-20 sm:w-1/4"} ${
        darkMode ? "bg-gray-700" : "bg-gray-200"
      } flex flex-col transition-all duration-300 ease-in-out p-2 sm:p-4`}
    >
      <div
        className={`flex items-center ${
          isSidebarOpen
            ? "justify-center max-sm:justify-center"
            : "justify-between max-sm:justify-between"
        } ${darkMode ? "bg-gray-600" : "bg-gray-300"} p-2 rounded-lg mb-4`}
      >
        {!isSidebarOpen && (
          <h1 className="text-lg font-semibold hidden sm:block">Chats</h1>
        )}
        <button
          className="hover:text-green-400"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full p-2 rounded-lg ${
            darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-300 text-gray-700"
          }`}
        />
        {searchQuery && (
          <FaTimesCircle
            className={`w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer ${
              darkMode
                ? "text-gray-300 hover:text-gray-100"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setSearchQuery("")}
          />
        )}
      </div>

      {/* User List */}
      <div className="flex-grow overflow-y-auto">
        <ul className="space-y-2">
          {filteredUsers.map((user) => {
            const userProfile = usersList.find((u) => u._id === user.id);

            return (
              <li
                key={user.id}
                onClick={() => {
                  setSelectedChat(user.id);
                  setReceiver(user.id);
                  localStorage.setItem("selectedReceiver", user.id);
                }}
                className={`p-3 rounded-lg cursor-pointer flex items-center space-x-3 ${
                  darkMode ? "hover:bg-gray-500" : "hover:bg-gray-400"
                } ${
                  selectedChat === user.id
                    ? darkMode
                      ? "bg-gray-600"
                      : "bg-gray-300"
                    : ""
                }`}
              >
                {/* Profile Image or Icon */}
                {userProfile && userProfile.profileImage ? (
                  <div className="relative">
                    <img
                      src={`${process.env.REACT_APP_BASE_URL}/${userProfile.profileImage}`}
                      alt={userProfile.name}
                      className="w-8 h-8 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full object-cover"
                    />
                    {/* Green Indicator for Online Users */}
                    {userProfile.isOnline && (
                      <span
                        className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full ${
                          darkMode ? "bg-green-500" : "bg-green-600"
                        }`}
                      ></span>
                    )}
                  </div>
                ) : (
                  <div className="relative">
                    <FaUserCircle className="w-8 h-8 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
                    {userProfile && userProfile.isOnline && (
                      <span
                        className={`absolute bottom-0 right-0 block w-3 h-3 rounded-full ${
                          darkMode ? "bg-green-500" : "bg-green-600"
                        }`}
                      ></span>
                    )}
                  </div>
                )}

                {!isSidebarOpen && (
                  <div className="hidden sm:block">
                    <div className="font-bold">{user.name}</div>
                    <div
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      } truncate`}
                    >
                      {user.lastMessage.length > 25
                        ? `${user.lastMessage.slice(0, 25)}...`
                        : user.lastMessage}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Profile Link */}
      <div className="mt-auto">
        <Link
          to="/profile"
          className={`flex items-center ${
            isSidebarOpen ? "justify-center" : "justify-start"
          } p-2 rounded-lg ${darkMode ? "bg-gray-600" : "bg-gray-300"}`}
          title="View Profile"
        >
          <FaRegCircleUser className="w-6 h-6 hover:text-green-400" />
          {!isSidebarOpen && (
            <span className="font-semibold hidden sm:inline ml-2">Profile</span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
