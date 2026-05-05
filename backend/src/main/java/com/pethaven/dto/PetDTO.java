package com.pethaven.dto;

import com.pethaven.entity.Pet;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class PetDTO {

    private Long id;
    private String name;
    private Integer age;
    private String location;
    private String breed;
    private String status;
    private String description;
    private String imageUrl;
    private String ownerName;
    private String contactNumber;
    private Long ownerId;

    public PetDTO() {}

    public PetDTO(Pet pet) {
        this.id = pet.getId();
        this.name = pet.getName();
        this.age = pet.getAge();
        this.location = pet.getLocation();
        this.breed = pet.getBreed();
        this.status = pet.getStatus().toString();
        this.description = pet.getDescription();
        this.imageUrl = pet.getImageUrl();
        this.ownerName = pet.getOwnerName();
        this.contactNumber = pet.getContactNumber();
        this.ownerId = pet.getOwner() != null ? pet.getOwner().getId() : null;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }
}