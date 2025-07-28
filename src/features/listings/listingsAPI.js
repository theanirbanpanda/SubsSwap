const MOCK_LISTINGS = [
  { id: 1, service: "Netflix", logo: "", description: "Premium Plan", owner: "user1" },
  { id: 2, service: "Spotify", logo: "", description: "Family Plan", owner: "user2" },
  { id: 3, service: "Disney+", logo: "", description: "1-year", owner: "user3" },
];

export const getAllListings = () => {
  return Promise.resolve(MOCK_LISTINGS);
};

export const addListing = (newListing) => {
  let listings = JSON.parse(localStorage.getItem("myListings")) || [];
  if (listings.some(l => l.service.toLowerCase() === newListing.service.toLowerCase())) {
    return false; // Duplicate
  }
  listings.push(newListing);
  localStorage.setItem("myListings", JSON.stringify(listings));
  return true;
};

export const getMyListings = () => {
  return JSON.parse(localStorage.getItem("myListings")) || [];
};

export const deleteListing = (serviceName) => {
  let listings = JSON.parse(localStorage.getItem("myListings")) || [];
  listings = listings.filter(l => l.service !== serviceName);
  localStorage.setItem("myListings", JSON.stringify(listings));
};
