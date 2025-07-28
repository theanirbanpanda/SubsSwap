// src/features/listings/ListingCard.jsx
import React from 'react';
import { useAuth } from '../auth/AuthContext';

const ListingCard = ({ listing }) => {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const logoSrc = listing?.logo || 'https://via.placeholder.com/80';
  const serviceName = listing?.service || 'Subscription';
  const description = listing?.description || 'No description available';
  const owner = isLoggedIn && listing?.owner ? listing.owner : 'Login to view';

  return (
    <div style={styles.card}>
      <img src={logoSrc} alt="Logo" style={styles.logo} />
      <h3>{serviceName}</h3>
      <p>{description}</p>
      <p style={styles.owner}>Owner: {owner}</p>
    </div>
  );
};

const styles = {
  card: {
    width: '250px',
    padding: '16px',
    margin: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
    marginBottom: '12px',
  },
  owner: {
    marginTop: '10px',
    fontStyle: 'italic',
    fontSize: '0.9em',
    color: '#444',
  },
};

export default ListingCard;
