package com.jewelcraft.repository;

import com.jewelcraft.entity.Diamond;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiamondRepository extends JpaRepository<Diamond, String> {
    List<Diamond> findByShape(String shape);
}
