package com.jewelcraft.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "showrooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Showroom {

    @Id
    @Column(length = 50)
    private String id;

    @Column(name = "showroom_name", nullable = false, length = 100)
    private String showroomName;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(nullable = false, length = 100)
    private String city;

    @Column(length = 50)
    private String phone;

    @Column(length = 100)
    private String email;

    @Column(name = "opening_time", length = 30)
    private String openingTime;

    @Column(name = "closing_time", length = 30)
    private String closingTime;

    @Column(length = 30)
    private String status; // OPEN, CLOSED
}
