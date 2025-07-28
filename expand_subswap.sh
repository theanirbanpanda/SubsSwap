rm -rf src/components/* src/features/listings/* src/pages/* src/utils/*

mkdir -p src/components src/features/listings src/pages src/utils

# listings context and API logic (mock)
echo "import React, { createContext, useContext, useState, useEffect } from 'react';

const ListingsContext = createContext();

export function ListingsProvider({ children }) {
  const [listings, setListings] = useState(() => {
    try {
      const stored = localStorage.getItem('listings');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('listings', JSON.stringify(listings));
  }, [listings]);

  const addListing = listing => setListings(prev => [...prev, {...listing, id: Date.now()}]);
  const removeListing = id => setListings(prev => prev.filter(l => l.id !== id));
  const updateListing = updated => setListings(prev => prev.map(l => (l.id === updated.id ? updated : l)));

  return (
    <ListingsContext.Provider value={{ listings, addListing, removeListing, updateListing }}>
      {children}
    </ListingsContext.Provider>
  );
}

export function useListings() {
  const context = useContext(ListingsContext);
  if (!context) throw new Error('useListings must be used within ListingsProvider');
  return context;
}
" > src/features/listings/ListingsContext.jsx

# ListingCard component
echo "import React from 'react';

export default function ListingCard({ listing }) {
  return (
    <div className='listing-card'>
      <h3>{listing.title}</h3>
      <p><strong>Category:</strong> {listing.category}</p>
      <p><strong>Owner:</strong> {listing.owner}</p>
    </div>
  );
}
" > src/components/ListingCard.jsx

# ListingGrid component
echo "import React from 'react';
import ListingCard from './ListingCard';

export default function ListingGrid({ listings }) {
  if (!listings.length) return <p>No subscriptions found.</p>;

  return (
    <div className='listing-grid'>
      {listings.map(l => <ListingCard key={l.id} listing={l} />)}
    </div>
  );
}
" > src/components/ListingGrid.jsx

# Update Share page to use listings context and save new listings
echo "import React, { useState } from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { useListings } from '../features/listings/ListingsContext';

export default function Share() {
  const { user } = useAuth();
  const { addListing } = useListings();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim() || !category.trim()) return;
    addListing({ title, category, owner: user.username });
    setTitle('');
    setCategory('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className='share'>
      <h2>Share a Subscription</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder='Subscription Name' value={title} onChange={e => setTitle(e.target.value)} required />
        <input placeholder='Category' value={category} onChange={e => setCategory(e.target.value)} required />
        <button type='submit'>Share</button>
      </form>
      {success && <p className='success'>Subscription shared successfully!</p>}
    </div>
  );
}
" > src/pages/Share.jsx

# Update Home page: list all subscriptions with search filter
echo "import React, { useState, useMemo } from 'react';
import { useListings } from '../features/listings/ListingsContext';

export default function Home() {
  const { listings } = useListings();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => listings.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.category.toLowerCase().includes(search.toLowerCase()) ||
    l.owner.toLowerCase().includes(search.toLowerCase())
  ), [search, listings]);

  return (
    <div className='home'>
      <h2>Available Subscriptions</h2>
      <input
        placeholder='Search subscriptions...'
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p>No matching subscriptions.</p>
      ) : (
        <div className='listing-grid'>
          {filtered.map(l => (
            <div key={l.id} className='listing-card'>
              <h3>{l.title}</h3>
              <p><strong>Category:</strong> {l.category}</p>
              <p><strong>Owner:</strong> {l.owner}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
" > src/pages/Home.jsx

# Update Profile page: show user's shared subscriptions
echo "import React from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { useListings } from '../features/listings/ListingsContext';

export default function Profile() {
  const { user } = useAuth();
  const { listings } = useListings();

  const userListings = listings.filter(l => l.owner === user.username);

  return (
    <div className='profile'>
      <h2>Profile: {user.username}</h2>
      <h3>Your Shared Subscriptions</h3>
      {userListings.length === 0 ? (
        <p>You haven't shared any subscriptions yet.</p>
      ) : (
        <div className='listing-grid'>
          {userListings.map(l => (
            <div key={l.id} className='listing-card'>
              <h3>{l.title}</h3>
              <p><strong>Category:</strong> {l.category}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
" > src/pages/Profile.jsx

# Requests page skeleton (future swap requests)
echo "import React from 'react';

export default function Requests() {
  return (
    <div className='requests'>
      <h2>Swap Requests</h2>
      <p>Feature coming soon! Users will be able to send and manage swap requests here.</p>
    </div>
  );
}
" > src/pages/Requests.jsx

# Update App.jsx to add ListingsProvider and new routes (replace whole content)
echo "import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import { ListingsProvider } from './features/listings/ListingsContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Share from './pages/Share';
import Requests from './pages/Requests';

export default function App() {
  return (
    <AuthProvider>
      <ListingsProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path='/share' element={<PrivateRoute><Share /></PrivateRoute>} />
            <Route path='/requests' element={<PrivateRoute><Requests /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </ListingsProvider>
    </AuthProvider>
  );
}
" > src/App.jsx

# Update Navbar.jsx to add links to new pages
echo "import React from 'react';
import { useAuth } from '../features/auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className='navbar'>
      <Link to='/' className='logo'>SubSwap</Link>
      <div className='nav-right'>
        {user ? (
          <>
            <span>Hi, {user.username}</span>
            <Link to='/share'>Share</Link>
            <Link to='/requests'>Requests</Link>
            <Link to='/profile'>Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </div>
    </nav>
  );
}
" > src/components/Navbar.jsx

# Add some basic styles with responsiveness
echo "body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f9fafb;
}
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: #0d6efd;
  color: white;
  flex-wrap: wrap;
}
.navbar .logo {
  font-weight: bold;
  font-size: 1.4rem;
  text-decoration: none;
  color: white;
}
.navbar .nav-right > * {
  margin-left: 1rem;
}
.navbar button {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  font: inherit;
}
.auth-form, .profile, .share, .requests, .home {
  max-width: 600px;
  margin: 2rem auto;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
input {
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
}
button {
  padding: 0.6rem 1.2rem;
  background: #0d6efd;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
button:hover {
  background: #084cdb;
}
.error {
  color: red;
}
.success {
  color: green;
}
.listing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit,minmax(240px,1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.listing-card {
  background: #e3f2fd;
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
}
@media (max-width: 600px) {
  .navbar {
    justify-content: center;
  }
  .navbar .nav-right > * {
    margin-left: 0.5rem;
    font-size: 0.9rem;
  }
}
" > src/index.css

