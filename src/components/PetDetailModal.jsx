import { useEffect } from "react";

function PetDetailModal({ pet, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const statusColors = {
    available: { bg: "#dcfce7", color: "#166534" },
    missing:   { bg: "#fef3c7", color: "#92400e" },
    adopted:   { bg: "#dbeafe", color: "#1e40af" },
  };
  const badge = statusColors[pet.status] || statusColors.available;

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>

        {/* Close button */}
        <button style={s.closeBtn} onClick={onClose} aria-label="Close">✕</button>

        {/* Image */}
        <div style={s.imgWrap}>
          <img
            src={pet.image}
            alt={pet.name}
            style={s.img}
            onError={(e) => (e.target.src = "/images/default.jpg")}
          />
          <span style={{ ...s.statusBadge, background: badge.bg, color: badge.color }}>
            {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
          </span>
        </div>

        {/* Details */}
        <div style={s.body}>
          <h2 style={s.name}>{pet.name}</h2>
          <p style={s.meta}>
            {pet.breed} · {pet.age} yr{pet.age !== 1 ? "s" : ""} · 📍 {pet.location}
          </p>
          <p style={s.desc}>{pet.description || "No description provided."}</p>

          <div style={s.infoGrid}>
            {[
              { label: "Breed",    value: pet.breed    },
              { label: "Age",      value: `${pet.age} year${pet.age !== 1 ? "s" : ""}` },
              { label: "Location", value: pet.location },
              { label: "Status",   value: pet.status   },
            ].map(({ label, value }) => (
              <div key={label} style={s.infoItem}>
                <span style={s.infoLabel}>{label}</span>
                <strong style={s.infoValue}>{value}</strong>
              </div>
            ))}
          </div>

          
        </div>

      </div>
    </div>
  );
}

const s = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15,23,42,0.6)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 24,
  },
  modal: {
    background: "white",
    borderRadius: 20,
    width: "100%",
    maxWidth: 480,
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
    position: "relative",
    fontFamily: "'Poppins', sans-serif",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "rgba(0,0,0,0.5)",
    color: "white",
    border: "none",
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    lineHeight: 1,
  },
  imgWrap: { position: "relative", height: 240, overflow: "hidden", borderRadius: "20px 20px 0 0" },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  statusBadge: {
    position: "absolute",
    bottom: 14,
    left: 16,
    padding: "5px 14px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
  },
  body: { padding: "20px 24px 28px" },
  name: { margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#0f172a" },
  meta: { margin: "0 0 12px", fontSize: 14, color: "#64748b" },
  desc: { margin: "0 0 20px", fontSize: 14, color: "#475569", lineHeight: 1.7 },
  infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 },
  infoItem: {
    background: "#f8fafc",
    borderRadius: 10,
    padding: "12px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  infoLabel: { fontSize: 11, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5 },
  infoValue: { fontSize: 14, fontWeight: 600, color: "#0f172a", textTransform: "capitalize" },
  
};

export default PetDetailModal;
