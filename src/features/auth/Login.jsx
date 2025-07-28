import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
      navigate("/");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ marginBottom: "20px" }}>Login to SubSwap</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{ width: "100%", padding: "10px", marginBottom: "12px" }}
          type="password"
          placeholder="Enter password"
        />
        <button style={{ width: "100%", padding: "10px" }} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
