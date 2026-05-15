package com.pethaven.backend.model;

import jakarta.persistence.*;

@Entity
public class MissingPetReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String petName;
    private String breed;
    private String age;
    private String location;

    @Column(length = 1000)
    private String description;

    private String image;

    private String reporterName;
    private String reporterEmail;

    // Admin review status: Pending, Accepted, Declined
    private String status = "Pending";

    // Pet status: Missing, Found
    private String petStatus = "Missing";

    public MissingPetReport() {}

    public Long getId() {
        return id;
    }

    public String getPetName() {
        return petName;
    }

    public String getBreed() {
        return breed;
    }

    public String getAge() {
        return age;
    }

    public String getLocation() {
        return location;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }

    public String getReporterName() {
        return reporterName;
    }

    public String getReporterEmail() {
        return reporterEmail;
    }

    public String getStatus() {
        return status;
    }

    public String getPetStatus() {
        return petStatus;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPetName(String petName) {
        this.petName = petName;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setReporterName(String reporterName) {
        this.reporterName = reporterName;
    }

    public void setReporterEmail(String reporterEmail) {
        this.reporterEmail = reporterEmail;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setPetStatus(String petStatus) {
        this.petStatus = petStatus;
    }
}