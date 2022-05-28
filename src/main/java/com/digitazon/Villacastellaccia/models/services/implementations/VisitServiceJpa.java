package com.digitazon.Villacastellaccia.models.services.implementations;

import com.digitazon.Villacastellaccia.models.entities.User;
import com.digitazon.Villacastellaccia.models.entities.Visit;
import com.digitazon.Villacastellaccia.models.exceptions.UserNotFoundException;
import com.digitazon.Villacastellaccia.models.exceptions.VisitNotFoundException;
import com.digitazon.Villacastellaccia.models.repositories.UserRepository;
import com.digitazon.Villacastellaccia.models.repositories.VisitRepository;
import com.digitazon.Villacastellaccia.models.services.abstractions.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class VisitServiceJpa implements VisitService {

    @Autowired
    private VisitRepository visitRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Visit> findAllVisits() {
        return visitRepository.findVisitByOrderByDateAsc();
    }

    @Override
    public List<Visit> findNextVisits() {
        return visitRepository.findVisitByDateGreaterThanEqualOrderByDateAsc(LocalDateTime.now());
    }

    @Override
    public List<Visit> findVisitByDate(LocalDateTime date) {
        return visitRepository.findVisitByDateOrderByDateAsc(date);
    }

    @Override
    public List<Visit> findVisitByDateRange(LocalDateTime firstDate, LocalDateTime secondDate) {
        return visitRepository.findVisitByDateGreaterThanEqualAndDateLessThanEqual(firstDate, secondDate);
    }

    @Override
    public List<Visit> findNextVisitsByUser(int id) throws UserNotFoundException {
        Optional<User> foundedUser = userRepository.findById(id);
        if (foundedUser.isEmpty()) {
            throw new UserNotFoundException("L'utente con id " + id + " non esiste.");
        } else {
            return visitRepository.findVisitByUserAndDateGreaterThanEqualOrderByDateAsc(foundedUser.get(),
                    LocalDateTime.now());
        }
    }

    @Override
    public List<Visit> findVisitsByPlannerAndDate(int plannerId, LocalDateTime startVisitDay) throws UserNotFoundException {
        Optional<User> foundedPlanner = userRepository.findById(plannerId);
        if (foundedPlanner.isEmpty()) {
            throw new UserNotFoundException("L'organizzatore con id " + plannerId + " non esiste");
        } else {
            LocalDateTime endDate = startVisitDay.plusHours(23);
            return visitRepository
                    .findVisitByPlannerAndDateGreaterThanEqualAndDateLessThanEqual(foundedPlanner.get(),
                            startVisitDay, endDate);
        }
    }


    @Override
    public Visit addNewVisit(Visit visit) throws UserNotFoundException {
        Optional<User> planner = userRepository.findById(visit.getPlanner().getId());
        if (planner.isPresent()) {
            visit.setPlanner(planner.get());
            visitRepository.save(visit);
            return visit;
        } else {
            throw new UserNotFoundException("L'organizzatore con id " + visit.getPlanner().getId() + " non esiste");
        }

    }

    @Override
    public Visit deleteVisit(int id) throws VisitNotFoundException {
        Optional<Visit> foundedVisit = visitRepository.findById(id);
        if (foundedVisit.isEmpty()) {
            throw new VisitNotFoundException("La visita con id " + id + "non esiste quindi non può essere eliminata");
        } else {
            visitRepository.delete(foundedVisit.get());
            return foundedVisit.get();
        }
    }

    @Override
    public List<Visit> findPlannerNextVisits(int plannerId) throws UserNotFoundException {
        Optional<User> foundedPlanner = userRepository.findById(plannerId);
        if (foundedPlanner.isEmpty()) {
            throw new UserNotFoundException("L'organizzatore con id " + plannerId +
                    " non esiste quindi non è possibile ricercare le sue visite");
        } else {
            List<Visit> plannerNextVisits = visitRepository
                    .findVisitByPlannerAndDateGreaterThanEqualOrderByDateAsc(foundedPlanner.get(), LocalDateTime.now());
            return plannerNextVisits;
        }
    }

    @Override
    public List<Visit> findAllVisitsByPlanner(int plannerId) throws UserNotFoundException {
        Optional<User> foundedPlanner = userRepository.findById(plannerId);
        if (foundedPlanner.isEmpty()) {
            throw new UserNotFoundException("L'organizzatore con id " + plannerId +
                    " non esiste quindi non è possibile ricercare le sue visite");
        } else {
            List<Visit> plannerAllVisit = visitRepository.findVisitByPlannerOrderByDateAsc(foundedPlanner.get());
            return plannerAllVisit;
        }
    }

    @Override
    public List<Visit> findVisitByPlannerAndDateRange(int plannerId, LocalDateTime firstDate, LocalDateTime secondDate) throws UserNotFoundException {
        Optional<User> foundedPlanner = userRepository.findById(plannerId);
        if (foundedPlanner.isEmpty()) {
            throw new UserNotFoundException("L'organizzatore con id " + plannerId +
                    " non esiste quindi non è possibile ricercare le sue visite");
        } else {
            return visitRepository.findVisitByPlannerAndDateGreaterThanEqualAndDateLessThanEqual(foundedPlanner.get(),
                    firstDate, secondDate);
        }
    }
}
