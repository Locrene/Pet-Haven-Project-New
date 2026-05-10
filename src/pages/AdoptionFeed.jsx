import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";
import PetService from "../services/PetService";
import PostPetModal from "../components/PostPetModal.jsx";
import SavedFavorites from "./SavedFavorites";
import "../styles/adoption-feed-improved.css";

function AdoptionFeed() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFavorites, setShowFavorites] = useState(false);
  const [favoritePets, setFavoritePets] = useState([]);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [showPostModal, setShowPostModal] = useState(false);
  const [sortBy, setSortBy] = useState("name");

  const loadPets = () => setPets(PetService.getAllPets());

  useEffect(() => { 
    loadPets();
  }, []);

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
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      pet.name.toLowerCase().includes(searchLower) ||
      pet.breed?.toLowerCase().includes(searchLower) ||
      pet.location?.toLowerCase().includes(searchLower);
    
    // Get effective pet status (considering adoptions)
    const effectiveStatus = PetService.getPetStatus(pet.id);
    
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Available"
        ? effectiveStatus === "available"
        : pet.breed?.toLowerCase().includes(activeFilter.toLowerCase()));
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "location") {
      return a.location.localeCompare(b.location);
    }
    return 0;
  });

  /* ── SAVED FAVORITES VIEW ── */
  if (showFavorites) {
    return <SavedFavorites onClose={goBackToFeed} />;
  }

  /* ── MAIN ADOPTION FEED VIEW ── */
  return (
    <div className="adoption-feed-page">
      <div className="adoption-feed-container">

        {/* Page Header */}
        <div className="adoption-feed-header">
          <div className="feed-header-content">
            <h1 className="feed-page-title">🐾 Adoption Feed</h1>
            <p className="feed-page-subtitle">Find your perfect companion today</p>
          </div>

          {/* Primary Actions */}
          <div className="feed-header-actions">
            <button
              className="btn-post-pet"
              onClick={() => setShowPostModal(true)}
              title="List a pet for adoption"
            >
              + Post a Pet
            </button>

            <button
              className="btn-saved-favorites"
              onClick={goToSaved}
              title={`View ${favoriteCount} saved favorites`}
            >
              <span className="heart-icon">❤️</span>
              <span>Saved Favorites</span>
              {favoriteCount > 0 && (
                <span className="favorite-badge">{favoriteCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="feed-search-section">
          <div className="search-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              className="search-input-feed"
              placeholder="Search by name, breed, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search pets"
            />
            {search && (
              <button
                className="search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="name">Sort by Name</option>
            <option value="location">Sort by Location</option>
          </select>
        </div>

        {/* Filter Pills */}
        <div className="filter-section">
          <div className="filter-label">Filter by:</div>
          <div className="filter-pills">
            {["All", "Available"].map((filter) => (
              <button
                key={filter}
                className={`filter-pill ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === "All" ? "🐾 All Pets" : "✓ Available Only"}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        {search && (
          <div className="results-info">
            Found <strong>{filteredPets.length}</strong> pet{filteredPets.length !== 1 ? "s" : ""}
          </div>
        )}

        {/* Pet Grid - 4 Columns Responsive */}
        <div className="adoption-feed-grid-modern" onClick={refreshCount}>
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))
          ) : (
            <div className="empty-state-adoption">
              <div className="empty-state-icon">🔍</div>
              <h3>No pets found</h3>
              <p>
                {search 
                  ? "Try adjusting your search terms"
                  : "No pets available at the moment"}
              </p>
              {search && (
                <button
                  className="btn-clear-filters"
                  onClick={() => { setSearch(""); setActiveFilter("All"); }}
                >
                  Clear Filters
                </button>
              )}
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