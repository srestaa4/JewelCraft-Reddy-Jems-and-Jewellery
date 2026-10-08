package com.jewelcraft.controller;

import com.jewelcraft.entity.Metal;
import com.jewelcraft.repository.MetalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/metals")
@CrossOrigin(origins = "*")
public class MetalController {

    @Autowired
    private MetalRepository metalRepository;

    @GetMapping
    public List<Metal> getAllMetals() {
        return metalRepository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Metal> updateMetal(@PathVariable String id, @RequestBody Metal metal) {
        return metalRepository.findById(id).map(existing -> {
            if (metal.getPricePerGram() != null) existing.setPricePerGram(metal.getPricePerGram());
            if (metal.getStatus() != null) existing.setStatus(metal.getStatus());
            return ResponseEntity.ok(metalRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }
}
