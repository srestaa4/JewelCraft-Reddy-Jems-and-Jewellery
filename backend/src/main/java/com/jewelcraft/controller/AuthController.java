package com.jewelcraft.controller;

import com.jewelcraft.entity.User;
import com.jewelcraft.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        String portal = loginRequest.get("portal");
        String securityKey = loginRequest.get("securityKey");
        String employeeCode = loginRequest.get("employeeCode");

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid email or password. Access denied."));
        }

        User user = userOpt.get();

        // 1. Admin Portal Security Verification
        if ("admin".equalsIgnoreCase(portal) || "ROLE_ADMIN".equalsIgnoreCase(user.getRole())) {
            if (!"ROLE_ADMIN".equalsIgnoreCase(user.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Access Denied: Only certified administrators are authorized."));
            }
            if (securityKey == null || (!"889900".equals(securityKey.trim()) && !"REDDY-ADMIN-2026".equals(securityKey.trim()))) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Admin Security Verification Failed: Invalid 2FA Security Key."));
            }
        }

        // 2. Salesman Portal Security Verification
        if ("salesman".equalsIgnoreCase(portal) || ("ROLE_SALESMAN".equalsIgnoreCase(user.getRole()) && !"customer".equalsIgnoreCase(portal))) {
            if (!"ROLE_SALESMAN".equalsIgnoreCase(user.getRole()) && !"ROLE_ADMIN".equalsIgnoreCase(user.getRole())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("error", "Access Denied: Unauthorized staff portal login."));
            }
            if ("ROLE_SALESMAN".equalsIgnoreCase(user.getRole())) {
                if (employeeCode == null || !employeeCode.trim().equalsIgnoreCase(user.getEmployeeCode())) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Staff Verification Failed: Invalid Showroom Employee Code."));
                }
            }
        }

        String token = "jwt_" + user.getId() + "_" + user.getRole() + "_" + System.currentTimeMillis();

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Email already registered"));
        }

        user.setId("USR-CUST-" + (userRepository.count() + 1));
        user.setRole("ROLE_CUSTOMER");
        User savedUser = userRepository.save(user);

        String token = "jwt_" + savedUser.getId() + "_" + System.currentTimeMillis();

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", savedUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Unauthorized token"));
        }

        String token = authHeader.substring(7);
        String[] parts = token.split("_");
        if (parts.length < 2) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid token format"));
        }

        String userId = parts[1];
        Optional<User> userOpt = userRepository.findById(userId);
        return userOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
    }
}
