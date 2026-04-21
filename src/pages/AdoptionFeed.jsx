import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import PetService from "../services/PetService";

function AdoptionFeed() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    const data = PetService.getAllPets();
    setPets(data);
  }, []);


  // Search Function
  const searchPets = pets.filter((pet) => {
  const searchLower = search.toLowerCase();

  const matchesSearch =
    pet.name.toLowerCase().includes(searchLower) ||
    pet.breed?.toLowerCase().includes(searchLower);


  //Filter Option
  const matchesFilter =
    selectedFilter === "" ||
    pet.breed?.toLowerCase() === selectedFilter;

  return matchesSearch && matchesFilter;
});

  return (
    <div className="dashboard">
      <div className="main-content">
        <div className="dashboard-header">
          <h2>Adoption Feed</h2>

          <div className="header-right">
            <input className="adoption_input"
              type="text"
              placeholder="Search pets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="feed-filters">
          <button
            className={selectedFilter === "" ? "active-filter" : ""}
            onClick={() => setSelectedFilter("")}
          >
            All
          </button>

          <button
            className={selectedFilter === "dog" ? "active-filter" : ""}
            onClick={() => setSelectedFilter("dog")}
          >
            Dogs
          </button>

          <button
            className={selectedFilter === "cat" ? "active-filter" : ""}
            onClick={() => setSelectedFilter("cat")}
          >
            Cats
          </button>
        </div>

        <div className="pet-grid">
          {searchPets.length > 0 ? (
            searchPets.map((pet) => (
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