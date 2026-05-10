package com.pethaven.controller;

import com.pethaven.dto.PetDTO;
import com.pethaven.service.PetService;
import com.pethaven.service.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    PetService petService;

    @GetMapping
    public ResponseEntity<List<PetDTO>> getAllPets() {
        List<PetDTO> pets = petService.getAllPets();
        return ResponseEntity.ok(pets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDTO> getPetById(@PathVariable Long id) {
        PetDTO pet = petService.getPetById(id);
        return ResponseEntity.ok(pet);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<PetDTO>> getPetsByStatus(@PathVariable String status) {
        List<PetDTO> pets = petService.getPetsByStatus(status);
        return ResponseEntity.ok(pets);
    }

    @GetMapping("/owner/{ownerId}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<List<PetDTO>> getPetsByOwner(@PathVariable Long ownerId) {
        List<PetDTO> pets = petService.getPetsByOwner(ownerId);
        return ResponseEntity.ok(pets);
    }

    @GetMapping("/search")
    public ResponseEntity<List<PetDTO>> searchPets(@RequestParam String keyword) {
        List<PetDTO> pets = petService.searchPets(keyword);
        return ResponseEntity.ok(pets);
    }

    @PostMapping
    public ResponseEntity<?> createPet(@Valid @RequestBody PetDTO petDTO) {
        try {
            petService.createPet(petDTO);
            return ResponseEntity.ok("Pet created successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePet(@PathVariable Long id, @Valid @RequestBody PetDTO petDTO) {
        try {
            petService.updatePet(id, petDTO);
            return ResponseEntity.ok("Pet updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable Long id) {
        try {
            petService.deletePet(id);
            return ResponseEntity.ok("Pet deleted successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/count/{status}")
    public ResponseEntity<Long> getPetCountByStatus(@PathVariable String status) {
        long count = petService.getPetCountByStatus(status);
        return ResponseEntity.ok(count);
    }
}