import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PetCard from "../components/PetCard";
import PetDetailModal from "../components/PetDetailModal";
import "../styles/saved-favorites.css";

function SavedFavorites({ onClose }) {
  const [favoritePets, setFavoritePets] = useState([]);
  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(null);
  const navigate = useNavigate();

  // Load favorites on mount
  useEffect(() => {
    loadFavorites();
    const handleStorageChange = () => loadFavorites();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const loadFavorites = () => {
    const stored = JSON.parse(localStorage.getItem("favoritePets")) || [];
    setFavoritePets(stored);
  };

  const handleRemoveFavorite = (petId) => {
    const updated = favoritePets.filter((pet) => pet.id !== petId);
    setFavoritePets(updated);
    localStorage.setItem("favoritePets", JSON.stringify(updated));
    setShowConfirm(null);
  };

  // Filter favorites based on search
  const filteredFavorites = favoritePets.filter((pet) =>
    pet.name.toLowerCase().includes(search.toLowerCase()) ||
    pet.breed?.toLowerCase().includes(search.toLowerCase()) ||
    pet.location?.toLowerCase().includes(search.toLowerCase())
  );

  const clearSearch = () => setSearch("");
  const goBackToFeed = () => onClose();
  const goToBrowse = () => onClose();

  return (
    <div className="saved-favorites-page">
      <div className="saved-favorites-container">
        
        {/* Header Section */}
        <div className="saved-header">
          <div className="saved-header-top">
            <button 
              className="back-button"
              onClick={goBackToFeed}
              aria-label="Go back to adoption feed"
              title="Back to Adoption Feed"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            
            <div className="saved-header-content">
              <div className="saved-title-section">
                <h1 className="saved-title">
                  <span className="heart-icon">❤️</span>
                  Saved Favorites
                </h1>
                <span className="saved-count-badge">{favoritePets.length}</span>
              </div>
              <p className="saved-subtitle">
                {favoritePets.length === 0
                  ? "No favorites yet"
                  : `Your collection of ${favoritePets.length} favorite ${favoritePets.length === 1 ? "pet" : "pets"}`}
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="saved-search-section">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search by name, breed, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search saved pets"
              />
              {search && (
                <button
                  className="search-clear-btn"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              className="btn-add-more"
              onClick={goToBrowse}
              title="Browse more pets to add to favorites"
            >
              <span>+ Add More Pets</span>
            </button>
          </div>

          {/* Search Results Info */}
          {search && favoritePets.length > 0 && (
            <p className="search-results-info">
              Found <strong>{filteredFavorites.length}</strong> of <strong>{favoritePets.length}</strong> saved {favoritePets.length === 1 ? "pet" : "pets"}
            </p>
          )}
        </div>

        {/* Main Content */}
        {favoritePets.length === 0 ? (
          // Empty State
          <div className="empty-state-container">
            <div className="empty-state-content">
              <div className="empty-icon-large">🤍</div>
              <h2 className="empty-title">No Saved Favorites Yet</h2>
              <p className="empty-description">
                Start exploring and tap the heart icon on any pet card to save your favorites here
              </p>
              <button
                className="btn-browse-pets"
                onClick={goToBrowse}
              >
                ← Browse Pets
              </button>
            </div>
          </div>
        ) : filteredFavorites.length === 0 ? (
          // No Search Results
          <div className="empty-state-container">
            <div className="empty-state-content">
              <div className="empty-icon-large">🔍</div>
              <h2 className="empty-title">No Matches Found</h2>
              <p className="empty-description">
                Try adjusting your search to find saved pets
              </p>
              <button
                className="btn-clear-search"
                onClick={clearSearch}
              >
                Clear Search
              </button>
            </div>
          </div>
        ) : (
          // Favorites Grid
          <div className="saved-grid">
            {filteredFavorites.map((pet) => (
              <SavedPetCard
                key={pet.id}
                pet={pet}
                onRemove={() => setShowConfirm(pet.id)}
                showConfirmation={showConfirm === pet.id}
                onConfirmRemove={() => handleRemoveFavorite(pet.id)}
                onCancelRemove={() => setShowConfirm(null)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Enhanced Pet Card for Saved Favorites
function SavedPetCard({
  pet,
  onRemove,
  showConfirmation,
  onConfirmRemove,
  onCancelRemove,
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="saved-pet-card">
        {/* Image Container */}
        <div className="saved-pet-image-wrapper">
          <img
            src={pet.image}
            alt={pet.name}
            className="saved-pet-image"
            onError={(e) => (e.target.src = "/images/default.jpg")}
          />
          
          {/* Overlay on Hover */}
          <div className="saved-pet-overlay">
            <button
              className="btn-view-details-overlay"
              onClick={() => setShowModal(true)}
            >
              View Details
            </button>
          </div>

          {/* Heart Button with Tooltip */}
          <div className="saved-heart-wrapper">
            {!showConfirmation ? (
              <button
                className="saved-heart-btn active"
                onClick={onRemove}
                title="Remove from favorites"
                aria-label={`Remove ${pet.name} from favorites`}
              >
                <span className="heart-icon-btn">❤️</span>
              </button>
            ) : (
              <div className="confirm-popup">
                <p>Remove <strong>{pet.name}</strong>?</p>
                <div className="confirm-actions">
                  <button
                    className="confirm-yes"
                    onClick={onConfirmRemove}
                    aria-label="Confirm removal"
                  >
                    Yes
                  </button>
                  <button
                    className="confirm-no"
                    onClick={onCancelRemove}
                    aria-label="Cancel removal"
                  >
                    No
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pet Info */}
        <div className="saved-pet-info">
          <h3 className="saved-pet-name">{pet.name}</h3>
          
          <div className="saved-pet-meta">
            <span className="pet-breed">{pet.breed || "Mixed"}</span>
            <span className="pet-age">{pet.age || "N/A"} years</span>
          </div>

          <p className="saved-pet-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {pet.location || "Location not specified"}
          </p>

          <div className="saved-pet-status">
            <span className={`status-badge ${pet.status || "available"}`}>
              {pet.status === "available" ? "✓ Available" : pet.status}
            </span>
          </div>
        </div>
      </div>

      {showModal && (
        <PetDetailModal 
          pet={pet}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default SavedFavorites;
