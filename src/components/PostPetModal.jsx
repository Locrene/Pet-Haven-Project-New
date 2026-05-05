import React, { useState } from "react";

const EMPTY_FORM = {
  name: "",
  age: "",
  breed: "",
  location: "",
  description: "",
  owner: "",
  contact: "",
  image: "",
};

function PostPetModal({ onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);

      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));

      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
    };

    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Pet name is required.";
    }

    if (!form.age || Number(form.age) < 0) {
      newErrors.age = "Enter a valid age.";
    }

    if (!form.breed.trim()) {
      newErrors.breed = "Breed is required.";
    }

    if (!form.location.trim()) {
      newErrors.location = "Location is required.";
    }

    if (!form.owner.trim()) {
      newErrors.owner = "Owner name is required.";
    }

    if (!form.contact.trim()) {
      newErrors.contact = "Contact number is required.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!form.image) {
      newErrors.image = "Please upload a photo.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      onSubmit(form);
      setSubmitting(false);
      onClose();
    }, 400);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-card post-pet-modal">

        <div className="post-modal-header">
          <h2>🐾 Post a Pet for Adoption</h2>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form
          className="post-pet-form"
          onSubmit={handleSubmit}
          noValidate
        >

          <div className="form-image-upload">
            <label
              htmlFor="pet-image-input"
              className="image-upload-label"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="image-preview"
                />
              ) : (
                <div className="image-upload-placeholder">
                  <span className="upload-icon">📷</span>
                  <span>Click to upload pet photo</span>
                </div>
              )}
            </label>

            <input
              id="pet-image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />

            {errors.image && (
              <span className="form-error">{errors.image}</span>
            )}
          </div>

          <div className="post-form-grid">

            <div className="form-group">
              <label>Pet Name *</label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Luna"
              />

              {errors.name && (
                <span className="form-error">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label>Age (years) *</label>

              <input
                type="number"
                name="age"
                min="0"
                value={form.age}
                onChange={handleChange}
                placeholder="e.g. 2"
              />

              {errors.age && (
                <span className="form-error">{errors.age}</span>
              )}
            </div>

            <div className="form-group">
              <label>Breed *</label>

              <input
                type="text"
                name="breed"
                value={form.breed}
                onChange={handleChange}
                placeholder="e.g. Golden Retriever"
              />

              {errors.breed && (
                <span className="form-error">{errors.breed}</span>
              )}
            </div>

            <div className="form-group">
              <label>Location *</label>

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Cebu City"
              />

              {errors.location && (
                <span className="form-error">{errors.location}</span>
              )}
            </div>

            <div className="form-group">
              <label>Owner Name *</label>

              <input
                type="text"
                name="owner"
                value={form.owner}
                onChange={handleChange}
                placeholder="Your name"
              />

              {errors.owner && (
                <span className="form-error">{errors.owner}</span>
              )}
            </div>

            <div className="form-group">
              <label>Contact Number *</label>

              <input
                type="tel"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="e.g. 09171234567"
              />

              {errors.contact && (
                <span className="form-error">{errors.contact}</span>
              )}
            </div>

          </div>

          <div className="form-group form-group-full">
            <label>Description *</label>

            <textarea
              name="description"
              rows="3"
              value={form.description}
              onChange={handleChange}
              placeholder="Tell us about your pet..."
            />

            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>

          <div className="modal-actions">

            <button
              type="submit"
              className="modal-call-btn"
              disabled={submitting}
            >
              {submitting
                ? "Posting..."
                : "🐾 Post for Adoption"}
            </button>

            <button
              type="button"
              className="modal-dismiss-btn"
              onClick={onClose}
            >
              Cancel
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default PostPetModal;