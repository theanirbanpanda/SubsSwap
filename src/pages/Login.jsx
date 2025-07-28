import React, { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Placeholder logic only
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in both fields.");
      return;
    }
    // Simulate login (you can enhance this later)
    login(email.trim());
    navigate("/");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f8f8f8"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px"
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Login to SubSwap</h2>

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: "100%",
              padding: "0.6rem",
              marginTop: "0.3rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "1rem"
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{
              width: "100%",
              padding: "0.6rem",
              marginTop: "0.3rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "1rem"
            }}
          />
        </label>

        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.7rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
