// src/features/listings/ListingCard.jsx
import React from 'react';
import { useAuth } from '../auth/AuthContext';

const cardStyle = {
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '1rem',
  margin: '1rem',
  maxWidth: '300px',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease-in-out',
};

const ListingCard = ({ listing }) => {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const logoSrc = listing?.logo || 'https://via.placeholder.com/80';
  const serviceName = listing?.service || 'Subscription';
  const description = listing?.description || 'No description available';
  const owner = isLoggedIn && listing?.owner ? listing.owner : 'Login to view';

  return (
    <div style={cardStyle}>
      <img
        src={logoSrc}
        alt={serviceName}
        style={{ height: '60px', marginBottom: '0.8rem' }}
      />
      <h3>{serviceName}</h3>
      <p style={{ fontSize: '0.9rem', color: '#555' }}>{description}</p>
      <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
        <strong>Owner:</strong> {owner}
      </p>
    </div>
  );
};

export default ListingCard;
