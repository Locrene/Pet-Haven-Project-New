import { useEffect, useState } from "react";
import PetService from "../services/PetService";

const STATUS_COLORS = {
  available: { bg: "#dcfce7", color: "#166534", label: "Available" },
  missing:   { bg: "#fef3c7", color: "#92400e", label: "Missing"   },
  adopted:   { bg: "#dbeafe", color: "#1e40af", label: "Adopted"   },
};

function MyPets() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // In a real app these would be filtered by the logged-in user's ID.
    // For now we show the full catalogue as "my pets".
    setPets(PetService.getAllPets());
  }, []);

  const filtered = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.location.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" || pet.status === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Page header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>My Pets</h1>
            <p style={styles.subtitle}>Manage the pets you have posted on PawHaven.</p>
          </div>
          <button style={styles.addBtn}>+ Add New Pet</button>
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <div style={styles.searchWrap}>
            <svg style={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              style={styles.searchInput}
              placeholder="Search by name or location…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div style={styles.pills}>
            {["All", "Available", "Missing", "Adopted"].map((f) => (
              <button
                key={f}
                style={{
                  ...styles.pill,
                  ...(filter === f ? styles.pillActive : {}),
                }}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: 48 }}>🐾</p>
            <h3 style={{ color: "#0f172a", marginBottom: 8 }}>No pets found</h3>
            <p style={{ color: "#94a3b8" }}>Try adjusting your search or add a new pet listing.</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((pet) => {
              const badge = STATUS_COLORS[pet.status] || STATUS_COLORS.available;
              return (
                <div key={pet.id} style={styles.card}>
                  <div style={styles.imgWrap}>
                    <img
                      src={pet.image}
                      alt={pet.name}
                      style={styles.img}
                      onError={(e) => (e.target.src = "/images/default.jpg")}
                    />
                    <span style={{ ...styles.statusBadge, background: badge.bg, color: badge.color }}>
                      {badge.label}
                    </span>
                  </div>
                  <div style={styles.cardBody}>
                    <h3 style={styles.petName}>{pet.name}</h3>
                    <p style={styles.petMeta}>
                      {pet.breed} · {pet.age} yr{pet.age !== 1 ? "s" : ""} · 📍 {pet.location}
                    </p>
                    <p style={styles.petDesc}>{pet.description}</p>
                    <div style={styles.cardActions}>
                      <button style={styles.editPetBtn}>✏️ Edit</button>
                      <button style={styles.viewPetBtn}>👁 View</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f4f6fb", padding: "32px 24px" },
  container: { maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 },

  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 },
  title:    { margin: 0, fontSize: 26, fontWeight: 800, color: "#0f172a" },
  subtitle: { margin: "4px 0 0", fontSize: 14, color: "#64748b" },
  addBtn: {
    padding: "12px 24px",
    background: "linear-gradient(135deg, #1e3a6e 0%, #2c4a7c 100%)",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 12px rgba(30,58,110,0.25)",
  },

  controls: { display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" },
  searchWrap: {
    flex: 1,
    minWidth: 200,
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: { position: "absolute", left: 14, width: 18, height: 18, color: "#94a3b8" },
  searchInput: {
    width: "100%",
    padding: "11px 14px 11px 42px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    background: "white",
    boxSizing: "border-box",
  },
  pills: { display: "flex", gap: 8, flexWrap: "wrap" },
  pill: {
    padding: "9px 18px",
    background: "white",
    border: "1.5px solid #e2e8f0",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    color: "#475569",
    transition: "all 0.15s",
  },
  pillActive: {
    background: "#1e3a6e",
    borderColor: "#1e3a6e",
    color: "white",
  },

  empty: {
    textAlign: "center",
    padding: "60px 24px",
    background: "white",
    borderRadius: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 20,
  },
  card: {
    background: "white",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  imgWrap: { position: "relative", height: 180, overflow: "hidden" },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  statusBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
  },
  cardBody: { padding: "16px 18px 18px" },
  petName:  { margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: "#0f172a" },
  petMeta:  { margin: "0 0 8px", fontSize: 13, color: "#64748b" },
  petDesc:  { margin: "0 0 14px", fontSize: 13, color: "#475569", lineHeight: 1.5, WebkitLineClamp: 2, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" },
  cardActions: { display: "flex", gap: 8 },
  editPetBtn: {
    flex: 1,
    padding: "8px",
    background: "#f1f5f9",
    border: "none",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    color: "#475569",
  },
  viewPetBtn: {
    flex: 1,
    padding: "8px",
    background: "#eff6ff",
    border: "none",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    color: "#1e40af",
  },
};

export default MyPets;
