package com.jewelcraft.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @Column(length = 50)
    private String id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 30)
    private String role; // ROLE_CUSTOMER, ROLE_SALESMAN, ROLE_ADMIN

    @Column(length = 30)
    private String phone;

    @Column(length = 50)
    private String city;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "employee_code", length = 50)
    private String employeeCode;

    @Column(name = "showroom_id", length = 50)
    private String showroomId;
}
