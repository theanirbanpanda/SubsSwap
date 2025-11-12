import React from 'react';

// Default variant to 'browse' if not provided
const SubscriptionCard = ({ listing, onSwap, onDelete, variant = "browse" }) => {
  
  const logoContainerClass = `sub-card-logo-container ${
    listing.logoRequiresBg ? 'logo-with-bg' : ''
  }`;

  const fallbackLogo = `https://ui-avatars.com/api/?name=${listing.name}&background=4f46e5&color=fff&size=80`;
  
  const getFriendlyName = (email) => {
    if (!email) return "Unknown";
    let name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // --- NEW: Check if the owner is our verified user ---
  const isOwnerVerified = listing.owner === 'priya@gmail.com';

  return (
    <div className="sub-card">
      <div className="sub-card-header">
        <div className={logoContainerClass}>
          <img 
            src={listing.logoUrl} 
            alt={`${listing.name} logo`} 
            className="sub-card-logo"
            onError={(e) => e.target.src = fallbackLogo}
          />
        </div>
        <div className="sub-card-price">
          <span>Est. Value</span>
          ₹{listing.price}/mo
        </div>
      </div>
      <h3 className="sub-card-title">{listing.name}</h3>

      {variant === "browse" && (
        <p className="sub-card-owner">
          Owned by: <strong>{getFriendlyName(listing.owner)}</strong>
          {/* --- NEW: Show Verified Badge --- */}
          {isOwnerVerified && (
            <span className="verified-badge-card" title="Verified User">✔</span>
          )}
        </p>
      )}

      {/* --- NEW: Display rich details --- */}
      <div className="sub-card-details">
        <div className="detail-item">
          <span>Slots</span>
          <strong>{listing.slots || 'N/A'}</strong>
        </div>
        <div className="detail-item">
          <span>Renews</span>
          <strong>{listing.renewal ? new Date(listing.renewal).toLocaleDateString() : 'N/A'}</strong>
        </div>
      </div>
      {listing.seeking && (
        <div className="detail-item seeking">
          <span>Seeking</span>
          <strong>{listing.seeking}</strong>
        </div>
      )}


      {/* Conditionally show the correct button */}
      {variant === "browse" ? (
        <button 
          className="sub-card-button" 
          onClick={() => onSwap(listing)}
        >
          Request Swap
        </button>
      ) : (
        <button 
          className="sub-card-button delete"
          onClick={() => onDelete(listing.id)}
        >
          Delete This Listing
        </button>
      )}
    </div>
  );
};

export default SubscriptionCard;