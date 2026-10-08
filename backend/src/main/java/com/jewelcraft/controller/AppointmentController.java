package com.jewelcraft.controller;

import com.jewelcraft.entity.Appointment;
import com.jewelcraft.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/customer/{customerId}")
    public List<Appointment> getCustomerAppointments(@PathVariable String customerId) {
        return appointmentRepository.findByCustomerId(customerId);
    }

    @GetMapping("/salesman/{salesmanId}")
    public List<Appointment> getSalesmanAppointments(@PathVariable String salesmanId) {
        return appointmentRepository.findBySalesmanId(salesmanId);
    }

    @PostMapping
    public ResponseEntity<?> bookAppointment(@RequestBody Appointment appointment) {
        // Prevent duplicate appointment for the same showroom, date, and time slot
        Optional<Appointment> conflict = appointmentRepository.findByShowroomIdAndDateAndTimeAndStatusNot(
                appointment.getShowroomId(), appointment.getDate(), appointment.getTime(), "CANCELLED"
        );
        if (conflict.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("error", "This time slot is already booked at the selected showroom."));
        }

        if (appointment.getId() == null) {
            appointment.setId("JC" + (1001 + appointmentRepository.count()));
        }
        appointment.setStatus("BOOKED");
        appointment.setCreatedAt(LocalDateTime.now());

        Appointment saved = appointmentRepository.save(appointment);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String newStatus = body.get("status");
        String salesmanNotes = body.get("salesmanNotes");

        return appointmentRepository.findById(id).map(appt -> {
            if (newStatus != null) appt.setStatus(newStatus);
            if (salesmanNotes != null) appt.setSalesmanNotes(salesmanNotes);
            return ResponseEntity.ok(appointmentRepository.save(appt));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/assign")
    public ResponseEntity<?> assignSalesman(@PathVariable String id, @RequestBody Map<String, String> body) {
        String salesmanId = body.get("salesmanId");
        return appointmentRepository.findById(id).map(appt -> {
            appt.setSalesmanId(salesmanId);
            return ResponseEntity.ok(appointmentRepository.save(appt));
        }).orElse(ResponseEntity.notFound().build());
    }
}
