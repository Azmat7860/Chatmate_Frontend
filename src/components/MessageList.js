// MessageList.js
import React, { useEffect, useRef, useState } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { FaArrowDown } from "react-icons/fa";
import { FaCheck, FaExclamationCircle, FaCheckDouble } from "react-icons/fa";

const MessageList = ({
  messages,
  chatHistory,
  authUser,
  users,
  darkMode,
  receiver,
}) => {
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollToBottom(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatHistory]);

  const handleScroll = () => {
    const container = messageContainerRef.current;
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 100;
      setShowScrollToBottom(!isAtBottom);
    }
  };

  useEffect(() => {
    const container = messageContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const formatDateLabel = (date) => {
    if (isToday(new Date(date))) {
      return "Today";
    } else if (isYesterday(new Date(date))) {
      return "Yesterday";
    } else {
      return format(new Date(date), "MM/dd/yyyy");
    }
  };

  const formatTime = (date) => {
    return format(new Date(date), "hh:mm a");
  };

  // Function to render messages with date, sender's name, time, and status icon
  const renderMessagesWithDates = (allMessages) => {
    const filteredMessages = [
      ...new Map(allMessages.map((msg) => [msg._id, msg])).values(),
    ];

    const elements = [];
    let lastDate = null;

    filteredMessages.forEach((msg, index) => {
      const currentDate = new Date(msg.createdAt);
      if (!lastDate || currentDate.toDateString() !== lastDate.toDateString()) {
        elements.push(
          <div
            key={`date-${currentDate.toDateString()}`}
            className="text-center my-2"
          >
            <span
              className={`inline-block p-2 rounded ${
                darkMode
                  ? "bg-gray-700 text-gray-200"
                  : "bg-gray-300 text-gray-800"
              }`}
            >
              {formatDateLabel(currentDate)}
            </span>
          </div>
        );
        lastDate = currentDate;
      }

      elements.push(
        <div
          key={msg._id || `${msg.sender}-${msg.createdAt}`}
          className={`flex ${
            msg.sender === authUser._id ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === authUser._id
                ? darkMode
                  ? "bg-green-700 text-white"
                  : "bg-green-600 text-white"
                : darkMode
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            <strong className="block">
              {msg.sender === authUser._id
                ? "You"
                : users.find((u) => u.id === msg.sender)?.name || "User"}
            </strong>
            <p style={{ whiteSpace: "pre-wrap" }}>{msg.message}</p>
            <div className="flex justify-end items-center space-x-2 mt-1 text-sm">
              <span
                className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {formatTime(msg.createdAt)}
              </span>
            </div>
          </div>
        </div>
      );
    });

    return elements;
  };

  return (
    <div
      className="flex-grow relative overflow-y-auto p-4 space-y-3"
      ref={messageContainerRef}
    >
      {chatHistory.length === 0 && messages.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <p
            className={`text-center ${
              darkMode ? "text-gray-200" : "text-gray-900"
            }`}
          >
            {receiver
              ? `Start a conversation with ${
                  users.find((u) => u.id === receiver)?.name || "this user"
                }.`
              : "Welcome! Select a user to start chatting."}
          </p>
        </div>
      ) : (
        renderMessagesWithDates(
          chatHistory.concat(
            messages.filter(
              (msg) =>
                (msg.sender === authUser._id && msg.receiver === receiver) ||
                (msg.sender === receiver && msg.receiver === authUser._id)
            )
          )
        )
      )}
      <div ref={messagesEndRef} />

      {showScrollToBottom && (
        <button
          onClick={scrollToBottom}
          className={`fixed bottom-20 right-10 p-2 ${
            darkMode
              ? "bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 hover:bg-gray-600"
              : "bg-gradient-to-r from-green-500 via-green-400 to-green-500 hover:bg-green-400"
          } text-white rounded-full shadow-lg`}
        >
          <FaArrowDown />
        </button>
      )}
    </div>
  );
};

export default MessageList;
