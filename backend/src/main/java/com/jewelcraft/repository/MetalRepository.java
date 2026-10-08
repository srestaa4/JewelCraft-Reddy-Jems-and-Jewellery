package com.jewelcraft.repository;

import com.jewelcraft.entity.Metal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetalRepository extends JpaRepository<Metal, String> {
}
