import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px 20px", backgroundColor: "#eee", display: "flex", justifyContent: "space-between" }}>
      <div><Link to="/">SubSwap</Link></div>
      <div style={{ display: "flex", gap: "16px" }}>
        {user ? (
          <>
            <Link to="/my-subscriptions">My Subscriptions</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
