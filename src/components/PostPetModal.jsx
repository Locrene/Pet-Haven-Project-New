import React, { useState } from "react";
import "../styles/app.css";

const PostPetModal = ({ onClose, onPost }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    type: "Dog",
    breed: "",
    location: "",
    description: "",
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    image: "",
  });

  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // LOCAL IMAGE UPLOAD
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);

      setForm({
        ...form,
        image: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Required";
    if (!form.age || isNaN(form.age) || Number(form.age) <= 0)
      e.age = "Valid age required";
    if (!form.breed.trim()) e.breed = "Required";
    if (!form.location.trim()) e.location = "Required";
    if (!form.description.trim()) e.description = "Required";
    if (!form.ownerName.trim()) e.ownerName = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.email.trim()) e.email = "Required";

    return e;
  };

  const handleSubmit = () => {
    const e = validate();

    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    onPost({
      ...form,
      age: Number(form.age),
    });

    setSubmitted(true);

    setTimeout(() => {
      onClose();
    }, 1800);
  };

  if (submitted) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="post-modal-box success-box"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="success-icon">🐾</div>
          <h2>Pet Posted!</h2>
          <p>Your pet has been listed for adoption.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="post-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="post-modal-header">
          <h2>🐾 Post a Pet for Adoption</h2>

          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="post-modal-body">

          <div className="post-section-title">Pet Info</div>

          <div className="post-form-row">
            <div className="post-field">
              <label>Pet Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Luna"
              />
              {errors.name && (
                <span className="field-error">{errors.name}</span>
              )}
            </div>

            <div className="post-field">
              <label>Age (years) *</label>
              <input
                name="age"
                type="number"
                min="0"
                value={form.age}
                onChange={handleChange}
                placeholder="e.g. 2"
              />
              {errors.age && (
                <span className="field-error">{errors.age}</span>
              )}
            </div>
          </div>

          <div className="post-form-row">
            <div className="post-field">
              <label>Type *</label>

              <select
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option>Dog</option>
                <option>Cat</option>
                <option>Bird</option>
                <option>Rabbit</option>
                <option>Other</option>
              </select>
            </div>

            <div className="post-field">
              <label>Breed *</label>
              <input
                name="breed"
                value={form.breed}
                onChange={handleChange}
                placeholder="Golden Retriever"
              />
              {errors.breed && (
                <span className="field-error">{errors.breed}</span>
              )}
            </div>
          </div>

          <div className="post-field">
            <label>Location *</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Cebu City"
            />
            {errors.location && (
              <span className="field-error">{errors.location}</span>
            )}
          </div>

          {/* IMAGE UPLOAD */}
          <div className="post-field">
            <label>Upload Pet Photo</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginTop: "10px",
                }}
              />
            )}
          </div>

          <div className="post-field">
            <label>Description *</label>

            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell people about this pet..."
            />

            {errors.description && (
              <span className="field-error">
                {errors.description}
              </span>
            )}
          </div>

          <div
            className="post-section-title"
            style={{ marginTop: "8px" }}
          >
            Your Contact Info
          </div>

          <div className="post-form-row">
            <div className="post-field">
              <label>Your Name *</label>

              <input
                name="ownerName"
                value={form.ownerName}
                onChange={handleChange}
                placeholder="Full name"
              />

              {errors.ownerName && (
                <span className="field-error">
                  {errors.ownerName}
                </span>
              )}
            </div>

            <div className="post-field">
              <label>Phone *</label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+63 9XX XXX XXXX"
              />

              {errors.phone && (
                <span className="field-error">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="post-form-row">
            <div className="post-field">
              <label>Email *</label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
              />

              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            <div className="post-field">
              <label>Address</label>

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Your address"
              />
            </div>
          </div>

          <button
            className="post-submit-btn"
            onClick={handleSubmit}
          >
            Post for Adoption 🐾
          </button>

        </div>
      </div>
    </div>
  );
};

export default PostPetModal;