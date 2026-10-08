package com.jewelcraft.repository;

import com.jewelcraft.entity.Design;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DesignRepository extends JpaRepository<Design, String> {
    List<Design> findByJewelleryType(String jewelleryType);
}
