package com.jewelcraft.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "diamonds")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Diamond {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 50)
    private String shape; // Round, Princess, Oval, Emerald, Pear, Marquise, Cushion, Radiant, Heart

    @Column(nullable = false)
    private Double carat;

    @Column(nullable = false, length = 50)
    private String color;

    @Column(nullable = false, length = 50)
    private String clarity;

    @Column(nullable = false, length = 50)
    private String cut;

    @Column(nullable = false)
    private Double price;

    private Integer stock;

    private String image;

    @Column(length = 30)
    private String status; // AVAILABLE, RESERVED
}
