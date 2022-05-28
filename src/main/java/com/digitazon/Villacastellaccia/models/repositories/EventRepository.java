package com.digitazon.Villacastellaccia.models.repositories;

import com.digitazon.Villacastellaccia.models.entities.Event;
import com.digitazon.Villacastellaccia.models.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<Event, Integer> {
    List<Event> findEventByDateGreaterThanEqualOrderByDateAsc(LocalDateTime today);
    List<Event> findEventByOrderByDateAsc();
    List<Event> findEventByDateOrderByDateAsc(LocalDateTime date);
    List<Event> findEventByDateGreaterThanEqualAndDateLessThanEqual(LocalDateTime firstDate, LocalDateTime secondDate);
    Optional<Event> findEventByProfileAndDateGreaterThanEqualOrderByDateAsc(Profile profile, LocalDateTime today);
    @Query("Select e from Event e LEFT JOIN e.profile p where p.planner.id = :plannerId and e.date >= :today order by e.date asc")
    List<Event> getNextPlannerEvents(int plannerId, LocalDateTime today);
    @Query("Select e from Event e LEFT JOIN e.profile p where p.planner.id = :plannerId order by e.date asc")
    List<Event> getAllPlannerEvents(int plannerId);
    @Query("Select e from Event e LEFT JOIN e.profile p where p.planner.id = :plannerId and e.date = :date order by e.date asc")
    List<Event> getPlannerEventsFromDate(int plannerId, LocalDateTime date);
    @Query("Select e from Event e LEFT JOIN e.profile p where p.planner.id = :plannerId and e.date >= :firstDate and e.date <= :secondDate order by e.date asc")
    List<Event> getPlannerEventsFromDateRange(int plannerId, LocalDateTime firstDate, LocalDateTime secondDate);

}
