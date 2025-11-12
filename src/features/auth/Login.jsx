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
    setError(""); 

    const atIndex = value.indexOf("@");
    if (atIndex > 0) {
      const domainPart = value.substring(atIndex + 1);
      
      if (domainPart.length > 0 && "gmail.com".startsWith(domainPart)) {
        const remainingSuggestion = "gmail.com".substring(domainPart.length);
        if (remainingSuggestion) {
          setSuggestion(remainingSuggestion);
        } else {
          setSuggestion(null);
        }
      } 
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
      emailInputRef.current?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    
    try {
      // The login function now handles all validation
      login(email, password);
      navigate("/"); // Navigate only if login is successful
    } catch (err) {
      // Catch the error from AuthContext and display it
      setError(err.message);
    }
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
          {error && <div className="login-error">{error}</div>}

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-group-with-suggestion">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="me@gmail.com"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                ref={emailInputRef}
                required
              />
              {suggestion && (
                <button
                  type="button"
                  className="suggestion-chip"
                  onClick={applySuggestion}
                  tabIndex="-1"
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
              placeholder="123"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;