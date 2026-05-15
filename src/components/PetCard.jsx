import React, { useState, useEffect } from "react";
import PetDetailModal from "./PetDetailModal";

const PetCard = ({ pet }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoritePets")) || [];
    setIsFavorited(favorites.some((fav) => fav.id === pet.id));
  }, [pet.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favoritePets")) || [];
    if (isFavorited) {
      const updated = favorites.filter((fav) => fav.id !== pet.id);
      localStorage.setItem("favoritePets", JSON.stringify(updated));
    } else {
      favorites.push(pet);
      localStorage.setItem("favoritePets", JSON.stringify(favorites));
    }
    setIsFavorited(!isFavorited);
  };

  return (
    <>
      <div className="pet-card-modern">
        {/* Pet Image Container */}
        <div className="pet-card-image">
          <img
            src={pet.image}
            alt={pet.name}
            onError={(e) => (e.target.src = "/images/default.jpg")}
          />
          
          {/* Floating Heart Button */}
          <button
            className={`pet-favorite-btn ${isFavorited ? "favorited" : ""}`}
            onClick={toggleFavorite}
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorited ? "❤️" : "🤍"}
          </button>
        </div>

        {/* Pet Info */}
        <div className="pet-card-content">
          <h3 className="pet-card-name">{pet.name}</h3>
          <p className="pet-card-location">{pet.location}</p>
          
          {/* View Details Button */}
          <button 
            className="btn btn-view-details" 
            onClick={() => setShowModal(true)}
          >
            View Details
          </button>
        </div>
      </div>

      {showModal && (
        <PetDetailModal pet={pet} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default PetCard;