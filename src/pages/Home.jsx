import { useAuth } from "../features/auth/AuthContext";
import { Link } from "react-router-dom";

const dummyListings = [
  { id: 1, name: "Netflix", owner: "verified_user" },
  { id: 2, name: "Spotify", owner: "alice" },
  { id: 3, name: "Disney+", owner: "bob" },
  { id: 4, name: "HBO Max", owner: "charlie" },
  { id: 5, name: "Amazon Prime", owner: "verified_user" },
  { id: 6, name: "Apple TV", owner: "diana" },
];

const Home = () => {
  const { user } = useAuth();
  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Subscriptions</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
        {dummyListings.map((listing) => (
          <div
            key={listing.id}
            style={{
              border: "1px solid #ccc",
              padding: "16px",
              borderRadius: "8px",
              textAlign: "center",
              filter: user ? "none" : "blur(4px)",
              pointerEvents: user ? "auto" : "none",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{listing.name}</h3>
            <p>Owner: {listing.owner}</p>
            {user && listing.owner !== user.username && (
              <button style={{ marginTop: "8px" }}>
                <Link to="/chat">Request Swap</Link>
              </button>
            )}
          </div>
        ))}
      </div>
      {!user && <p style={{ marginTop: "20px", color: "gray" }}>Login to view swap options</p>}
    </div>
  );
};

export default Home;
