import React from "react";
import "../styles/app.css";

const PetCard = ({ pet, onViewDetails, onToggleFavorite, isFavorited }) => {
  const statusColor = {
    available: "#22c55e",
    adopted: "#f59e0b",
    missing: "#ef4444",
  };

  return (
    <div className="pet-card">
      <div className="pet-card-image-wrap">
        <img
          src={pet.image}
          alt={pet.name}
          onError={(e) => (e.target.src = "/images/default.jpg")}
        />
        <span
          className="pet-status-badge"
          style={{ background: statusColor[pet.status] || "#64748b" }}
        >
          {pet.status}
        </span>
        <button
          className={`fav-btn ${isFavorited ? "fav-btn--active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(pet.id);
          }}
          title={isFavorited ? "Remove from favorites" : "Save to favorites"}
        >
          {isFavorited ? "♥" : "♡"}
        </button>
      </div>

      <div className="pet-card-body">
        <div className="pet-card-type">{pet.type}</div>
        <h3 className="pet-card-name">{pet.name}</h3>
        <p className="pet-card-breed">{pet.breed}</p>
        <div className="pet-card-meta">
          <span>📍 {pet.location}</span>
          <span>🎂 {pet.age} yr{pet.age !== 1 ? "s" : ""}</span>
        </div>
        <button className="view-details-btn" onClick={() => onViewDetails(pet)}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default PetCard;