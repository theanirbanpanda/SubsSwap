import { useAuth } from "../features/auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  if (!user) {
    return (
      <div className="dashboard-container" style={{ textAlign: "center" }}>
        <p>
          Please <Link to="/login">log in</Link> to view your profile.
        </p>
      </div>
    );
  }

  // Create a simple avatar from the first letter of the email/username
  const avatarLetter = user.username ? user.username[0].toUpperCase() : "?";

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-avatar">{avatarLetter}</div>
        <div className="profile-info">
          <h2>{user.username}</h2>
          {user.verified && (
            <span className="profile-verified-badge">✔ Verified User</span>
          )}
        </div>
        <button className="profile-logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;