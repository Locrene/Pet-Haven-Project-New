import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import PetDetailsModal from "../components/PetDetailsModal";
import PostPetModal from "../components/PostPetModal";
import PetService from "../services/PetService";
import "../styles/app.css";
function AdoptionFeed() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [activeTab, setActiveTab] = useState("feed"); // "feed" | "saved"
  const [showPostModal, setShowPostModal] = useState(false);

  useEffect(() => {
    setPets(PetService.getAllPets());
    const saved = JSON.parse(localStorage.getItem("petFavorites") || "[]");
    setFavorites(saved);
  }, []);

  const toggleFavorite = (petId) => {
    setFavorites((prev) => {
      const updated = prev.includes(petId)
        ? prev.filter((id) => id !== petId)
        : [...prev, petId];
      localStorage.setItem("petFavorites", JSON.stringify(updated));
      return updated;
    });
  };

  const handlePost = (petData) => {
    const newPet = PetService.addPet(petData);
    setPets(PetService.getAllPets());
  };

  const filterButtons = ["All", "Dogs", "Cats", "Available"];

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.breed.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" ? true :
      filter === "Dogs" ? pet.type === "Dog" :
      filter === "Cats" ? pet.type === "Cat" :
      filter === "Available" ? pet.status === "available" : true;
    return matchesSearch && matchesFilter;
  });

  const savedPets = pets.filter((p) => favorites.includes(p.id));

  const displayPets = activeTab === "saved" ? savedPets : filteredPets;

  return (
    <div className="dashboard">
      <div className="main-content">

        {/* HEADER */}
        <div className="dashboard-header">
          <h2>Adoption Feed</h2>
          <div className="header-right">
            {activeTab === "feed" && (
              <input
                type="text"
                placeholder="Search pets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}
            <button className="post-pet-btn" onClick={() => setShowPostModal(true)}>
              + Post a Pet
            </button>
            <div className="user-box">👤 Admin</div>
          </div>
        </div>

        {/* TABS */}
        <div className="feed-tabs">
          <button
            className={`feed-tab ${activeTab === "feed" ? "feed-tab--active" : ""}`}
            onClick={() => setActiveTab("feed")}
          >
            🐾 All Pets
          </button>
          <button
            className={`feed-tab ${activeTab === "saved" ? "feed-tab--active" : ""}`}
            onClick={() => setActiveTab("saved")}
          >
            ♥ Saved
            {favorites.length > 0 && (
              <span className="fav-count">{favorites.length}</span>
            )}
          </button>
        </div>

        {/* FILTER BUTTONS (feed only) */}
        {activeTab === "feed" && (
          <div className="feed-filters">
            {filterButtons.map((f) => (
              <button
                key={f}
                className={filter === f ? "filter-active" : ""}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {/* PET GRID */}
        <div className="pet-grid">
          {displayPets.length > 0 ? (
            displayPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onViewDetails={setSelectedPet}
                onToggleFavorite={toggleFavorite}
                isFavorited={favorites.includes(pet.id)}
              />
            ))
          ) : (
            <div className="empty-state">
              {activeTab === "saved"
                ? <><div className="empty-icon">♡</div><p>No saved pets yet.<br/>Heart a pet to save it here!</p></>
                : <><div className="empty-icon">🐾</div><p>No pets found.</p></>
              }
            </div>
          )}
        </div>

      </div>

      {/* PET DETAILS MODAL */}
      {selectedPet && (
        <PetDetailsModal
          pet={selectedPet}
          onClose={() => setSelectedPet(null)}
          onToggleFavorite={toggleFavorite}
          isFavorited={favorites.includes(selectedPet.id)}
        />
      )}

      {/* POST PET MODAL */}
      {showPostModal && (
        <PostPetModal
          onClose={() => setShowPostModal(false)}
          onPost={handlePost}
        />
      )}
    </div>
  );
}

export default AdoptionFeed;