package com.jewelcraft.repository;

import com.jewelcraft.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, String> {
    List<Appointment> findByCustomerId(String customerId);
    List<Appointment> findBySalesmanId(String salesmanId);
    List<Appointment> findByShowroomId(String showroomId);
    Optional<Appointment> findByShowroomIdAndDateAndTimeAndStatusNot(String showroomId, LocalDate date, String time, String status);
    List<Appointment> findByDate(LocalDate date);
}
