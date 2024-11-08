import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useSocketContext } from "../context/SocketContext";
import { useAuthContext } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Chat = () => {
  const { sendMessage, messages, onlineUsers } = useSocketContext();
  const { authUser } = useAuthContext();
  const { darkMode, toggleDarkMode } = useThemeContext();

  const [newMessage, setNewMessage] = useState("");
  const [receiver, setReceiver] = useState(
    localStorage.getItem("selectedReceiver") || ""
  );
  const [selectedChat, setSelectedChat] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [shiftEnterCount, setShiftEnterCount] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [usersList, setUsersList] = useState([]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatHistory = useCallback(async () => {
    if (authUser && receiver) {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/chat/${authUser._id}/${receiver}`
        );
        setChatHistory(response.data);

        setTimeout(() => {
          scrollToBottom();
        }, 100);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    }
  }, [authUser, receiver]);

  const fetchUserList = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/users`
      );
      setUsersList(response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
    fetchUserList();
  }, [fetchChatHistory, receiver]);

  const users = useMemo(
    () =>
      onlineUsers.map((user) => ({
        id: user._id,
        name: user.name,
        lastMessage:
          messages
            .filter(
              (msg) =>
                (msg.sender === user._id && msg.receiver === authUser._id) ||
                (msg.sender === authUser._id && msg.receiver === user._id)
            )
            .pop()?.message || "",
      })),
    [onlineUsers, messages, authUser._id]
  );

  const handleSend = () => {
    if (newMessage.trim() && receiver) {
      sendMessage({ sender: authUser._id, receiver, message: newMessage });
      setNewMessage("");
      setShiftEnterCount(0);
    }
  };

  useEffect(() => {
    if (receiver) {
      localStorage.setItem("selectedReceiver", receiver);
    }
  }, [receiver]);

  useEffect(() => {
    const savedReceiver = localStorage.getItem("selectedReceiver");
    if (savedReceiver) {
      setSelectedChat(savedReceiver);
      setReceiver(savedReceiver);
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      e.preventDefault();
      setNewMessage((prevMessage) => prevMessage + "\n");
      setShiftEnterCount((prevCount) => prevCount + 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
  };

  const getMinHeightClass = () => {
    switch (shiftEnterCount) {
      case 1:
        return "min-h-20";
      case 2:
        return "min-h-24";
      case 3:
        return "min-h-32";
      case 4:
        return "min-h-40";
      default:
        return "h-auto";
    }
  };

  const sidebarProps = {
    usersList,
    users,
    selectedChat,
    setSelectedChat,
    setReceiver,
    isSidebarOpen,
    setSidebarOpen,
    darkMode,
  };

  const chatHeaderProps = {
    userId: users.find((user) => user.id === receiver)?.id,
    usersList,
    toggleDarkMode,
    darkMode,
  };

  const messageListProps = {
    messages,
    chatHistory,
    authUser,
    users,
    darkMode,
    receiver,
  };

  const messageInputProps = {
    newMessage,
    handleSend,
    handleKeyDown,
    handleTyping,
    darkMode,
    getMinHeightClass,
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Sidebar {...sidebarProps} />
      <div className="flex-grow flex flex-col p-4">
        <ChatHeader {...chatHeaderProps} />
        <MessageList {...messageListProps} />
        <MessageInput {...messageInputProps} />
      </div>
    </div>
  );
};

export default Chat;
