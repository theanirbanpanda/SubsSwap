import React, { useEffect, useState } from "react";

const MySubscriptions = () => {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("mySubscriptions");
    if (stored) {
      try {
        setSubs(JSON.parse(stored));
      } catch (e) {
        console.error("Invalid subscriptions data");
      }
    }
  }, []);

  const handleRemove = (id) => {
    const updated = subs.filter((s) => s.id !== id);
    setSubs(updated);
    localStorage.setItem("mySubscriptions", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>My Subscriptions</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {subs.map((sub) => (
          <li key={sub.id} style={{ marginBottom: "1rem", padding: "1rem", background: "#f9f9f9", borderRadius: "6px" }}>
            <strong>{sub.service}</strong>: {sub.description}
            <button
              onClick={() => handleRemove(sub.id)}
              style={{ marginLeft: "1rem", padding: "0.3rem 0.6rem", cursor: "pointer" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {subs.length === 0 && <p>You haven't added any subscriptions yet.</p>}
    </div>
  );
};

export default MySubscriptions;
