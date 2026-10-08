package com.jewelcraft.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "metals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Metal {

    @Id
    @Column(length = 50)
    private String id;

    @Column(name = "metal_name", nullable = false, length = 100)
    private String metalName;

    @Column(nullable = false, length = 50)
    private String purity;

    @Column(name = "price_per_gram", nullable = false)
    private Double pricePerGram;

    @Column(name = "color_code", length = 30)
    private String colorCode;

    private Boolean availability;

    @Column(length = 30)
    private String status; // ACTIVE, INACTIVE
}
