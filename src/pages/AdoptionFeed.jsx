import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import PetService from "../services/PetService";
import PostPetModal from "../components/PostPetModal.jsx";

function AdoptionFeed() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoritePets, setFavoritePets] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [showPostModal, setShowPostModal] = useState(false);

  const loadPets = () => setPets(PetService.getAllPets());

  useEffect(() => { 
    loadPets();
  }, []);

  useEffect(() => {
    if (showFavorites) {
      const stored = JSON.parse(localStorage.getItem("favoritePets")) || [];
      setFavoritePets(stored);
    }
  }, [showFavorites]);

  const refreshCount = () => {
    const stored = JSON.parse(localStorage.getItem("favoritePets")) || [];
    setFavoriteCount(stored.length);
  };

  useEffect(() => {
    refreshCount();
    window.addEventListener("storage", refreshCount);
    return () => window.removeEventListener("storage", refreshCount);
  }, []);

  const handlePostSubmit = (formData) => {
    PetService.addPet(formData);
    loadPets(); // refresh feed immediately
  };

  const goToSaved = () => { setSearch(""); setShowFavorites(true); };
  const goBackToFeed = () => { setSearch(""); setShowFavorites(false); refreshCount(); };

  // Main feed filter
  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Available"
        ? pet.status === "available"
        : pet.breed?.toLowerCase().includes(activeFilter.toLowerCase()) ||
          pet.type?.toLowerCase().includes(activeFilter.toLowerCase()));
    return matchesSearch && matchesFilter;
  });

  // Saved favorites search
  const filteredFavorites = favoritePets.filter((pet) =>
    pet.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ── SAVED FAVORITES VIEW ── */
  if (showFavorites) {
    return (
      <div className="adoption-feed-page">
        <div className="adoption-feed-container">
          
          {/* Page Header for Saved */}
          <div className="adoption-feed-header">
            <div className="feed-header-top">
              <button className="back-btn-icon" onClick={goBackToFeed}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </button>
              <div>
                <h1 className="feed-page-title">❤️ Saved Favorites</h1>
                <p className="feed-page-subtitle">Your collection of favorite pets</p>
              </div>
            </div>

            {/* Search in Saved */}
            <div className="feed-header-controls">
              <div className="search-container" style={{flex: 1, maxWidth: "400px"}}>
                <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search saved pets..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Saved Pets Grid */}
          <div className="adoption-feed-grid" onClick={refreshCount}>
            {favoritePets.length === 0 ? (
              <div className="empty-state full-width">
                <div className="empty-state-icon">🤍</div>
                <h3>No saved favorites yet</h3>
                <p>Tap the ❤️ on any pet card to save them here!</p>
                <button className="btn btn-primary" onClick={goBackToFeed}>
                  ← Browse Pets
                </button>
              </div>
            ) : filteredFavorites.length === 0 ? (
              <div className="empty-state full-width">
                <div className="empty-state-icon">🔍</div>
                <h3>No matches found</h3>
                <p>Try adjusting your search to find saved pets</p>
              </div>
            ) : (
              filteredFavorites.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))
            )}
          </div>

        </div>
      </div>
    );
  }

  /* ── MAIN ADOPTION FEED VIEW ── */
  return (
    <div className="adoption-feed-page">
      <div className="adoption-feed-container">

        {/* Page Title & Header */}
        <div className="adoption-feed-header">
          <div className="feed-header-top">
            <h1 className="feed-page-title">Adoption Feed</h1>
            <p className="feed-page-subtitle">Find your perfect companion</p>
          </div>

          {/* Search & Action Buttons */}
          <div className="feed-header-controls">
            <div className="search-container">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search pets by name, breed, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="action-buttons">
              <button
                className="btn btn-primary"
                onClick={() => setShowPostModal(true)}
              >
                + Post a Pet
              </button>

              <button
                className="btn btn-outline"
                onClick={goToSaved}
                title={`View ${favoriteCount} saved favorites`}
              >
                ❤️ Saved
                {favoriteCount > 0 && (
                  <span className="badge">{favoriteCount}</span>
                )}
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="filter-pills">
            {["All", "Dogs", "Cats", "Available"].map((filter) => (
              <button
                key={filter}
                className={`filter-pill ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Pet Grid */}
        <div className="adoption-feed-grid" onClick={refreshCount}>
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>No pets found</h3>
              <p>Try adjusting your search or filters to find more pets</p>
            </div>
          )}
        </div>

      </div>

      {/* Post a Pet modal */}
      {showPostModal && (
        <PostPetModal
          onClose={() => setShowPostModal(false)}
          onSubmit={handlePostSubmit}
        />
      )}
    </div>
  );
}

export default AdoptionFeed;