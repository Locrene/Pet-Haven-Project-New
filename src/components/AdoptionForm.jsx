import React, { useState } from "react";
import PetService from "../services/PetService";
import "../styles/adoption-form.css";

function AdoptionForm({ pet, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    adopterName: "",
    contact: "",
    address: "",
    reason: "",
    termsAccepted: false,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.adopterName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.contact.trim()) {
      setError("Contact number is required");
      return false;
    }
    if (!/^[\d\s\-\+\(\)]+$/.test(formData.contact)) {
      setError("Please enter a valid contact number");
      return false;
    }
    if (!formData.address.trim()) {
      setError("Address is required");
      return false;
    }
    if (!formData.reason.trim()) {
      setError("Please tell us why you want to adopt");
      return false;
    }
    if (!formData.termsAccepted) {
      setError("Please accept the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      const payload = {
        petId: pet.id,
        adopterName: formData.adopterName,
        contact: formData.contact,
        address: formData.address,
        reason: formData.reason,
      };

      console.log("Submitting adoption form:", payload);
      
      // Replace with actual API call when backend is ready
      // const response = await axios.post("/api/adoptions", payload);
      
      // Mark pet as adopted in local storage
      PetService.updatePetStatus(pet.id, "adopted");
      
      // Simulate success
      setTimeout(() => {
        setShowSuccess(true);
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 2000);
      }, 500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit adoption form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (showSuccess) {
    return (
      <div className="modal-backdrop" onClick={handleBackdropClick}>
        <div className="adoption-form-modal adoption-success-modal">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h2>Adoption Request Submitted!</h2>
            <p>Thank you for your interest in adopting <strong>{pet.name}</strong>.</p>
            <p>The pet owner will contact you shortly to finalize the adoption.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="adoption-form-modal">
        <button className="modal-close-btn" onClick={onClose} title="Close">✕</button>

        <div className="adoption-form-header">
          <div className="adoption-form-pet-info">
            <img src={pet.image} alt={pet.name} className="adoption-form-pet-thumb" />
            <div>
              <h2>Adopt {pet.name}</h2>
              <p>Complete the adoption application</p>
            </div>
          </div>
        </div>

        <form className="adoption-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="adopterName" className="form-label">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="adopterName"
              name="adopterName"
              value={formData.adopterName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="form-input"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact" className="form-label">
              Contact Number <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="e.g., +63 9XX XXX XXXX"
              className="form-input"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address <span className="required">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full address"
              className="form-textarea"
              rows="3"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="reason" className="form-label">
              Why do you want to adopt {pet.name}? <span className="required">*</span>
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Tell us about your home, family, and why you'd like to adopt..."
              className="form-textarea"
              rows="4"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group form-checkbox">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <span>
                I agree to the Terms & Conditions and understand that I am responsible for {pet.name}'s care and well-being
              </span>
            </label>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdoptionForm;
