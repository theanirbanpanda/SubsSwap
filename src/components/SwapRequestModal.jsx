import React from 'react';

const SwapRequestModal = ({ listing, onClose, onConfirm }) => {
  if (!listing) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Confirm Swap Request</h2>
        <p className="modal-text">
          You are about to request a swap for{" "}
          <strong>{listing.name}</strong> (owned by <strong>{listing.owner}</strong>).
        </p>
        <p className="modal-text-small">
          This will open a chat with {listing.owner} to arrange the details.
        </p>
        <div className="modal-actions">
          <button className="modal-button secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-button primary" onClick={onConfirm}>
            Yes, Start Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwapRequestModal;