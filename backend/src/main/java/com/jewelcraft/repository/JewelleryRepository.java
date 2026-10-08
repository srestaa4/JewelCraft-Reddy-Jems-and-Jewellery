package com.jewelcraft.repository;

import com.jewelcraft.entity.Jewellery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JewelleryRepository extends JpaRepository<Jewellery, String> {
    List<Jewellery> findByType(String type);
}
