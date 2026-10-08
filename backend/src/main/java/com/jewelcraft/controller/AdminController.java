package com.jewelcraft.controller;

import com.jewelcraft.entity.User;
import com.jewelcraft.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JewelleryRepository jewelleryRepository;

    @Autowired
    private DiamondRepository diamondRepository;

    @Autowired
    private ShowroomRepository showroomRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private QuotationRepository quotationRepository;

    @GetMapping("/stats")
    public Map<String, Object> getAdminStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalCustomers", userRepository.findByRole("ROLE_CUSTOMER").size());
        stats.put("totalSalesmen", userRepository.findByRole("ROLE_SALESMAN").size());
        stats.put("totalJewellery", jewelleryRepository.count());
        stats.put("totalDiamonds", diamondRepository.count());
        stats.put("totalShowrooms", showroomRepository.count());
        stats.put("todayAppointments", appointmentRepository.findByDate(LocalDate.now()).size());
        stats.put("pendingAppointments", appointmentRepository.findAll().stream()
                .filter(a -> a.getStatus().equals("BOOKED") || a.getStatus().equals("CONFIRMED")).count());
        stats.put("completedAppointments", appointmentRepository.findAll().stream()
                .filter(a -> a.getStatus().equals("COMPLETED")).count());
        stats.put("totalQuotations", quotationRepository.count());

        return stats;
    }

    @GetMapping("/users")
    public List<User> getUsers(@RequestParam(required = false) String role) {
        if (role != null && !role.isEmpty()) {
            return userRepository.findByRole(role);
        }
        return userRepository.findAll();
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (user.getId() == null) {
            user.setId("USR-" + System.currentTimeMillis());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(userRepository.save(user));
    }
}
