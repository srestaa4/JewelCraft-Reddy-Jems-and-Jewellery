package com.jewelcraft.controller;

import com.jewelcraft.entity.Appointment;
import com.jewelcraft.entity.Quotation;
import com.jewelcraft.repository.AppointmentRepository;
import com.jewelcraft.repository.QuotationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quotations")
@CrossOrigin(origins = "*")
public class QuotationController {

    @Autowired
    private QuotationRepository quotationRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @GetMapping
    public List<Quotation> getAllQuotations() {
        return quotationRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quotation> getQuotationById(@PathVariable String id) {
        return quotationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/customer/{customerId}")
    public List<Quotation> getCustomerQuotations(@PathVariable String customerId) {
        return quotationRepository.findByCustomerId(customerId);
    }

    @PostMapping
    public ResponseEntity<Quotation> createQuotation(@RequestBody Quotation quotation) {
        if (quotation.getId() == null) {
            quotation.setId("QT-2026-" + String.format("%03d", quotationRepository.count() + 1));
        }
        quotation.setStatus("PENDING");
        quotation.setCreatedAt(LocalDateTime.now());
        if (quotation.getValidUntilDate() == null) {
            quotation.setValidUntilDate(LocalDate.now().plusDays(30));
        }

        Quotation saved = quotationRepository.save(quotation);

        // Mark associated appointment as COMPLETED if exists
        if (quotation.getAppointmentId() != null) {
            Optional<Appointment> apptOpt = appointmentRepository.findById(quotation.getAppointmentId());
            apptOpt.ifPresent(appt -> {
                appt.setStatus("COMPLETED");
                appt.setSalesmanNotes("Final Quotation " + saved.getId() + " issued for Rs. " + saved.getFinalPrice());
                appointmentRepository.save(appt);
            });
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
