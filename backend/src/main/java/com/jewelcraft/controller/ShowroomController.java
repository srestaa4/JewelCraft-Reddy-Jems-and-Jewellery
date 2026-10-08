package com.jewelcraft.controller;

import com.jewelcraft.entity.Showroom;
import com.jewelcraft.repository.ShowroomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/showrooms")
@CrossOrigin(origins = "*")
public class ShowroomController {

    @Autowired
    private ShowroomRepository showroomRepository;

    @GetMapping
    public List<Showroom> getAllShowrooms() {
        return showroomRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Showroom> getShowroomById(@PathVariable String id) {
        return showroomRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Showroom> createShowroom(@RequestBody Showroom showroom) {
        if (showroom.getId() == null) {
            showroom.setId("SHW-0" + (showroomRepository.count() + 1));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(showroomRepository.save(showroom));
    }
}
