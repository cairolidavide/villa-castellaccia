package com.digitazon.Villacastellaccia.models.services.abstractions;

import com.digitazon.Villacastellaccia.models.entities.Event;
import com.digitazon.Villacastellaccia.models.exceptions.EventNotFoundException;
import com.digitazon.Villacastellaccia.models.exceptions.InvalidEventException;
import com.digitazon.Villacastellaccia.models.exceptions.UserNotFoundException;

import java.time.LocalDateTime;
import java.util.List;

public interface EventService {
    List<Event> findAllEvents();
    List<Event> findNextEvents();
    List<Event> findEventByDate(LocalDateTime date);
    List<Event> findEventByDateRange(LocalDateTime firstDate, LocalDateTime secondDate);
    Event findEventById(int id) throws EventNotFoundException;
    Event modifyEvent(Event event) throws InvalidEventException, EventNotFoundException;
    List<Event> findEventByUser(int userId) throws EventNotFoundException, UserNotFoundException;
    List<Event> findAllEventByPlanner(int plannerId) throws UserNotFoundException;
    List<Event> findNextEventByPlanner(int plannerId) throws UserNotFoundException;
    List<Event> findByPlannerAndDate(int planner, LocalDateTime date) throws UserNotFoundException;
    List<Event> findByPlannerAndDateRange(int planner, LocalDateTime firstDate, LocalDateTime secondDate) throws UserNotFoundException;
    Event addNewEvent(Event event) throws UserNotFoundException;
}
