package com.jewelcraft.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {

    @Id
    @Column(length = 50)
    private String id; // e.g. JC1001

    @Column(name = "customer_id", nullable = false, length = 50)
    private String customerId;

    @Column(name = "customer_name", length = 100)
    private String customerName;

    @Column(name = "customer_email", length = 100)
    private String customerEmail;

    @Column(name = "customer_phone", length = 50)
    private String customerPhone;

    @Column(name = "salesman_id", length = 50)
    private String salesmanId;

    @Column(name = "salesman_name", length = 100)
    private String salesmanName;

    @Column(name = "showroom_id", nullable = false, length = 50)
    private String showroomId;

    @Column(name = "showroom_name", length = 100)
    private String showroomName;

    // Serialized or structured customization specs
    @Column(columnDefinition = "TEXT")
    private String customizationJson;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false, length = 30)
    private String time;

    @Column(nullable = false, length = 30)
    private String status; // BOOKED, CONFIRMED, RESCHEDULED, COMPLETED, CANCELLED

    @Column(name = "customer_notes", columnDefinition = "TEXT")
    private String customerNotes;

    @Column(name = "salesman_notes", columnDefinition = "TEXT")
    private String salesmanNotes;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
