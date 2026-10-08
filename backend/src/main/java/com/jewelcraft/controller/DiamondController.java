package com.jewelcraft.controller;

import com.jewelcraft.entity.Diamond;
import com.jewelcraft.repository.DiamondRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/diamonds")
@CrossOrigin(origins = "*")
public class DiamondController {

    @Autowired
    private DiamondRepository diamondRepository;

    @GetMapping
    public List<Diamond> getAllDiamonds(
            @RequestParam(required = false) String shape,
            @RequestParam(required = false) Double minCarat,
            @RequestParam(required = false) Double maxCarat
    ) {
        if (shape != null && !shape.equalsIgnoreCase("All")) {
            return diamondRepository.findByShape(shape);
        }
        return diamondRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Diamond> createDiamond(@RequestBody Diamond diamond) {
        if (diamond.getId() == null) {
            diamond.setId("DMD-0" + (diamondRepository.count() + 1));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(diamondRepository.save(diamond));
    }
}
