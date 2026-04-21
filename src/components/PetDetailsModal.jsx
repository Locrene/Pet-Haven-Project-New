import React from "react";
import "../styles/app.css";

const PetDetailsModal = ({ pet, onClose, onToggleFavorite, isFavorited }) => {
  if (!pet) return null;

  const statusColor = {
    available: "#22c55e",
    adopted: "#f59e0b",
    missing: "#ef4444",
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-image-wrap">
          <img
            src={pet.image}
            alt={pet.name}
            onError={(e) => (e.target.src = "/images/default.jpg")}
          />
          <span
            className="modal-status-badge"
            style={{ background: statusColor[pet.status] || "#64748b" }}
          >
            {pet.status}
          </span>
        </div>

        <div className="modal-body">
          <div className="modal-top-row">
            <div>
              <div className="modal-type">{pet.type}</div>
              <h2 className="modal-name">{pet.name}</h2>
            </div>
            <button
              className={`modal-fav-btn ${isFavorited ? "modal-fav-btn--active" : ""}`}
              onClick={() => onToggleFavorite(pet.id)}
            >
              {isFavorited ? "♥ Saved" : "♡ Save"}
            </button>
          </div>

          <div className="modal-info-grid">
            <div className="modal-info-item">
              <span className="modal-info-label">Breed</span>
              <span className="modal-info-value">{pet.breed}</span>
            </div>
            <div className="modal-info-item">
              <span className="modal-info-label">Age</span>
              <span className="modal-info-value">{pet.age} year{pet.age !== 1 ? "s" : ""}</span>
            </div>
            <div className="modal-info-item">
              <span className="modal-info-label">Location</span>
              <span className="modal-info-value">{pet.location}</span>
            </div>
            <div className="modal-info-item">
              <span className="modal-info-label">Status</span>
              <span className="modal-info-value" style={{ color: statusColor[pet.status], fontWeight: 700 }}>
                {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
              </span>
            </div>
          </div>

          <div className="modal-section">
            <h4>About {pet.name}</h4>
            <p>{pet.description}</p>
          </div>

          {pet.owner && (
            <div className="modal-section modal-owner">
              <h4>🧑 Owner / Contact Info</h4>
              <div className="modal-contact-grid">
                <div className="modal-contact-item">
                  <span>👤</span>
                  <span>{pet.owner.name}</span>
                </div>
                <div className="modal-contact-item">
                  <span>📞</span>
                  <span>{pet.owner.phone}</span>
                </div>
                <div className="modal-contact-item">
                  <span>✉️</span>
                  <span>{pet.owner.email}</span>
                </div>
                <div className="modal-contact-item">
                  <span>📍</span>
                  <span>{pet.owner.address}</span>
                </div>
              </div>
            </div>
          )}

          {pet.status === "available" && (
            <button className="modal-adopt-btn">
              🐾 Inquire for Adoption
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetDetailsModal;