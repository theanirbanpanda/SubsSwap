import React from 'react';

const SubscriptionCard = ({ listing, onSwap }) => {

  // Dynamically set the class for the logo container
  const logoContainerClass = `sub-card-logo-container ${
    listing.logoRequiresBg ? 'logo-with-bg' : ''
  }`;

  return (
    <div className="sub-card">
      <div className="sub-card-header">
        <div className={logoContainerClass}>
          <img 
            src={listing.logoUrl} 
            alt={`${listing.name} logo`} 
            className="sub-card-logo"
            // Simple fallback in case a URL is broken
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
        <div className="sub-card-price">
          <span>Est. Value</span>
          ₹{listing.price}/mo
        </div>
      </div>
      <h3 className="sub-card-title">{listing.name}</h3>
      <p className="sub-card-owner">
        Owned by: <strong>{listing.owner}</strong>
      </p>
      <button 
        className="sub-card-button" 
        onClick={() => onSwap(listing)}
      >
        Request Swap
      </button>
    </div>
  );
};

export default SubscriptionCard;