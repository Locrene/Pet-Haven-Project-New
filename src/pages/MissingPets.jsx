import { useEffect, useState } from "react";
import PetService from "../services/PetService";
import PetCard from "../components/PetCard";

function MissingPets() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = PetService.getAllPets().filter((pet) => pet.status === "missing");
    setPets(data);
  }, []);

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(search.toLowerCase()) ||
    pet.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">
      <div className="main-content">
        <div className="dashboard-header">
          <div>
            <h2>Missing Pets</h2>
            <p className="page-subtitle">Track and reunite lost pets across the community.</p>
          </div>
          <div className="header-right">
            <input
              type="text"
              placeholder="Search missing pets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary">Report Missing</button>
          </div>
        </div>

        {filteredPets.length > 0 ? (
          <div className="pet-grid">
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No missing pets found</h3>
            <p>Use the report button to share information and help reunite pets with their owners.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MissingPets;
