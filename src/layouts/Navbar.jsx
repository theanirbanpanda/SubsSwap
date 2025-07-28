import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../utils/storage";

const Navbar = () => {
  const user = getCurrentUser();

  return (
    <nav style={{
      background: "#333",
      color: "#fff",
      padding: "0.75rem 1.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <Link to="/" style={{ color: "#fff", fontWeight: "bold" }}>SubSwap</Link>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/mysubscriptions">My Subs</Link>
            <Link to="/swap">Swap</Link>
            <Link to="/chat">Chat</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
