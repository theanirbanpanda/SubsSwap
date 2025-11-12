import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import { useListings } from "../features/listings/ListingsContext";

// A component for rendering a single request card
const RequestCard = ({ request, type, onUpdate }) => {
  const { fromUser, toUser, listingName, status } = request;
  
  // Get a specific class for the status badge
  const statusClass = `status-${status.toLowerCase()}`;
  
  const getFriendlyName = (email) => {
    if (!email) return "Unknown";
    let name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div className="request-card">
      <div className="request-card-info">
        <h4>{listingName}</h4>
        {type === "sent" ? (
          <p>
            You sent a request to <strong>{getFriendlyName(toUser)}</strong>
          </p>
        ) : (
          <p>
            You received a request from <strong>{getFriendlyName(fromUser)}</strong>
          </p>
        )}
      </div>
      <div className="request-card-status">
        <span className={`status-badge ${statusClass}`}>{status}</span>
      </div>
      {/* Show actions only for received, pending requests */}
      {type === "received" && status === "pending" && (
        <div className="request-card-actions">
          <button
            className="request-button decline"
            onClick={() => onUpdate(request.id, "declined")}
          >
            Decline
          </button>
          <button
            className="request-button accept"
            onClick={() => onUpdate(request.id, "accepted")}
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
  const { swapRequests, updateSwapRequest, isLoading } = useListings();

  // This filters our requests based on the user's *email* (user.username)
  const { sentRequests, receivedRequests } = useMemo(() => {
    if (!user) return { sentRequests: [], receivedRequests: [] };
    const sent = swapRequests.filter((req) => req.fromUser === user.username);
    const received = swapRequests.filter((req) => req.toUser === user.username);
    return { sentRequests, receivedRequests };
  }, [swapRequests, user]);

  const handleUpdateRequest = (requestId, newStatus) => {
    updateSwapRequest(requestId, newStatus);
  };

  if (!user) {
    return (
      <div className="dashboard-container" style={{ textAlign: "center" }}>
        <p>
          Please <Link to="/login">log in</Link> to view your swap requests.
        </p>
      </div>
    );
  }

  return (
    <div className="swap-requests-page">
      <div className="requests-container">
        <h2>Requests You've Received</h2>
        {isLoading ? (
          <p>Loading requests...</p>
        ) : receivedRequests.length === 0 ? (
          <p className="no-requests-message">
            You have not received any swap requests yet.
          </p>
        ) : (
          <div className="request-list">
            {receivedRequests.map((req) => (
              <RequestCard
                key={req.id}
                request={req}
                type="received"
                onUpdate={handleUpdateRequest}
              />
            ))}
          </div>
        )}
      </div>

      <div className="requests-container">
        <h2>Requests You've Sent</h2>
        {isLoading ? (
          <p>Loading requests...</p>
        ) : sentRequests.length === 0 ? (
          <p className="no-requests-message">
            You have not sent any swap requests yet.
          </p>
        ) : (
          <div className="request-list">
            {sentRequests.map((req) => (
              <RequestCard key={req.id} request={req} type="sent" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapRequests;