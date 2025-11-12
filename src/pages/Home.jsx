import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import SubscriptionCard from "../components/SubscriptionCard";
import SwapRequestModal from "../components/SwapRequestModal";

// --- DUMMY DATA ---
const dummyListings = [
  { id: 1, name: "Hotstar", owner: "Priya", price: "149", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg", logoRequiresBg: true },
  { id: 2, name: "SonyLIV", owner: "Rohan", price: "99", logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Sonyliv_app_logo.svg/1200px-Sonyliv_app_logo.svg.png", logoRequiresBg: true },
  { id: 3, name: "Prime Video", owner: "Aisha", price: "129", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Amazon_Prime_Video_logo.svg" },
  { id: 4, name: "JioCinema", owner: "Vikram", price: "89", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/JioCinema_logo.svg/1280px-JioCinema_logo.svg.png", logoRequiresBg: true },
  { id: 5, name: "ZEE5", owner: "verified_user", price: "79", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/ZEE5_logo.svg/1200px-ZEE5_logo.svg.png", logoRequiresBg: true },
  { id: 6, name: "Netflix", owner: "Sneha", price: "199", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { id: 7, name: "Gaana", owner: "Amit", price: "49", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Gaana_logo.svg/1200px-Gaana_logo.svg.png", logoRequiresBg: true },
  { id: 8, name: "Spotify", owner: "Ravi", price: "119", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
];


// --- LOGGED-OUT PROMOTIONAL PAGE (Unchanged) ---
const LoginGate = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="login-gate" onClick={() => navigate("/login")}>
      <div className="login-gate-blur">{children}</div>
      <div className="login-gate-overlay">
        <span>Click to Log in</span>
      </div>
    </div>
  );
};

const PromoCard = ({ listing }) => {
  const navigate = useNavigate();
  return (
    <div className="promo-card" onClick={() => navigate("/login")}>
      <div className="promo-card-header">
        <h3>{listing.name}</h3>
        <span>by {listing.owner}</span>
      </div>
      <div className="promo-card-price">
        Starts from <span>₹{listing.price}/mo</span>
      </div>
    </div>
  );
};

const LoggedOutHomePage = () => {
  const visibleListings = dummyListings.slice(0, 5);
  const hiddenListings = dummyListings.slice(5);

  return (
    <div className="landing-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Stop Wasting Money on Subscriptions.
          </h1>
          <p className="hero-subtitle">
            Trade your unused subscriptions like Hotstar, SonyLIV, and more.
            Join thousands of Indians saving money every month.
          </p>
          <Link to="/login" className="hero-cta-button">
            Start Swapping for Free
          </Link>
        </div>
      </section>
      <section className="features-section">
        <div className="feature-card">
          <span className="feature-icon">🔍</span>
          <h3>Find Your Swap</h3>
          <p>Browse a massive library of available subscriptions.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🤝</span>
          <h3>Secure & Easy</h3>
          <p>Our platform ensures a safe and simple swap every time.</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">💸</span>
          <h3>Save Instantly</h3>
          <p>Cut down your monthly bills by sharing and swapping.</p>
        </div>
      </section>
      <section className="preview-section">
        <h2>Available for Swapping Now</h2>
        <div className="promo-grid">
          {visibleListings.map((listing) => (
            <PromoCard key={listing.id} listing={listing} />
          ))}
          {hiddenListings.map((listing) => (
            <LoginGate key={listing.id}>
              <PromoCard listing={listing} />
            </LoginGate>
          ))}
        </div>
        <p className="preview-footer">
          ...and hundreds more.{" "}
          <Link to="/login">Sign in to see all</Link>
        </p>
      </section>
      <footer className="landing-footer">
        <p>© 2025 SubSwap India. All rights reserved.</p>
      </footer>
    </div>
  );
};


// --- LOGGED-IN DASHBOARD (UPDATED) ---
const LoggedInHomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedListing, setSelectedListing] = useState(null);

  const myUsername = user.username;
  const availableListings = dummyListings.filter(
    (listing) => listing.owner !== myUsername
  );

  const handleSwapClick = (listing) => {
    setSelectedListing(listing);
  };

  const handleCloseModal = () => {
    setSelectedListing(null);
  };

  // --- THIS IS THE UPDATED FUNCTION ---
  const handleConfirmSwap = () => {
    if (!selectedListing) return; // Safety check

    // Create the search params for the chat URL
    const topic = encodeURIComponent(selectedListing.name);
    const userToChatWith = encodeURIComponent(selectedListing.owner);
    
    handleCloseModal();
    // Navigate to the chat page with the info in the URL
    navigate(`/chat?topic=${topic}&user=${userToChatWith}`); 
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Available Subscriptions</h1>
      <p className="dashboard-subtitle">
        Browse subscriptions available for swapping from other users.
      </p>
      <div className="dashboard-grid">
        {availableListings.map((listing) => (
          <SubscriptionCard 
            key={listing.id} 
            listing={listing}
            onSwap={handleSwapClick}
          />
        ))}
      </div>

      <SwapRequestModal
        listing={selectedListing}
        onClose={handleCloseModal}
        onConfirm={handleConfirmSwap}
      />
    </div>
  );
};


// --- Main Home Component ---
const Home = () => {
  const { user } = useAuth();
  return !user ? <LoggedOutHomePage /> : <LoggedInHomePage />;
};

export default Home;