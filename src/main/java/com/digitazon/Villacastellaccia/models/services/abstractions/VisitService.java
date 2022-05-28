package com.digitazon.Villacastellaccia.models.services.abstractions;

import com.digitazon.Villacastellaccia.models.entities.Visit;
import com.digitazon.Villacastellaccia.models.exceptions.UserNotFoundException;
import com.digitazon.Villacastellaccia.models.exceptions.VisitNotFoundException;

import java.time.LocalDateTime;
import java.util.List;

public interface VisitService {
    List<Visit> findAllVisits();
    List<Visit> findNextVisits();
    List<Visit> findVisitByDate(LocalDateTime date);
    List<Visit> findVisitByDateRange(LocalDateTime firstDate, LocalDateTime secondDate);
    List<Visit> findNextVisitsByUser(int id) throws UserNotFoundException;
    List<Visit> findVisitsByPlannerAndDate(int plannerId, LocalDateTime startVisitDay) throws UserNotFoundException;
    Visit addNewVisit(Visit visit) throws UserNotFoundException;
    Visit deleteVisit(int id) throws VisitNotFoundException;
    List<Visit> findPlannerNextVisits(int plannerId) throws UserNotFoundException;
    List<Visit> findAllVisitsByPlanner(int plannerId) throws UserNotFoundException;
    List<Visit> findVisitByPlannerAndDateRange(int plannerId, LocalDateTime firstDate, LocalDateTime secondDate) throws UserNotFoundException;
}
