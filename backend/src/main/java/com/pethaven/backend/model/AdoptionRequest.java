package com.pethaven.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AdoptionRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long petId;
    private String petName;
    private String petBreed;
    private String petImage;

    private String requesterName;
    private String requesterEmail;

    private String status = "Pending";

    public AdoptionRequest() {}

    public Long getId() { return id; }
    public Long getPetId() { return petId; }
    public String getPetName() { return petName; }
    public String getPetBreed() { return petBreed; }
    public String getPetImage() { return petImage; }
    public String getRequesterName() { return requesterName; }
    public String getRequesterEmail() { return requesterEmail; }
    public String getStatus() { return status; }

    public void setId(Long id) { this.id = id; }
    public void setPetId(Long petId) { this.petId = petId; }
    public void setPetName(String petName) { this.petName = petName; }
    public void setPetBreed(String petBreed) { this.petBreed = petBreed; }
    public void setPetImage(String petImage) { this.petImage = petImage; }
    public void setRequesterName(String requesterName) { this.requesterName = requesterName; }
    public void setRequesterEmail(String requesterEmail) { this.requesterEmail = requesterEmail; }
    public void setStatus(String status) { this.status = status; }
}