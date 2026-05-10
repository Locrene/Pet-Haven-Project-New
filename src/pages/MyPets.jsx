import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PetService from "../services/PetService";

function MyPets() {
  const navigate = useNavigate();
  const [myPets, setMyPets] = useState([]);

  useEffect(() => {
    // Get all pets (in a real app, filter by user ID)
    const allPets = PetService.getAllPets();
    setMyPets(allPets);
  }, []);

  return (
    <div className="main-content">
      <div className="dashboard-header">
        <h2>My Pets</h2>
        <button onClick={() => navigate("/")} className="btn btn-primary">Post New Pet</button>
      </div>

      <div className="back-button-container">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Back
        </button>
      </div>

      {myPets.length === 0 ? (
        <div className="empty-state" style={{ marginTop: "40px" }}>
          <h3>No pets posted yet</h3>
          <p>Start by posting your first pet for adoption!</p>
          <button onClick={() => navigate("/")} className="btn btn-primary" style={{ marginTop: "20px" }}>
            Post a Pet
          </button>
        </div>
      ) : (
        <div className="pet-grid" style={{ marginTop: "30px" }}>
          {myPets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <img
                src={pet.image}
                alt={pet.name}
                onError={(e) => (e.target.src = "/images/default.jpg")}
              />
              <div className="pet-info">
                <h3>{pet.name}</h3>
                <div className="pet-details">
                  <span>{pet.breed}</span>
                  <span>{pet.status}</span>
                </div>
                <button>View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPets;
