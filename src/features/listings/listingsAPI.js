// A single key for all subscriptions in localStorage
const STORAGE_KEY = "subswap_all_listings";
const SWAP_REQUESTS_KEY = "subswap_all_requests"; // --- RE-ADDING ---
const CHAT_MESSAGES_KEY = "subswap_chat_messages"; // --- RE-ADDING ---

// --- THE FULL DUMMY DATA ---
const INITIAL_DUMMY_DATA = [
  { id: 1, name: "Hotstar", owner: "priya@gmail.com", price: "149", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg", logoRequiresBg: true },
  { id: 2, name: "SonyLIV", owner: "rohan@example.com", price: "99", logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Sonyliv_app_logo.svg/1200px-Sonyliv_app_logo.svg.png", logoRequiresBg: true },
  { id: 3, name: "Prime Video", owner: "aisha@example.com", price: "129", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Amazon_Prime_Video_logo.svg" },
  { id: 4, name: "JioCinema", owner: "vikram@example.com", price: "89", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/JioCinema_logo.svg/1280px-JioCinema_logo.svg.png", logoRequiresBg: true },
  { id: 5, name: "ZEE5", owner: "verified_user@example.com", price: "79", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/ZEE5_logo.svg/1200px-ZEE5_logo.svg.png", logoRequiresBg: true },
  { id: 6, name: "Netflix", owner: "me@gmail.com", price: "199", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { id: 7, name: "Gaana", owner: "amit@example.com", price: "49", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Gaana_logo.svg/1200px-Gaana_logo.svg.png", logoRequiresBg: true },
  { id: 8, name: "Spotify", owner: "priya@gmail.com", price: "119", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
];

/**
 * Gets all listings from localStorage.
 * If localStorage is empty, it seeds it with the initial dummy data.
 */
export const getListings = () => {
  let listings = JSON.parse(localStorage.getItem(STORAGE_KEY));
  
  // This is the correct, fixed logic
  if (!listings || listings.length === 0) {
    listings = INITIAL_DUMMY_DATA;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
    // Clear other keys ONLY when seeding
    localStorage.removeItem(SWAP_REQUESTS_KEY);
    localStorage.removeItem(CHAT_MESSAGES_KEY);
  }
  return Promise.resolve(listings);
};

/**
 * Adds a new listing to the list.
 */
export const addListing = async (newListing) => {
  const listings = await getListings();
  
  const listingToAdd = {
    ...newListing,
    id: Date.now(),
    logoUrl: `https://logo.clearbit.com/${newListing.name.toLowerCase().replace(/ /g, '')}.com`,
    logoRequiresBg: false, 
  };
  
  const updatedListings = [listingToAdd, ...listings];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedListings));
  return listingToAdd;
};

/**
 * Deletes a listing by its ID.
 */
export const deleteListing = async (listingId) => {
  let listings = await getListings();
  const updatedListings = listings.filter((l) => l.id !== listingId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedListings));
  return true;
};


// --- RE-ADDING SWAP REQUEST FUNCTIONS ---

export const getSwapRequests = async () => {
  const requests = JSON.parse(localStorage.getItem(SWAP_REQUESTS_KEY) || "[]");
  return Promise.resolve(requests);
};

export const addSwapRequest = async (listing, fromUser) => {
  const allRequests = await getSwapRequests();

  const existingRequest = allRequests.find(
    (req) =>
      req.listingId === listing.id &&
      req.fromUser === fromUser.username &&
      req.status === "pending"
  );

  if (existingRequest) return false;

  const newRequest = {
    id: Date.now(),
    fromUser: fromUser.username,
    toUser: listing.owner,
    listingId: listing.id,
    listingName: listing.name,
    status: "pending",
  };

  const updatedRequests = [newRequest, ...allRequests];
  localStorage.setItem(SWAP_REQUESTS_KEY, JSON.stringify(updatedRequests));
  return true;
};

export const updateSwapRequestStatus = async (requestId, newStatus) => {
  const allRequests = await getSwapRequests();
  const updatedRequests = allRequests.map((req) =>
    req.id === requestId ? { ...req, status: newStatus } : req
  );
  localStorage.setItem(SWAP_REQUESTS_KEY, JSON.stringify(updatedRequests));
  return true;
};


// --- RE-ADDING CHAT MESSAGE FUNCTIONS ---

export const getChatMessages = async () => {
  const messages = JSON.parse(localStorage.getItem(CHAT_MESSAGES_KEY) || "[]");
  return Promise.resolve(messages);
};

export const addChatMessage = async (message) => {
  const allMessages = await getChatMessages();
  const updatedMessages = [...allMessages, message];
  localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(updatedMessages));
  return true;
};