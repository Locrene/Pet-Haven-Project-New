import React from "react";

const PetCard = ({ pet }) => {
  return (
    <div className="pet-card">

      <img
        src={pet.image}
        alt={pet.name}
        onError={(e) => (e.target.src = "/images/default.jpg")}
      />

      <h3>{pet.name}</h3>
      <p>{pet.location}</p>

      <button>View Details</button>
    </div>
  );
};

export default PetCard;