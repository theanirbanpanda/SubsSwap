import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthContext";
import { ListingsProvider } from "./features/listings/ListingsContext";
import Login from "./features/auth/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MySubscriptions from "./pages/MySubscriptions";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import SwapRequests from "./pages/SwapRequests"; // <-- RE-ADDING IMPORT

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ListingsProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-subscriptions" element={<MySubscriptions />} />
            <Route path="/swap-requests" element={<SwapRequests />} /> {/* <-- RE-ADDING ROUTE */}
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </ListingsProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;