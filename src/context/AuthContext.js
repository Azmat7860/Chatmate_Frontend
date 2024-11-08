import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  // Check localStorage on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("chat-user"));
    if (storedUser) setAuthUser(storedUser);
  }, []);

  const loginUser = (user) => {
    setAuthUser(user);
    localStorage.setItem("chat-user", JSON.stringify(user));
  };

  const logoutUser = () => {
    setAuthUser(null);
    localStorage.removeItem("chat-user");
    localStorage.removeItem("token");
    localStorage.removeItem("selectedReceiver");
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
