package com.pethaven.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pethaven.backend.model.MissingPetReport;

public interface MissingPetReportRepository extends JpaRepository<MissingPetReport, Long> {
    List<MissingPetReport> findByStatus(String status);
}