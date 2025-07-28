import { useAuth } from "../features/auth/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return <p style={{ padding: "20px" }}>Please login to view your profile.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Profile</h2>
      <p>
        Username: <strong>{user.username}</strong>{" "}
        {user.verified && (
          <span style={{ color: "green", marginLeft: "10px", fontWeight: "bold" }}>✔ Verified</span>
        )}
      </p>
    </div>
  );
};

export default Profile;
