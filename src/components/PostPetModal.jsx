import { useState, useEffect } from "react";

const INITIAL = {
  name: "", age: "", breed: "", location: "", status: "available", description: "", image: "",
};

function PostPetModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim())     errs.name     = "Pet name is required.";
    if (!form.breed.trim())    errs.breed    = "Breed is required.";
    if (!form.location.trim()) errs.location = "Location is required.";
    if (!form.age || isNaN(form.age) || Number(form.age) < 0)
      errs.age = "Please enter a valid age.";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSubmit({ ...form, age: Number(form.age) });
    setSubmitted(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={s.header}>
          <div>
            <h2 style={s.title}>Post a Pet</h2>
            <p style={s.subtitle}>Fill in the details to list your pet for adoption.</p>
          </div>
          <button style={s.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        {submitted ? (
          <div style={s.successBox}>
            <p style={{ fontSize: 48, margin: "0 0 12px" }}>🎉</p>
            <h3 style={{ color: "#0f766e", margin: "0 0 6px" }}>Pet Posted!</h3>
            <p style={{ color: "#64748b", margin: 0 }}>Your listing is now live on the adoption feed.</p>
          </div>
        ) : (
          <div style={s.body}>
            <div style={s.row}>
              <Field label="Pet Name *"  name="name"     value={form.name}     onChange={handleChange} error={errors.name}     placeholder="e.g. Luna" />
              <Field label="Age (years)*" name="age"     value={form.age}      onChange={handleChange} error={errors.age}      placeholder="e.g. 2" type="number" />
            </div>
            <div style={s.row}>
              <Field label="Breed *"    name="breed"    value={form.breed}    onChange={handleChange} error={errors.breed}    placeholder="e.g. Aspin" />
              <Field label="Location *" name="location" value={form.location} onChange={handleChange} error={errors.location} placeholder="e.g. Cebu City" />
            </div>

            <div style={s.fieldWrap}>
              <label style={s.label}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} style={s.select}>
                <option value="available">Available for Adoption</option>
                <option value="missing">Missing</option>
              </select>
            </div>

            <div style={s.fieldWrap}>
              <label style={s.label}>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                placeholder="Tell adopters about the pet's personality, habits, health…"
                style={s.textarea}
              />
            </div>

            <div style={s.fieldWrap}>
              <label style={s.label}>Image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/images/my-pet.jpg  or  https://…"
                style={s.input}
              />
            </div>

            <div style={s.footer}>
              <button style={s.cancelBtn} onClick={onClose}>Cancel</button>
              <button style={s.submitBtn} onClick={handleSubmit}>🐾 Post Pet</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, error, placeholder, type = "text" }) {
  return (
    <div style={{ flex: 1 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 }}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: `1.5px solid ${error ? "#fca5a5" : "#e2e8f0"}`,
          borderRadius: 10,
          fontSize: 14,
          fontFamily: "inherit",
          outline: "none",
          boxSizing: "border-box",
          background: error ? "#fff5f5" : "white",
        }}
      />
      {error && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#dc2626" }}>{error}</p>}
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
    maxWidth: 560,
    maxHeight: "90vh",
    overflow: "auto",
    boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
    fontFamily: "'Poppins', sans-serif",
  },
  header: {
    padding: "24px 28px 20px",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title:    { margin: 0, fontSize: 20, fontWeight: 800, color: "#0f172a" },
  subtitle: { margin: "4px 0 0", fontSize: 13, color: "#94a3b8" },
  closeBtn: {
    width: 34, height: 34, borderRadius: "50%",
    background: "#f1f5f9", border: "none", fontSize: 15,
    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
  },
  body: { padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16 },
  row:  { display: "flex", gap: 16 },
  fieldWrap: {},
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 6 },
  input: {
    width: "100%", padding: "10px 14px",
    border: "1.5px solid #e2e8f0", borderRadius: 10,
    fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
  },
  select: {
    width: "100%", padding: "10px 14px",
    border: "1.5px solid #e2e8f0", borderRadius: 10,
    fontSize: 14, fontFamily: "inherit", outline: "none", background: "white",
  },
  textarea: {
    width: "100%", padding: "10px 14px",
    border: "1.5px solid #e2e8f0", borderRadius: 10,
    fontSize: 14, fontFamily: "inherit", outline: "none",
    resize: "vertical", boxSizing: "border-box",
  },
  footer: { display: "flex", gap: 12, paddingTop: 4 },
  cancelBtn: {
    flex: 1, padding: "12px",
    background: "#f1f5f9", color: "#475569",
    border: "none", borderRadius: 10,
    fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
  },
  submitBtn: {
    flex: 2, padding: "12px",
    background: "linear-gradient(135deg, #1e3a6e 0%, #2c4a7c 100%)",
    color: "white", border: "none", borderRadius: 10,
    fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
    boxShadow: "0 4px 12px rgba(30,58,110,0.25)",
  },
  successBox: {
    padding: "48px 28px",
    textAlign: "center",
  },
};

export default PostPetModal;
