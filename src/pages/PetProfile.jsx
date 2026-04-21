import { useEffect, useState } from "react";
import PetService from "../services/PetService";

function PetProfile() {
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const pets = PetService.getAllPets();
    const selected = pets.find((petItem) => petItem.status === "available") || pets[0];
    setPet(selected);
  }, []);

  if (!pet) {
    return <div className="main-content">Loading pet profile...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img className="profile-image" src={pet.image} alt={pet.name} />
        <div className="profile-details">
          <div>
            <h2>{pet.name}</h2>
            <div className="profile-meta">
              <span>{pet.breed}</span>
              <span>{pet.age} years old</span>
              <span>{pet.location}</span>
            </div>
          </div>

          <p>{pet.description}</p>

          <div className="details-list">
            <div>
              <p className="detail-label">Status</p>
              <strong>{pet.status}</strong>
            </div>
            <div>
              <p className="detail-label">Temperament</p>
              <strong>Friendly, calm, and family-safe</strong>
            </div>
            <div>
              <p className="detail-label">Health</p>
              <strong>Vaccinated and dewormed</strong>
            </div>
          </div>

          <button className="btn btn-primary">Request Adoption</button>
        </div>
      </div>

      <aside className="profile-sidebar">
        <div>
          <h3>Why {pet.name} is special</h3>
          <p>{pet.name} is a loyal companion that adapts well to apartment living and loves attention from quiet families.</p>
        </div>

        <div>
          <h3>Quick details</h3>
          <div className="details-list">
            <div>
              <p className="detail-label">Breed</p>
              <strong>{pet.breed}</strong>
            </div>
            <div>
              <p className="detail-label">Location</p>
              <strong>{pet.location}</strong>
            </div>
            <div>
              <p className="detail-label">Ideal home</p>
              <strong>Active household or patient first-time owner</strong>
            </div>
          </div>
        </div>

        <div>
          <h3>Adoption tips</h3>
          <p>This pet enjoys daily walks, gentle grooming, and a cozy bed. Make sure you have space for playtime and quiet cuddles.</p>
        </div>
      </aside>
    </div>
  );
}

export default PetProfile;
