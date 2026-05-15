package com.pethaven.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pethaven.backend.model.MissingPetReport;
import com.pethaven.backend.repository.MissingPetReportRepository;

@RestController
@RequestMapping("/api/missing-pets")
@CrossOrigin(origins = "http://localhost:3000")
public class MissingPetReportController {

    private final MissingPetReportRepository repository;

    public MissingPetReportController(MissingPetReportRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<MissingPetReport> getAllReports() {
        return repository.findAll();
    }

    @GetMapping("/accepted")
    public List<MissingPetReport> getAcceptedReports() {
        return repository.findByStatus("Accepted");
    }

    @GetMapping("/pending")
    public List<MissingPetReport> getPendingReports() {
        return repository.findByStatus("Pending");
    }

    @PostMapping
    public MissingPetReport createReport(@RequestBody MissingPetReport report) {
        report.setStatus("Pending");
        report.setPetStatus(
                report.getPetStatus() == null ? "Missing" : report.getPetStatus()
        );

        return repository.save(report);
    }

    @PutMapping("/{id}")
    public MissingPetReport updateReport(
            @PathVariable Long id,
            @RequestBody MissingPetReport updatedReport
    ) {
        MissingPetReport report = repository.findById(id).orElseThrow();

        report.setPetName(updatedReport.getPetName());
        report.setBreed(updatedReport.getBreed());
        report.setAge(updatedReport.getAge());
        report.setLocation(updatedReport.getLocation());
        report.setDescription(updatedReport.getDescription());
        report.setImage(updatedReport.getImage());
        report.setPetStatus(updatedReport.getPetStatus());

        return repository.save(report);
    }

    @PutMapping("/{id}/status")
    public MissingPetReport updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        MissingPetReport report = repository.findById(id).orElseThrow();

        report.setStatus(status);

        return repository.save(report);
    }
}