package com.pethaven.repository;

import com.pethaven.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {

    List<Pet> findByStatus(Pet.PetStatus status);

    List<Pet> findByOwnerId(Long ownerId);

    List<Pet> findByLocationContainingIgnoreCase(String location);

    List<Pet> findByBreedContainingIgnoreCase(String breed);

    @Query("SELECT p FROM Pet p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(p.breed) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "OR LOWER(p.location) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Pet> searchPets(@Param("keyword") String keyword);

    long countByStatus(Pet.PetStatus status);
}