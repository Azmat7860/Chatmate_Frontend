// MessageInput.js
import React from "react";

const MessageInput = ({
  newMessage,
  handleSend,
  handleTyping,
  handleKeyDown,
  darkMode,
  getMinHeightClass,
}) => {
  return (
    <div className="mt-4 flex items-center space-x-2">
      <textarea
        placeholder="Type your message..."
        value={newMessage}
        onChange={handleTyping}
        onKeyDown={handleKeyDown}
        className={`w-full p-2 ${
          darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-dark"
        } rounded-lg resize-none ${getMinHeightClass()}`}
        rows={1}
        style={{
          maxHeight: "120px",
          overflowY: "auto",
        }}
      />
      <button
        className={`p-2 rounded-md font-medium transition duration-200 ${
          darkMode
            ? "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 hover:bg-gray-600"
            : "bg-gradient-to-r from-green-500 via-green-400 to-green-500 hover:bg-green-400"
        } text-white`}
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
