import React from "react";
import ListingCard from "./ListingCard";

const ListingGrid = ({ listings }) => {
  return (
    <div style={styles.grid}>
      {listings.map((listing, idx) => (
        <ListingCard key={idx} listing={listing} />
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center"
  }
};

export default ListingGrid;
