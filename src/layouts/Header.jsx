import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "#282c34",
      color: "#fff"
    }}>
      <h2 style={{ margin: 0 }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
          SubSwap
        </Link>
      </h2>

      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
        {!user && (
          <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>Login</Link>
        )}
        {user && (
          <>
            <Link to="/mysubscriptions" style={{ color: "#fff", textDecoration: "none" }}>My Subscriptions</Link>
            <Link to="/profile" style={{ color: "#fff", textDecoration: "none" }}>Profile</Link>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
