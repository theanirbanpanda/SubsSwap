import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";
import { useListings } from "../features/listings/ListingsContext";
import SubscriptionCard from "../components/SubscriptionCard";
import { Link } from "react-router-dom";

const MySubscriptions = () => {
  const { user } = useAuth();
  const { listings, isLoading, addListing, deleteListing } = useListings();
  
  // --- NEW: State for all form inputs ---
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [slots, setSlots] = useState("");
  const [renewalDate, setRenewalDate] = useState("");
  const [seeking, setSeeking] = useState("");
  
  const [error, setError] = useState("");

  // Filter the list to show only the user's listings
  const myListings = listings.filter(
    (listing) => listing.owner === user?.username
  );

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!serviceName || !price || !slots) {
      setError("Please fill in at least Service Name, Price, and Slots.");
      return;
    }
    
    // --- NEW: Create full listing object ---
    const newListing = {
      name: serviceName,
      price: price,
      slots: slots,
      renewal: renewalDate,
      seeking: seeking,
      owner: user.username, // Assign the current user as owner
    };

    await addListing(newListing); // Send the new object to the context
    
    // Clear form
    setServiceName("");
    setPrice("");
    setSlots("");
    setRenewalDate("");
    setSeeking("");
    setError("");
  };

  // Handle deleting a listing
  const handleDelete = async (listingId) => {
    await deleteListing(listingId);
  };

  if (!user) {
    return (
      <div className="dashboard-container">
        <p style={{ textAlign: "center", color: "var(--dark-text-secondary)" }}>
          Please <Link to="/login">log in</Link> to manage your subscriptions.
        </p>
      </div>
    );
  }

  return (
    <div className="my-subscriptions-page">
      {/* 1. Add New Form */}
      <div className="add-sub-form-container">
        <h2>Add Your Subscription</h2>
        <p>Add a subscription you own and want to swap.</p>
        <form className="add-sub-form" onSubmit={handleSubmit}>
          
          {/* --- NEW: Updated Form Fields --- */}
          <div className="form-row">
            <div className="input-group" style={{ flex: 2 }}>
              <label htmlFor="serviceName">Service Name</label>
              <input
                id="serviceName"
                type="text"
                placeholder="e.g., Netflix"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label htmlFor="price">Monthly Value (₹)</label>
              <input
                id="price"
                type="number"
                placeholder="e.g., 199"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group" style={{ flex: 1 }}>
              <label htmlFor="slots">Slots Available</label>
              <input
                id="slots"
                type="text"
                placeholder="e.g., 2 of 4"
                value={slots}
                onChange={(e) => setSlots(e.target.value)}
              />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label htmlFor="renewalDate">Renewal Date (Optional)</label>
              <input
                id="renewalDate"
                type="date"
                value={renewalDate}
                onChange={(e) => setRenewalDate(e.target.value)}
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="seeking">Seeking in Return (Optional)</label>
            <input
              id="seeking"
              type="text"
              placeholder="e.g., Hotstar, SonyLIV"
              value={seeking}
              onChange={(e) => setSeeking(e.target.value)}
            />
          </div>
          
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="add-sub-button">
            Add My Subscription
          </button>
        </form>
      </div>

      {/* 2. User's Listings Grid */}
      <div className="my-listings-grid">
        <h2>Your Posted Subscriptions</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : myListings.length === 0 ? (
          <p className="no-listings-message">
            You haven't added any subscriptions yet. Use the form above to add one!
          </p>
        ) : (
          <div className="dashboard-grid">
            {myListings.map((listing) => (
              <SubscriptionCard
                key={listing.id}
                listing={listing}
                variant="manage" // Use the "manage" variant
                onDelete={handleDelete} // Pass the delete function
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySubscriptions;