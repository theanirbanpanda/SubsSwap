import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="main-app-header">
      <Link to="/" className="nav-logo">
        SubSwap
      </Link>
      {user ? (
        <div className="nav-links">
          <Link to="/my-subscriptions">My Subscriptions</Link>
          <Link to="/chat">Chat</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout} className="nav-button">
            Logout
          </button>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login" className="nav-button">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;