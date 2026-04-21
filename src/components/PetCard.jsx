import React, { useState, useEffect } from "react";

const PetCard = ({ pet }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Check if pet is already favorited on component mount
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoritePets")) || [];
    setIsFavorited(favorites.some((fav) => fav.id === pet.id));
  }, [pet.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem("favoritePets")) || [];
    
    if (isFavorited) {
      // Remove from favorites
      const updatedFavorites = favorites.filter((fav) => fav.id !== pet.id);
      localStorage.setItem("favoritePets", JSON.stringify(updatedFavorites));
    } else {
      // Add to favorites
      favorites.push(pet);
      localStorage.setItem("favoritePets", JSON.stringify(favorites));
    }
    
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="pet-card">
      <div className="pet-card-image-container">
        <img
          src={pet.image}
          alt={pet.name}
          onError={(e) => (e.target.src = "/images/default.jpg")}
        />
        <button 
          className={`favorite-btn ${isFavorited ? "favorited" : ""}`}
          onClick={toggleFavorite}
          title={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorited ? "❤️" : "🤍"}
        </button>
      </div>

      <h3>{pet.name}</h3>
      <p>{pet.location}</p>

      <button>View Details</button>
    </div>
  );
};

export default PetCard; // ✅ VERY IMPORTANT