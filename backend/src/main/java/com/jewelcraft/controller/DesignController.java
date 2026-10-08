package com.jewelcraft.controller;

import com.jewelcraft.entity.Design;
import com.jewelcraft.repository.DesignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/designs")
@CrossOrigin(origins = "*")
public class DesignController {

    @Autowired
    private DesignRepository designRepository;

    @GetMapping
    public List<Design> getAllDesigns(@RequestParam(required = false) String type) {
        if (type != null && !type.isEmpty()) {
            return designRepository.findByJewelleryType(type);
        }
        return designRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Design> createDesign(@RequestBody Design design) {
        if (design.getId() == null) {
            design.setId("DSG-0" + (designRepository.count() + 1));
        }
        Design saved = designRepository.save(design);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
