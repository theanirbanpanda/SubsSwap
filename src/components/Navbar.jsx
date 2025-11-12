import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Return null if user is not logged in (to hide on landing/login page)
  if (!user) {
    return null;
  }

  return (
    <nav className="main-app-header">
      <Link to="/" className="nav-logo">
        SubSwap
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/my-subscriptions">My Subscriptions</Link>
        <Link to="/swap-requests">Swap Requests</Link>  {/* <-- RE-ADDING LINK */}
        <Link to="/chat">Chat</Link>
        <Link to="/profile">Profile</Link>
        <button onClick={handleLogout} className="nav-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;