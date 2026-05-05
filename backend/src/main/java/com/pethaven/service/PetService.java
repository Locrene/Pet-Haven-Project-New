package com.pethaven.service;

import com.pethaven.dto.PetDTO;
import com.pethaven.entity.Pet;
import com.pethaven.entity.User;
import com.pethaven.repository.PetRepository;
import com.pethaven.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UserRepository userRepository;

    public List<PetDTO> getAllPets() {
        return petRepository.findAll().stream()
                .map(PetDTO::new)
                .collect(Collectors.toList());
    }

    public PetDTO getPetById(Long id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found"));
        return new PetDTO(pet);
    }

    public List<PetDTO> getPetsByStatus(String status) {
        Pet.PetStatus petStatus = Pet.PetStatus.valueOf(status.toUpperCase());
        return petRepository.findByStatus(petStatus).stream()
                .map(PetDTO::new)
                .collect(Collectors.toList());
    }

    public List<PetDTO> getPetsByOwner(Long ownerId) {
        return petRepository.findByOwnerId(ownerId).stream()
                .map(PetDTO::new)
                .collect(Collectors.toList());
    }

    public List<PetDTO> searchPets(String keyword) {
        return petRepository.searchPets(keyword).stream()
                .map(PetDTO::new)
                .collect(Collectors.toList());
    }

    public PetDTO createPet(PetDTO petDTO, Long ownerId) {
        User owner = userRepository.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Pet pet = new Pet();
        pet.setName(petDTO.getName());
        pet.setAge(petDTO.getAge());
        pet.setLocation(petDTO.getLocation());
        pet.setBreed(petDTO.getBreed());
        pet.setStatus(Pet.PetStatus.valueOf(petDTO.getStatus().toUpperCase()));
        pet.setDescription(petDTO.getDescription());
        pet.setImageUrl(petDTO.getImageUrl());
        pet.setOwnerName(petDTO.getOwnerName());
        pet.setContactNumber(petDTO.getContactNumber());
        pet.setOwner(owner);

        Pet savedPet = petRepository.save(pet);
        return new PetDTO(savedPet);
    }

    public PetDTO updatePet(Long id, PetDTO petDTO) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found"));

        pet.setName(petDTO.getName());
        pet.setAge(petDTO.getAge());
        pet.setLocation(petDTO.getLocation());
        pet.setBreed(petDTO.getBreed());
        pet.setStatus(Pet.PetStatus.valueOf(petDTO.getStatus().toUpperCase()));
        pet.setDescription(petDTO.getDescription());
        pet.setImageUrl(petDTO.getImageUrl());
        pet.setOwnerName(petDTO.getOwnerName());
        pet.setContactNumber(petDTO.getContactNumber());

        Pet updatedPet = petRepository.save(pet);
        return new PetDTO(updatedPet);
    }

    public void deletePet(Long id) {
        Pet pet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pet not found"));
        petRepository.delete(pet);
    }

    public long getPetCountByStatus(String status) {
        Pet.PetStatus petStatus = Pet.PetStatus.valueOf(status.toUpperCase());
        return petRepository.countByStatus(petStatus);
    }
}