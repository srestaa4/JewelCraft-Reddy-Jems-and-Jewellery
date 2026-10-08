package com.jewelcraft.controller;

import com.jewelcraft.entity.Jewellery;
import com.jewelcraft.repository.JewelleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jewellery")
@CrossOrigin(origins = "*")
public class JewelleryController {

    @Autowired
    private JewelleryRepository jewelleryRepository;

    @GetMapping
    public List<Jewellery> getAllJewellery() {
        return jewelleryRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Jewellery> getJewelleryById(@PathVariable String id) {
        return jewelleryRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Jewellery> createJewellery(@RequestBody Jewellery jewellery) {
        if (jewellery.getId() == null) {
            jewellery.setId("JWL-0" + (jewelleryRepository.count() + 1));
        }
        Jewellery saved = jewelleryRepository.save(jewellery);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Jewellery> updateJewellery(@PathVariable String id, @RequestBody Jewellery jewellery) {
        if (!jewelleryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        jewellery.setId(id);
        return ResponseEntity.ok(jewelleryRepository.save(jewellery));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJewellery(@PathVariable String id) {
        if (!jewelleryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        jewelleryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
