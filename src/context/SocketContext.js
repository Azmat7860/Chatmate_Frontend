import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:5000", {
        query: { userId: authUser._id },
      });

      setSocket(newSocket);

      newSocket.on("connect", () => console.log("Connected:", newSocket.id));

      // Update the list of online users
      newSocket.on("getOnlineUsers", (users) => {
        const filteredUsers = users.filter((user) => user._id !== authUser._id);
        setOnlineUsers(filteredUsers);
      });

      newSocket.on("receiveMessage", (message) => {
        console.log("Received Message:", message);
        setMessages((prev) => [...prev, message]);
      });

      return () => newSocket.close();
    }
  }, [authUser]);

  const sendMessage = (messageData) => {
    if (socket) {
      socket.emit("sendMessage", messageData);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("userOnline", (userId) => {
        setOnlineUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, isOnline: true } : user
          )
        );

        // Update message ticks when the receiver comes online
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.sender === authUser._id && !msg.delivered
              ? { ...msg, delivered: true }
              : msg
          )
        );
      });
    }
  }, [socket, authUser]);

  return (
    <SocketContext.Provider
      value={{ socket, onlineUsers, messages, sendMessage }}
    >
      {children}
    </SocketContext.Provider>
  );
};
