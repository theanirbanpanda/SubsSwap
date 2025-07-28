import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext";
import Login from "./features/auth/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MySubscriptions from "./pages/MySubscriptions";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-subscriptions" element={<MySubscriptions />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
