import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";

const ChatHeader = ({ userId, usersList, toggleDarkMode, darkMode }) => {
  const selectedUser = usersList.find((user) => user._id === userId);

  // Get last login time for the selected user if they're offline
  const lastLoginTime =
    selectedUser && selectedUser.lastLoginTime
      ? formatDistanceToNow(new Date(selectedUser.lastLoginTime), {
          addSuffix: true,
        })
      : null;

  return (
    <div
      className={`flex flex-col ${
        darkMode ? "bg-gray-700" : "bg-gray-200"
      } p-4 rounded-lg mb-4`}
    >
      <div className="flex justify-between">
        <div>
          {selectedUser ? (
            <>
              <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
              {/* Display online status or last login time */}
              <p className="text-sm mt-1">
                {selectedUser.isOnline ? (
                  <span className="text-green-500">Online</span>
                ) : (
                  <span className="text-gray-500">
                    Last seen {lastLoginTime || "a while ago"}
                  </span>
                )}
              </p>
            </>
          ) : (
            <h2 className="text-xl font-semibold">Chat</h2>
          )}
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/logout" title="Logout">
            <FaArrowLeftLong className="hover:text-green-400" />
          </Link>
          <button
            onClick={toggleDarkMode}
            className={`flex items-center p-2 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            } hover:text-green-400`}
            title="Toggle Dark Mode"
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
          <Link to="/settings" title="Settings">
            <FiSettings className="hover:text-green-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
