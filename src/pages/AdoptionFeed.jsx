import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import PetCard from "../components/PetCard";
import PetService from "../services/PetService";

function AdoptionFeed() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const data = PetService.getAllPets();
    setPets(data);
  }, []);

  // 🔍 FILTER
  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="main-content">

        {/* HEADER */}
        <div className="dashboard-header">
          <h2>Adoption Feed</h2>

          <div className="header-right">
            <input
              type="text"
              placeholder="Search pets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="user-box">👤 Admin</div>
          </div>
        </div>

        {/* FILTER BUTTONS */}
        <div className="feed-filters">
          <button>All</button>
          <button>Dogs</button>
          <button>Cats</button>
          <button>Available</button>
        </div>

        {/* PET GRID */}
        <div className="pet-grid">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))
          ) : (
            <p style={{ marginTop: "20px" }}>No pets found.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default AdoptionFeed;