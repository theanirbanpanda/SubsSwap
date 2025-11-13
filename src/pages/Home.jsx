import { useState, useEffect } from "react";
import { useAuth } from "../features/auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useListings } from "../features/listings/ListingsContext";
import SubscriptionCard from "../components/SubscriptionCard";
import SwapRequestModal from "../components/SwapRequestModal";

// --- LOGGED-OUT PROMOTIONAL PAGE ---
const LoggedOutHomePage = () => {
  const navigate = useNavigate();
  // --- UPDATED PROMO DATA ---
  const promoListings = [
    { id: 1, name: "Hotstar", owner: "priya@gmail.com", price: "149" },
    { id: 2, name: "SonyLIV", owner: "rohan@example.com", price: "99" },
    { id: 3, name: "Prime Video", owner: "aisha@example.com", price: "129" },
    { id: 4, name: "JioCinema", owner: "vikram@example.com", price: "89" },
    { id: 5, name: "ZEE5", owner: "verified_user@example.com", price: "79" },
  ];

  const LoginGate = ({ children }) => (
    <div className="login-gate" onClick={() => navigate("/login")}>
      <div className="login-gate-blur">{children}</div>
      <div className="login-gate-overlay"><span>Click to Log in</span></div>
    </div>
  );

  const PromoCard = ({ listing }) => (
    <div className="promo-card" onClick={() => navigate("/login")}>
      <div className="promo-card-header">
        <h3>{listing.name}</h3>
        {/* We'll just show the first part of the email */}
        <span>by {listing.owner.split('@')[0]}</span>
      </div>
      <div className="promo-card-price">
        Starts from <span>₹{listing.price}/mo</span>
      </div>
    </div>
  );

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
          {promoListings.map((listing) => (
            <PromoCard key={listing.id} listing={listing} />
          ))}
          <LoginGate>
            <PromoCard listing={{ id: 6, name: "Netflix", owner: "sneha@example.com", price: "199" }} />
          </LoginGate>
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


// --- LOGGED-IN DASHBOARD ---
const LoggedInHomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Get all listings from the simplified context
  const { listings, isLoading } = useListings();
  
  const [selectedListing, setSelectedListing] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // This filter is CORRECT and now runs on the FULL list of listings
  const availableListings = listings.filter(
    (listing) => listing.owner !== user.username
  );

  // Filter the list based on the search query
  const filteredListings = availableListings.filter((listing) =>
    listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    listing.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Modal Functions
  const handleSwapClick = (listing) => {
    setSelectedListing(listing);
  };
  const handleCloseModal = () => {
    setSelectedListing(null);
  };
  
  // --- THIS FUNCTION IS NOW SIMPLIFIED ---
  const handleConfirmSwap = () => {
    if (!selectedListing) return;
    
    // 1. No longer creates a swap request
    // 2. Just navigates to chat
    const topic = encodeURIComponent(selectedListing.name);
    const userToChatWith = encodeURIComponent(selectedListing.owner);
    handleCloseModal();
    navigate(`/chat?topic=${topic}&user=${userToChatWith}`); 
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Available Subscriptions</h1>
      <p className="dashboard-subtitle">
        Browse subscriptions available for swapping from other users.
      </p>

      <div className="dashboard-search-bar">
        <input
          type="text"
          placeholder="Search by name or owner (e.g., 'Netflix' or 'priya@gmail.com')"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {isLoading ? (
        <p>Loading subscriptions...</p>
      ) : (
        <>
          {filteredListings.length > 0 ? (
            <div className="dashboard-grid">
              {filteredListings.map((listing) => (
                <SubscriptionCard 
                  key={listing.id} 
                  listing={listing}
                  variant="browse"
                  onSwap={handleSwapClick}
                />
              ))}
            </div>
          ) : (
            <div className="no-listings-message">
              {searchQuery.length > 0 ? (
                `No results found for "${searchQuery}".`
              ) : (
                "No subscriptions are available for swapping right now."
              )}
            </div>
          )}
        </>
      )}

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