import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";

// --- THIS IS THE FAKE REQUEST CARD ---
// It manages its own state for the demo
const FakeRequestCard = () => {
  // 'status' is now a local state, defaulting to 'pending'
  const [status, setStatus] = useState("pending");

  const handleUpdate = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <div className="request-card">
      <div className="request-card-info">
        <h4>Hotstar</h4>
        <p>
          You received a request from <strong>Me</strong>
        </p>
      </div>
      <div className="request-card-status">
        <span className={`status-badge status-${status}`}>{status}</span>
      </div>
      
      {/* Show actions only if status is 'pending' */}
      {status === "pending" && (
        <div className="request-card-actions">
          <button
            className="request-button decline"
            onClick={() => handleUpdate("declined")}
          >
            Decline
          </button>
          <button
            className="request-button accept"
            onClick={() => handleUpdate("accepted")}
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
};

const SwapRequests = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="dashboard-container" style={{ textAlign: "center" }}>
        <p>
          Please <Link to="/login">log in</Link> to view your swap requests.
        </p>
      </div>
    );
  }

  // --- THIS IS THE FAKE LOGIC ---
  // We check if the logged in user is our demo user
  const showFakeRequest = user.username === "priya@gmail.com";

  return (
    <div className="swap-requests-page">
      <div className="requests-container">
        <h2>Requests You've Received</h2>
        {/* If it's Priya, show the fake card. Otherwise, show "No requests." */}
        {showFakeRequest ? (
          <div className="request-list">
            <FakeRequestCard />
          </div>
        ) : (
          <p className="no-requests-message">
            You have not received any swap requests yet.
          </p>
        )}
      </div>

      <div className="requests-container">
        <h2>Requests You've Sent</h2>
        {/* We will just show "no requests" for the "sent" demo */}
        <p className="no-requests-message">
          You have not sent any swap requests yet.
        </p>
      </div>
    </div>
  );
};

export default SwapRequests;