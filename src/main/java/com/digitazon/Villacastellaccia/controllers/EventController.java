package com.digitazon.Villacastellaccia.controllers;

import com.digitazon.Villacastellaccia.models.entities.Event;
import com.digitazon.Villacastellaccia.models.exceptions.EventNotFoundException;
import com.digitazon.Villacastellaccia.models.exceptions.InvalidEventException;
import com.digitazon.Villacastellaccia.models.exceptions.UserNotFoundException;
import com.digitazon.Villacastellaccia.models.services.abstractions.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin("*")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity getAllEvents() {
        return ResponseEntity.ok(eventService.findAllEvents());
    }

    @GetMapping("/{id}")
    public ResponseEntity getEventById(@PathVariable int id) {
        try {
            Event event = eventService.findEventById(id);
            return ResponseEntity.ok(event);
        } catch (EventNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/date")
    public ResponseEntity getEventsByDate(@RequestParam String date) {
        LocalDateTime dateTime = LocalDateTime.parse(date);
        return ResponseEntity.ok(eventService.findEventByDate(dateTime));
    }

    @GetMapping("/range")
    public ResponseEntity getVisitsByDateRange(@RequestParam String firstDate,
                                               @RequestParam String secondDate) {
        LocalDateTime firstDateTime = LocalDateTime.parse(firstDate);
        LocalDateTime secondDateTime = LocalDateTime.parse(secondDate);
        return ResponseEntity.ok(eventService.findEventByDateRange(firstDateTime, secondDateTime));
    }

    @GetMapping("/next")
    public ResponseEntity getNextEvent() {
        return ResponseEntity.ok(eventService.findNextEvents());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity getCustomerEvent(@PathVariable int userId) {
        try {
            List<Event> events = eventService.findEventByUser(userId);
            return ResponseEntity.ok(events);
        } catch (EventNotFoundException | UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/nextPlannerEvent")
    public ResponseEntity getNextPlannerEvent(@RequestParam int plannerId) {
        try {
            List<Event> events = eventService.findNextEventByPlanner(plannerId);
            return ResponseEntity.ok(events);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/allPlannerEvent")
    public ResponseEntity getAllPlannerEvents(@RequestParam int plannerId) {
        try {
            List<Event> events = eventService.findAllEventByPlanner(plannerId);
            return ResponseEntity.ok(events);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/plannerEventDate")
    public ResponseEntity getPlannerEventByDate(@RequestParam int plannerId, @RequestParam String date) {
        LocalDateTime dateTime = LocalDateTime.parse(date);
        try {
            return ResponseEntity.ok(eventService.findByPlannerAndDate(plannerId, dateTime));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/plannerEventDateRange")
    public ResponseEntity getPlannerEventByDateRange(@RequestParam int plannerId, @RequestParam String firstDate, @RequestParam String secondDate) {
        LocalDateTime firstDateTime = LocalDateTime.parse(firstDate);
        LocalDateTime secondDateTime = LocalDateTime.parse(secondDate);
        try {
            return ResponseEntity.ok(eventService.findByPlannerAndDateRange(plannerId, firstDateTime, secondDateTime));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity addNewEvent(@RequestBody Event event) {
        try {
            Event savedEvent = eventService.addNewEvent(event);
            return ResponseEntity.ok(savedEvent);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity modifyEvent(@RequestBody Event event) {
        try {
            Event modifiedEvent = eventService.modifyEvent(event);
            return ResponseEntity.ok(modifiedEvent);
        } catch (InvalidEventException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (EventNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
