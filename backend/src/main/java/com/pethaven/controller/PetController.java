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
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<PetDTO> createPet(@Valid @RequestBody PetDTO petDTO, Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        PetDTO createdPet = petService.createPet(petDTO, userDetails.getId());
        return ResponseEntity.ok(createdPet);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<PetDTO> updatePet(@PathVariable Long id, @Valid @RequestBody PetDTO petDTO) {
        PetDTO updatedPet = petService.updatePet(id, petDTO);
        return ResponseEntity.ok(updatedPet);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> deletePet(@PathVariable Long id) {
        petService.deletePet(id);
        return ResponseEntity.ok("Pet deleted successfully!");
    }

    @GetMapping("/count/{status}")
    public ResponseEntity<Long> getPetCountByStatus(@PathVariable String status) {
        long count = petService.getPetCountByStatus(status);
        return ResponseEntity.ok(count);
    }
}