import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  // A simple email validation regex
  const emailRegex = /\S+@\S+\.\S+/;

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError(""); // Clear error on new input

    const atIndex = value.indexOf("@");
    if (atIndex > 0) {
      const domainPart = value.substring(atIndex + 1);
      
      // If user starts typing "g", "gm", etc. after "@"
      if (domainPart.length > 0 && "gmail.com".startsWith(domainPart)) {
        const remainingSuggestion = "gmail.com".substring(domainPart.length);
        if (remainingSuggestion) {
          setSuggestion(remainingSuggestion);
        } else {
          setSuggestion(null);
        }
      } 
      // If user just typed "@"
      else if (domainPart.length === 0) {
        setSuggestion("gmail.com");
      } 
      else {
        setSuggestion(null);
      }
    } else {
      setSuggestion(null);
    }
  };

  const applySuggestion = () => {
    if (suggestion) {
      setEmail(email + suggestion);
      setSuggestion(null);
      emailInputRef.current?.focus(); // Re-focus the input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // 1. Check for valid email
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // 2. Check for password
    if (password.trim() === "") {
      setError("Please enter your password.");
      return;
    }

    // 3. Try to login (using email as the username)
    // In a real app, you'd send this to a backend.
    // We'll just log in with the email as the "user"
    login(email.trim());
    navigate("/");
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <Link to="/" className="nav-logo login-logo">
          SubSwap
        </Link>
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue to SubSwap</p>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          {/* Show login error */}
          {error && <div className="login-error">{error}</div>}

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-group-with-suggestion">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                ref={emailInputRef}
                required
              />
              {/* This is the suggestion chip */}
              {suggestion && (
                <button
                  type="button"
                  className="suggestion-chip"
                  onClick={applySuggestion}
                  tabIndex="-1" // Make it not focusable with Tab
                >
                  {suggestion}
                </button>
              )}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // Clear error on new input
              }}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <p className="login-footer-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;