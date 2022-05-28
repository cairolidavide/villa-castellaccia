package com.digitazon.Villacastellaccia.models.repositories;

import com.digitazon.Villacastellaccia.models.entities.Service;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service, Integer> {
    List<Service> findAllByOrderByIdAsc();
}
