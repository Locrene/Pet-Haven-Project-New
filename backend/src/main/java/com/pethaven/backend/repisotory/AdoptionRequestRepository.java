package com.pethaven.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pethaven.backend.model.AdoptionRequest;

public interface AdoptionRequestRepository extends JpaRepository<AdoptionRequest, Long> {
}