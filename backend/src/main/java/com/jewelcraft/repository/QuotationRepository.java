package com.jewelcraft.repository;

import com.jewelcraft.entity.Quotation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuotationRepository extends JpaRepository<Quotation, String> {
    List<Quotation> findByCustomerId(String customerId);
    List<Quotation> findBySalesmanId(String salesmanId);
    List<Quotation> findByAppointmentId(String appointmentId);
}
