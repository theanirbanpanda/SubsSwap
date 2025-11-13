import { createContext, useContext, useState, useEffect } from "react";
import { 
  getListings, 
  addListing, 
  deleteListing,
} from "./listingsAPI";
import { useAuth } from "../auth/AuthContext";

// 1. Create the context
const ListingsContext = createContext();

// 2. Create the Provider (the component that holds the state)
export const ListingsProvider = ({ children }) => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This function fetches all data from our API (localStorage)
  const fetchListings = async () => {
    setIsLoading(true);
    try {
      // getListings() will now seed data *only if needed*
      const data = await getListings();
      setListings(data);
    } catch (err) {
      console.error("Failed to fetch listings:", err);
    }
    setIsLoading(false);
  };

  // Fetch all data when the user changes
  useEffect(() => {
    if (user) {
      fetchListings();
    } else {
      // If no user, clear all data
      setListings([]);
      setIsLoading(false);
    }
  }, [user]);

  // --- Wrapper functions ---
  const addListingProvider = async (newListingData) => {
    await addListing(newListingData);
    await fetchListings(); // Re-fetch all
  };

  const deleteListingProvider = async (listingId) => {
    await deleteListing(listingId);
    await fetchListings(); // Re-fetch all
  };

  // 5. Provide the state and functions to all children
  const value = {
    listings,
    isLoading,
    addListing: addListingProvider,
    deleteListing: deleteListingProvider,
  };

  return (
    <ListingsContext.Provider value={value}>
      {children}
    </ListingsContext.Provider>
  );
};

// 6. Create a custom hook to easily use the context
export const useListings = () => {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error("useListings must be used within a ListingsProvider");
  }
  return context;
};