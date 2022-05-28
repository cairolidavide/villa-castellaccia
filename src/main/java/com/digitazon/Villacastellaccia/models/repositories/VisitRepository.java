package com.digitazon.Villacastellaccia.models.repositories;

import com.digitazon.Villacastellaccia.models.entities.User;
import com.digitazon.Villacastellaccia.models.entities.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Integer> {
    List<Visit> findVisitByDateGreaterThanEqualOrderByDateAsc(LocalDateTime today);
    List<Visit> findVisitByOrderByDateAsc();
    List<Visit> findVisitByDateOrderByDateAsc(LocalDateTime date);
    List<Visit> findVisitByDateGreaterThanEqualAndDateLessThanEqual(LocalDateTime firstDate, LocalDateTime secondDate);
    List<Visit> findVisitByPlannerAndDateGreaterThanEqualAndDateLessThanEqual(User planner, LocalDateTime firstDate, LocalDateTime secondDate);
    List<Visit> findVisitByPlanner(User user);
    List<Visit> findVisitByUser(User user);
    List<Visit> findVisitByPlannerAndDateGreaterThanEqualOrderByDateAsc(User user, LocalDateTime today);
    List<Visit> findVisitByUserAndDateGreaterThanEqualOrderByDateAsc(User user, LocalDateTime today);
    List<Visit> findVisitByPlannerOrderByDateAsc(User planner);
}
