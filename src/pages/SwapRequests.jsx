import { useEffect, useState } from "react";
import { useAuth } from "../features/auth/AuthContext";

const SwapRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("swapRequests")) || [];
    const relevant = saved.filter(
      (req) => req.from === user?.username || req.to === user?.username
    );
    setRequests(relevant);
  }, [user]);

  const acceptRequest = (id) => {
    const updated = requests.map((r) =>
      r.id === id ? { ...r, status: "Accepted" } : r
    );
    setRequests(updated);
    localStorage.setItem("swapRequests", JSON.stringify(updated));
  };

  if (!user) return <p style={{ padding: "20px" }}>Login to view swap requests.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Swap Requests</h2>
      {requests.length === 0 ? (
        <p>No swap requests yet.</p>
      ) : (
        <ul>
          {requests.map((req) => (
            <li key={req.id} style={{ marginBottom: "10px" }}>
              <strong>{req.from}</strong> wants to swap <em>{req.offer}</em> for <em>{req.want}</em>
              <br />
              Status: <strong>{req.status}</strong>
              {req.to === user.username && req.status === "Pending" && (
                <button onClick={() => acceptRequest(req.id)} style={{ marginLeft: "10px" }}>
                  Accept
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SwapRequests;
