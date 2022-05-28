package com.digitazon.Villacastellaccia.models.services.implementations;

import com.digitazon.Villacastellaccia.models.entities.Event;
import com.digitazon.Villacastellaccia.models.entities.Profile;
import com.digitazon.Villacastellaccia.models.entities.User;
import com.digitazon.Villacastellaccia.models.exceptions.EventNotFoundException;
import com.digitazon.Villacastellaccia.models.exceptions.InvalidEventException;
import com.digitazon.Villacastellaccia.models.exceptions.UserNotFoundException;
import com.digitazon.Villacastellaccia.models.repositories.EventRepository;
import com.digitazon.Villacastellaccia.models.repositories.ProfileRepository;
import com.digitazon.Villacastellaccia.models.repositories.UserRepository;
import com.digitazon.Villacastellaccia.models.services.abstractions.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceJpa implements EventService {

    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private ProfileRepository profileRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Event> findAllEvents() {
        return eventRepository.findEventByOrderByDateAsc();
    }

    @Override
    public List<Event> findNextEvents() {
        List<Event> events = eventRepository.findEventByDateGreaterThanEqualOrderByDateAsc(LocalDateTime.now());
        return events;
    }

    @Override
    public List<Event> findEventByDate(LocalDateTime date) {
        return eventRepository.findEventByDateOrderByDateAsc(date);
    }

    @Override
    public List<Event> findEventByDateRange(LocalDateTime firstDate, LocalDateTime secondDate) {
        return eventRepository.findEventByDateGreaterThanEqualAndDateLessThanEqual(firstDate, secondDate);
    }

    @Override
    public Event findEventById(int id) throws EventNotFoundException {
        Optional<Event> foundEvent = eventRepository.findById(id);
        if (foundEvent.isEmpty()) {
            throw new EventNotFoundException("L'evento con id " + id + " non esiste quindi non può essere modificato");
        } else {
            return foundEvent.get();
        }
    }

    @Override
    public Event modifyEvent(Event event) throws InvalidEventException, EventNotFoundException {
        Optional<Event> foundedEvent = eventRepository.findById(event.getId());
        Optional<Profile> foundedProfile = profileRepository.findById(event.getProfile().getId());
        if (foundedEvent.isPresent()) {
            if (foundedProfile.isEmpty()) {
                throw new InvalidEventException("Un evento deve avere per forza un profilo associato. L'evento con id "
                        + event.getId() + " non possiede un profilo associato");
            } else {
                profileRepository.save(event.getProfile());
                eventRepository.save(event);
                return event;
            }
        } else {
            throw new EventNotFoundException("Non esiste un evento con id " + event.getId()
                    + " quindi non è possibile salvare la modifica.");
        }
    }

    @Override
    public List<Event> findEventByUser(int userId) throws EventNotFoundException, UserNotFoundException {
        Optional<User> foundedUser = userRepository.findById(userId);
        if (foundedUser.isEmpty()) {
            throw new UserNotFoundException("L'utente con id " + userId + " non esiste quindi non è possibile cercare" +
                    " eventi a suo nome");
        } else {
            List<Profile> userProfiles = profileRepository.findProfileByUser(foundedUser.get());
            List<Event> userEvents = new ArrayList<Event>();
            if (userProfiles.size() > 0) {
                for (Profile userProfile : userProfiles) {
                    Optional<Event> foundedEvent = eventRepository
                            .findEventByProfileAndDateGreaterThanEqualOrderByDateAsc(userProfile, LocalDateTime.now());
                    if (foundedEvent.isEmpty()) {
                        throw new EventNotFoundException("L'evento con profilo id " + userProfile.getId() + " non esiste");
                    } else {
                        userEvents.add(foundedEvent.get());
                    }
                }
            }
            return userEvents;
        }
    }

    @Override
    public List<Event> findAllEventByPlanner(int plannerId) throws UserNotFoundException {
        Optional<User> foundedPlanner = userRepository.findById(plannerId);
        if (foundedPlanner.isEmpty()) {
            throw new UserNotFoundException("L'organizzatore con id " + plannerId
                    + " non esiste quindi non posso ricercare gli eventi.");
        } else {
            return eventRepository.getAllPlannerEvents(plannerId);
        }

    }

    @Override
    public List<Event> findNextEventByPlanner(int plannerId) throws UserNotFoundException {
        Optional<User> foundedPlanner = userRepository.findById(plannerId);
        if (foundedPlanner.isEmpty()) {
            throw new UserNotFoundException("L'organizzatore con id " + plannerId
                    + " non esiste quindi non posso ricercare gli eventi.");
        } else {
            return eventRepository.getNextPlannerEvents(plannerId, LocalDateTime.now());
        }
    }

    @Override
    public List<Event> findByPlannerAndDate(int plannerId, LocalDateTime date) throws UserNotFoundException {
        Optional<User> foundedPlanner = userRepository.findById(plannerId);
        if (foundedPlanner.isEmpty()) {
            throw new UserNotFoundException("L'organizzatore con id " + plannerId
                    + " non esiste quindi non posso ricercare gli eventi.");
        } else {
            return eventRepository.getPlannerEventsFromDate(plannerId, date);
        }
    }

    @Override
    public List<Event> findByPlannerAndDateRange(int plannerId, LocalDateTime firstDate, LocalDateTime secondDate)
            throws UserNotFoundException {
        Optional<User> foundedPlanner = userRepository.findById(plannerId);
        if (foundedPlanner.isEmpty()) {
            throw new UserNotFoundException("L'organizzatore con id " + plannerId
                    + " non esiste quindi non posso ricercare gli eventi.");
        } else {
            return eventRepository.getPlannerEventsFromDateRange(plannerId, firstDate, secondDate);
        }
    }

    @Override
    public Event addNewEvent(Event event) throws UserNotFoundException {
        Optional<User> customer = userRepository.findById(event.getProfile().getUser().getId());
        if (customer.isEmpty()) {
            throw new UserNotFoundException("Il cliente con id " + event.getProfile().getUser().getId() + " non esiste");
        } else {
            event.getProfile().setUser(customer.get());
            Profile savedProfile = profileRepository.save(event.getProfile());
            event.setProfile(savedProfile);
            Event savedEvent = eventRepository.save(event);
            return savedEvent;
        }
    }
}
