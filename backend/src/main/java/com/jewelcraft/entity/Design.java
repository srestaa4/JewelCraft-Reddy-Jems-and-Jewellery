package com.jewelcraft.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "designs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Design {

    @Id
    @Column(length = 50)
    private String id;

    @Column(name = "design_name", nullable = false, length = 100)
    private String designName;

    @Column(name = "jewellery_type", nullable = false, length = 50)
    private String jewelleryType;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String image;

    @Column(name = "base_price", nullable = false)
    private Double basePrice;

    @Column(length = 30)
    private String status; // ACTIVE, ARCHIVED
}
