import React, { useEffect, useState } from "react";

const SwapRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("swapRequests");
    if (stored) {
      try {
        setRequests(JSON.parse(stored));
      } catch (err) {
        console.error("Invalid swapRequests in localStorage");
      }
    }
  }, []);

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>Swap Requests</h2>
      <ul style={{ paddingLeft: 0, listStyle: "none" }}>
        {requests.map((req, idx) => (
          <li key={idx} style={{ marginBottom: "1rem", background: "#f0f0f0", padding: "1rem", borderRadius: "6px" }}>
            <div><strong>From:</strong> {req.from}</div>
            <div><strong>Offer:</strong> {req.offer}</div>
            <div><strong>Want:</strong> {req.want}</div>
            <div><strong>Status:</strong> {req.status}</div>
          </li>
        ))}
      </ul>
      {requests.length === 0 && <p>No swap requests found.</p>}
    </div>
  );
};

export default SwapRequests;
