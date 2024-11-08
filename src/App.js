import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Logout from "./pages/Logout";
import Login from "./pages/Login";
import Chat from "./pages/Chat";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={authUser ? <Navigate to="/chat" replace /> : <Login />} />
        <Route path="/register" element={authUser ? <Navigate to="/chat" replace /> : <Register />} />
        <Route path="/chat" element={authUser ? <Chat /> : <Navigate to="/" replace />} />
        <Route path="/profile" element={authUser && <Profile />} />
        <Route path="/settings" element={authUser && <Setting />} />
        <Route path="/logout" element={authUser ? <Logout /> : <Navigate to="/" replace />}/>
        <Route path="*" element={authUser ? <PageNotFound /> : <Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
