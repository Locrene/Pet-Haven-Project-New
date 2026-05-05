import React from "react";

const STATUS_STYLES = {
  available: { bg: "#e6f9f0", color: "#1a9e5c", label: "Available" },
  adopted:   { bg: "#fff3e0", color: "#e07c2c", label: "Adopted"   },
  missing:   { bg: "#fdecea", color: "#d93025", label: "Missing"   },
};

function PetDetailModal({ pet, onClose }) {
  if (!pet) return null;

  const status = STATUS_STYLES[pet.status] || STATUS_STYLES["available"];

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-card">

        <button className="modal-close-btn" onClick={onClose} title="Close">✕</button>

        <div className="modal-image-wrapper">
          <img
            src={pet.image}
            alt={pet.name}
            onError={(e) => (e.target.src = "/images/default.jpg")}
          />
          <span
            className="modal-status-badge"
            style={{ background: status.bg, color: status.color }}
          >
            {status.label}
          </span>
        </div>

        <div className="modal-body">
          <h2 className="modal-pet-name">{pet.name}</h2>
          <p className="modal-pet-desc">"{pet.description}"</p>

          <div className="modal-info-grid">
            <div className="modal-info-item">
              <span className="modal-info-label">🐾 Breed</span>
              <span className="modal-info-value">{pet.breed}</span>
            </div>
            <div className="modal-info-item">
              <span className="modal-info-label">🎂 Age</span>
              <span className="modal-info-value">
                {pet.age} {pet.age === 1 ? "year" : "years"} old
              </span>
            </div>
            <div className="modal-info-item">
              <span className="modal-info-label">📍 Location</span>
              <span className="modal-info-value">{pet.location}</span>
            </div>
            <div className="modal-info-item">
              <span className="modal-info-label">🏷️ Status</span>
              <span
                className="modal-info-value"
                style={{ color: status.color, fontWeight: 700 }}
              >
                {status.label}
              </span>
            </div>
          </div>

          <div className="modal-divider" />

          <h4 className="modal-section-title">👤 Owner Information</h4>
          <div className="modal-info-grid">
            <div className="modal-info-item">
              <span className="modal-info-label">Name</span>
              <span className="modal-info-value">{pet.owner}</span>
            </div>
            <div className="modal-info-item">
              <span className="modal-info-label">📞 Contact</span>
              <span className="modal-info-value modal-contact">{pet.contact}</span>
            </div>
          </div>

          <div className="modal-actions">
            <a href={`tel:${pet.contact}`} className="modal-call-btn">
              📞 Call Owner
            </a>
            <button className="modal-dismiss-btn" onClick={onClose}>Close</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PetDetailModal;