package com.jewelcraft.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "jewellery")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Jewellery {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String type; // Ring, Necklace, Earrings, Bracelet, Pendant

    @Column(columnDefinition = "TEXT")
    private String description;

    private String image;

    @Column(name = "base_price", nullable = false)
    private Double basePrice;

    @Column(length = 30)
    private String status; // AVAILABLE, OUT_OF_STOCK
}
