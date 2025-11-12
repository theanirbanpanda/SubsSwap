import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// --- HARDCODED *TEST* USER DATABASE ---
// These users have a special password
const testUsers = {
  "me@gmail.com": {
    username: "me@gmail.com",
    password: "123",
    verified: false,
  },
  "priya@gmail.com": {
    username: "priya@gmail.com",
    password: "123",
    verified: true, // Priya is a verified user
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // --- NEW LOGIN FUNCTION ---
  const login = (email, password) => {
    // 1. Check if it's one of our special test users
    const testUser = testUsers[email];
    if (testUser) {
      if (testUser.password === password) {
        const userData = { username: testUser.username, verified: testUser.verified };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        return true; // Login successful
      } else {
        // Correct email, but wrong password for a test user
        throw new Error("Invalid credentials. Please use one of the demo accounts (pass: 123).");
      }
    }

    // 2. If not a test user, check if it's a valid new user (any @gmail.com)
    // We'll let any password work for non-test users for the demo
    if (email.endsWith("@gmail.com") && password) {
      // It's a new user. Log them in.
      const userData = { username: email, verified: false };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return true; // Login successful
    }

    // 3. If it's not a test user and not a valid @gmail.com
    throw new Error("Invalid email. Please use a @gmail.com address.");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);