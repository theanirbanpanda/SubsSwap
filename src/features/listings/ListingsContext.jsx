import { createContext, useContext, useState, useEffect } from "react";
import { 
  getListings, 
  addListing, 
  deleteListing,
  getSwapRequests,      // --- RE-ADDING ---
  addSwapRequest,       // --- RE-ADDING ---
  updateSwapRequestStatus, // --- RE-ADDING ---
  getChatMessages,  // --- RE-ADDING ---
  addChatMessage    // --- RE-ADDING ---
} from "./listingsAPI";
import { useAuth } from "../auth/AuthContext";

// 1. Create the context
const ListingsContext = createContext();

// 2. Create the Provider (the component that holds the state)
export const ListingsProvider = ({ children }) => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [swapRequests, setSwapRequests] = useState([]); // --- RE-ADDING ---
  const [chatMessages, setChatMessages] = useState([]); // --- RE-ADDING ---
  const [isLoading, setIsLoading] = useState(true);

  // This function fetches all data from our API (localStorage)
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const listingsData = await getListings();
      const requestsData = await getSwapRequests();
      const messagesData = await getChatMessages(); // --- RE-ADDING ---
      
      setListings(listingsData);
      setSwapRequests(requestsData);
      setChatMessages(messagesData); // --- RE-ADDING ---
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
    setIsLoading(false);
  };

  // Fetch all data when the user changes
  useEffect(() => {
    if (user) {
      fetchAllData();
    } else {
      // If no user, clear all data
      setListings([]);
      setSwapRequests([]);
      setChatMessages([]); // --- RE-ADDING ---
      setIsLoading(false);
    }
  }, [user]);

  // --- Wrapper functions ---
  const addListingProvider = async (newListingData) => {
    await addListing(newListingData);
    await fetchAllData(); // Re-fetch all
  };

  const deleteListingProvider = async (listingId) => {
    await deleteListing(listingId);
    await fetchAllData(); // Re-fetch all
  };

  // --- RE-ADDING: Wrapper functions for swap requests ---
  const addSwapRequestProvider = async (listing, fromUser) => {
    await addSwapRequest(listing, fromUser);
    await fetchAllData(); // Re-fetch requests
  };

  const updateSwapRequestProvider = async (requestId, newStatus) => {
    await updateSwapRequestStatus(requestId, newStatus);
    await fetchAllData(); // Re-fetch requests
  };

  // --- RE-ADDING: Wrapper for adding a chat message ---
  const addChatMessageProvider = async (message) => {
    await addChatMessage(message);
    await fetchAllData(); // Re-fetch all
  };

  // 5. Provide the state and functions to all children
  const value = {
    listings,
    swapRequests,
    chatMessages,
    isLoading,
    addListing: addListingProvider,
    deleteListing: deleteListingProvider,
    addSwapRequest: addSwapRequestProvider,
    updateSwapRequest: updateSwapRequestProvider,
    addChatMessage: addChatMessageProvider,
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