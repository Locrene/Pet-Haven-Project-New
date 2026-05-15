package com.pethaven.backend.controller;

import com.pethaven.backend.model.AdoptionRequest;
import com.pethaven.backend.repository.AdoptionRequestRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adoption-requests")
@CrossOrigin(origins = "http://localhost:3000")
public class AdoptionRequestController {

    private final AdoptionRequestRepository repository;

    public AdoptionRequestController(AdoptionRequestRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<AdoptionRequest> getAllRequests() {
        return repository.findAll();
    }

    @PostMapping
    public AdoptionRequest createRequest(@RequestBody AdoptionRequest request) {
        request.setStatus("Pending");
        return repository.save(request);
    }

    @PutMapping("/{id}/status")
    public AdoptionRequest updateStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        AdoptionRequest request = repository.findById(id).orElseThrow();
        request.setStatus(status);
        return repository.save(request);
    }
}