package com.jewelcraft.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "quotations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Quotation {

    @Id
    @Column(length = 50)
    private String id; // e.g. QT-2026-001

    @Column(name = "appointment_id", nullable = false, length = 50)
    private String appointmentId;

    @Column(name = "customer_id", nullable = false, length = 50)
    private String customerId;

    @Column(name = "customer_name", length = 100)
    private String customerName;

    @Column(name = "customer_email", length = 100)
    private String customerEmail;

    @Column(name = "salesman_id", nullable = false, length = 50)
    private String salesmanId;

    @Column(name = "salesman_name", length = 100)
    private String salesmanName;

    @Column(length = 100)
    private String jewellery;

    @Column(length = 100)
    private String design;

    @Column(length = 100)
    private String metal;

    @Column(length = 100)
    private String diamond;

    @Column(name = "diamond_shape", length = 50)
    private String diamondShape;

    @Column(length = 30)
    private String size;

    @Column(name = "customization_details", columnDefinition = "TEXT")
    private String customizationDetails;

    @Column(name = "estimated_price", nullable = false)
    private Double estimatedPrice;

    @Column(name = "additional_charges")
    private Double additionalCharges;

    private Double discount;

    @Column(name = "final_price", nullable = false)
    private Double finalPrice;

    @Column(name = "salesman_notes", columnDefinition = "TEXT")
    private String salesmanNotes;

    @Column(name = "valid_until_date")
    private LocalDate validUntilDate;

    @Column(length = 30)
    private String status; // PENDING, ACCEPTED, REVISED

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
