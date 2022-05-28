package com.digitazon.Villacastellaccia.controllers;

import com.digitazon.Villacastellaccia.models.entities.Visit;
import com.digitazon.Villacastellaccia.models.exceptions.UserNotFoundException;
import com.digitazon.Villacastellaccia.models.exceptions.VisitNotFoundException;
import com.digitazon.Villacastellaccia.models.services.abstractions.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/visits")
@CrossOrigin("*")
public class VisitController {

    @Autowired
    private VisitService visitService;

    @GetMapping
    public ResponseEntity getAllVisits() {
        return ResponseEntity.ok(visitService.findAllVisits());
    }

    @GetMapping("/date")
    public ResponseEntity getVisitsByDate(@RequestParam String date) {
        LocalDateTime dateTime = LocalDateTime.parse(date);
        return ResponseEntity.ok(visitService.findVisitByDate(dateTime));
    }

    @GetMapping("/range")
    public ResponseEntity getVisitsByDateRange(@RequestParam String firstDate,
                                               @RequestParam String secondDate) {
        LocalDateTime firstDateTime = LocalDateTime.parse(firstDate);
        LocalDateTime secondDateTime = LocalDateTime.parse(secondDate);
        return ResponseEntity.ok(visitService.findVisitByDateRange(firstDateTime, secondDateTime));
    }

    @GetMapping("/next")
    public ResponseEntity getNextVisits() {
        return ResponseEntity.ok(visitService.findNextVisits());
    }

    @GetMapping("/nextVisit")
    public ResponseEntity getNextVisitsByUser(@RequestParam int userId) {
        try {
            List<Visit> nextVisits = visitService.findNextVisitsByUser(userId);
            return ResponseEntity.ok(nextVisits);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/plannerNextVisit")
    public ResponseEntity findPlannerNextVisits(@RequestParam int plannerId) {
        try {
            List<Visit> plannerVisits = visitService.findPlannerNextVisits(plannerId);
            return ResponseEntity.ok(plannerVisits);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/plannerAllVisit")
    public ResponseEntity findAllPlannerVisits(@RequestParam int plannerId) {
        try {
            List<Visit> allPlannerVisits = visitService.findAllVisitsByPlanner(plannerId);
            return ResponseEntity.ok(allPlannerVisits);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/plannerVisits")
    public ResponseEntity getPlannerDayVisit(@RequestParam int plannerId,
                                             @RequestParam String date) {
        LocalDateTime startDate = LocalDateTime.parse(date + "T00:00");
        try {
            List<Visit> plannerList = visitService.findVisitsByPlannerAndDate(plannerId, startDate);
            return ResponseEntity.ok(plannerList);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/rangePlannerVisit")
    public ResponseEntity getPlannerVisitsByRange(@RequestParam int plannerId,
                                                  @RequestParam String firstDate,
                                                  @RequestParam String secondDate) {
        LocalDateTime firstDateTime = LocalDateTime.parse(firstDate);
        LocalDateTime secondDateTime = LocalDateTime.parse(secondDate);
        try {
            List<Visit> plannerVisits = visitService.findVisitByPlannerAndDateRange(plannerId, firstDateTime, secondDateTime);
            return ResponseEntity.ok(plannerVisits);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND). body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity addNewVisit(@RequestBody Visit visit) {
        try {
            Visit savedVisit = visitService.addNewVisit(visit);
            return ResponseEntity.ok(savedVisit);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity deleteVisit(@RequestParam int visitId) {
        try {
            Visit deletedVisit = visitService.deleteVisit(visitId);
            return ResponseEntity.ok(deletedVisit);
        } catch (VisitNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
