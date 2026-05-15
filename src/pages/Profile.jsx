import { useState, useEffect } from "react";
import AuthService from "../services/AuthService";

function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const current = AuthService.getCurrentUser();
    if (current) {
      setUser(current);
      setForm({
        firstName: current.firstName || "",
        lastName:  current.lastName  || "",
        email:     current.email     || "",
      });
    }
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = () => {
    const updated = { ...user, ...form };
    localStorage.setItem("pawhavenCurrentUser", JSON.stringify(updated));
    setUser(updated);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (!user) return <div className="main-content">Loading profile…</div>;

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header card */}
        <div style={styles.headerCard}>
          <div style={styles.avatarWrap}>
            <div style={styles.avatar}>
              {user.firstName?.[0]?.toUpperCase() ?? "U"}
            </div>
          </div>
          <div>
            <h2 style={styles.name}>
              {user.firstName} {user.lastName}
            </h2>
            <p style={styles.email}>{user.email}</p>
            <span style={styles.badge}>
              {user.role === "ADMIN" ? "🔧 Administrator" : "🐾 Pet Adopter"}
            </span>
          </div>
          {!editing && (
            <button
              style={styles.editBtn}
              onClick={() => setEditing(true)}
            >
              ✏️ Edit Profile
            </button>
          )}
        </div>

        {/* Toast */}
        {saved && (
          <div style={styles.toast}>✅ Profile updated successfully!</div>
        )}

        {/* Info / Edit panel */}
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <h3 style={styles.panelTitle}>
              {editing ? "Edit Profile" : "Profile Information"}
            </h3>
            {editing && (
              <button style={styles.cancelBtn} onClick={() => setEditing(false)}>
                Cancel
              </button>
            )}
          </div>

          <div style={styles.fields}>
            {[
              { label: "First Name", key: "firstName" },
              { label: "Last Name",  key: "lastName"  },
              { label: "Email",      key: "email"     },
            ].map(({ label, key }) => (
              <div key={key} style={styles.field}>
                <label style={styles.label}>{label}</label>
                {editing ? (
                  <input
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    style={styles.input}
                  />
                ) : (
                  <p style={styles.value}>{user[key] || "—"}</p>
                )}
              </div>
            ))}

            {/* Read-only fields */}
            {[
              { label: "Account Type", value: user.role === "ADMIN" ? "Administrator" : "User" },
              { label: "Member Since",  value: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—" },
            ].map(({ label, value }) => (
              <div key={label} style={styles.field}>
                <label style={styles.label}>{label}</label>
                <p style={styles.value}>{value}</p>
              </div>
            ))}
          </div>

          {editing && (
            <div style={styles.footer}>
              <button style={styles.saveBtn} onClick={handleSave}>
                💾 Save Changes
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f4f6fb", padding: "32px 24px" },
  container: { maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 24 },

  headerCard: {
    background: "linear-gradient(135deg, #1e3a6e 0%, #0f2546 100%)",
    borderRadius: 20,
    padding: "32px 36px",
    display: "flex",
    alignItems: "center",
    gap: 24,
    flexWrap: "wrap",
    boxShadow: "0 8px 24px rgba(30,58,110,0.2)",
    position: "relative",
  },
  avatarWrap: { flexShrink: 0 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.2)",
    border: "3px solid rgba(255,255,255,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    fontWeight: 800,
    color: "white",
  },
  name:  { margin: 0, fontSize: 22, fontWeight: 800, color: "white" },
  email: { margin: "4px 0 8px", fontSize: 14, color: "rgba(255,255,255,0.7)" },
  badge: {
    background: "rgba(249,115,22,0.2)",
    color: "#fed7aa",
    border: "1px solid rgba(249,115,22,0.4)",
    borderRadius: 30,
    padding: "4px 14px",
    fontSize: 12,
    fontWeight: 700,
  },
  editBtn: {
    marginLeft: "auto",
    padding: "10px 22px",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    border: "1.5px solid rgba(255,255,255,0.3)",
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  },

  toast: {
    background: "#0f766e",
    color: "white",
    padding: "14px 24px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
  },

  panel: { background: "white", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden" },
  panelHeader: {
    padding: "20px 28px",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  panelTitle: { margin: 0, fontSize: 17, fontWeight: 700, color: "#0f172a" },
  cancelBtn: {
    padding: "8px 18px",
    background: "#f1f5f9",
    color: "#475569",
    border: "none",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
  },

  fields: { padding: "8px 0" },
  field: {
    display: "grid",
    gridTemplateColumns: "180px 1fr",
    alignItems: "center",
    gap: 16,
    padding: "14px 28px",
    borderBottom: "1px solid #f8fafc",
  },
  label: { fontSize: 13, fontWeight: 600, color: "#64748b" },
  value: { margin: 0, fontSize: 14, color: "#0f172a", fontWeight: 500 },
  input: {
    padding: "9px 14px",
    border: "1.5px solid #e2e8f0",
    borderRadius: 10,
    fontSize: 14,
    color: "#0f172a",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },

  footer: { padding: "20px 28px", borderTop: "1px solid #f1f5f9" },
  saveBtn: {
    padding: "12px 28px",
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
};

export default Profile;
