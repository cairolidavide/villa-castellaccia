package com.digitazon.Villacastellaccia.models.services.implementations;

import com.digitazon.Villacastellaccia.models.entities.Event;
import com.digitazon.Villacastellaccia.models.entities.Profile;
import com.digitazon.Villacastellaccia.models.entities.User;
import com.digitazon.Villacastellaccia.models.entities.Visit;
import com.digitazon.Villacastellaccia.models.exceptions.BadEmailException;
import com.digitazon.Villacastellaccia.models.exceptions.InvalidUserException;
import com.digitazon.Villacastellaccia.models.exceptions.UserNotFoundException;
import com.digitazon.Villacastellaccia.models.exceptions.UserNotFreeException;
import com.digitazon.Villacastellaccia.models.repositories.EventRepository;
import com.digitazon.Villacastellaccia.models.repositories.ProfileRepository;
import com.digitazon.Villacastellaccia.models.repositories.UserRepository;
import com.digitazon.Villacastellaccia.models.repositories.VisitRepository;
import com.digitazon.Villacastellaccia.models.services.abstractions.UserService;
import com.digitazon.Villacastellaccia.models.utilities.Utility;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceJpa implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VisitRepository visitRepository;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public List<User> findByUserTypeOrderBySurname(String userType) {
        return userRepository.findByUserType(userType);
    }

    @Override
    public User createNewUser(User user) throws BadEmailException, InvalidUserException {
        Optional<User> foundUser = userRepository.findUserByEmail(user.getEmail());
        if (foundUser.isEmpty()) {
            if (user.getName() != "" && user.getSurname() != "" && user.getEmail() != "" &&
                    user.getPhoneNumber() != "" && user.getPassword() != "" && user.getUserType() != "") {
                if (Utility.isEmailValid(user.getEmail())) {
                    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                    String encodedPassword = passwordEncoder.encode(user.getPassword());
                    User savedUser = new User(0, user.getName(), user.getSurname(), user.getPhoneNumber(),
                            user.getEmail(), encodedPassword, user.getUserType());
                    return userRepository.save(savedUser);
                } else {
                    throw new BadEmailException("L'email inserita " + user.getEmail() + " non è una email valida");
                }
            } else {
                throw new InvalidUserException("Tutti i campi dell'utente devono essere compilati");
            }
        } else {
            throw new InvalidUserException("L'utente con email " + user.getEmail() + " esiste già");
        }
    }

    @Override
    public User deleteUser(int userId) throws UserNotFoundException, UserNotFreeException {
        Optional<User> foundedUser = userRepository.findById(userId);
        if (foundedUser.isEmpty()) {
            throw new UserNotFoundException("L'utente con id " + userId + " non esiste quindi non può essere eliminato.");
        } else {
            if (Objects.equals(foundedUser.get().getUserType(), "wedding-planner") ||
                    Objects.equals(foundedUser.get().getUserType(), "event-planner")) {
                List<Profile> userProfiles = profileRepository.findProfileByPlanner(foundedUser.get());
                List<Visit> userVisits = visitRepository.findVisitByPlanner(foundedUser.get());
                if (userProfiles.size() > 0) {
                    throw new UserNotFreeException("L'organizzatore con id " + userId +
                            " ha in gestione degli eventi quindi non può essere eliminato");
                } else if (userVisits.size() > 0) {
                    throw new UserNotFreeException("L'organizzatore con id " + userId +
                            " ha in gestione degli appuntamneti quindi non può essere eliminato");
                } else {
                    userRepository.delete(foundedUser.get());
                    return foundedUser.get();
                }
            } else {
                List<Profile> userProfiles = profileRepository.findProfileByUser(foundedUser.get());
                List<Visit> userVisits = visitRepository.findVisitByUser(foundedUser.get());
                if (userProfiles.size() > 0) {
                    throw new UserNotFreeException("Il cliente con id " + userId +
                            " ha in programma degli eventi quindi non può essere eliminato");
                } else if (userVisits.size() > 0) {
                    throw new UserNotFreeException("Il cliente con id " + userId +
                            " ha in programma degli appuntamneti quindi non può essere eliminato");
                } else {
                    userRepository.delete(foundedUser.get());
                    return foundedUser.get();
                }
            }
        }
    }

    @Override
    public User modifyUser(User user) throws UserNotFoundException {
        Optional<User> foundedUser = userRepository.findById(user.getId());
        if (foundedUser.isPresent()) {
            User savedUser;
            if (user.getPassword() == foundedUser.get().getPassword()) {
                 savedUser = new User(user.getId(), user.getName(), user.getSurname(), user.getPhoneNumber(),
                        user.getEmail(), user.getPassword(), user.getUserType());
            } else {
                PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                String encodedPassword = passwordEncoder.encode(user.getPassword());
                savedUser = new User(user.getId(), user.getName(), user.getSurname(), user.getPhoneNumber(),
                        user.getEmail(), encodedPassword, user.getUserType());
            }
            userRepository.save(savedUser);
            return savedUser;
        } else {
            throw new UserNotFoundException("L'utente con id " + user.getId() + " non esiste quindi non può essere modificato");
        }
    }

    @Override
    public List<User> findUserWithEventInNextDay() {
        List<Event> events = eventRepository.findEventByDateGreaterThanEqualOrderByDateAsc(LocalDateTime.now());
        List<User> users = new ArrayList<User>();
        for (Event event : events) {
            if (!users.contains(event.getProfile().getUser())) {
                users.add(event.getProfile().getUser());
            }
        }
        return users;
    }

    @Override
    public List<User> findUserWithVisitInNextDay() {
        List<Visit> visits = visitRepository.findVisitByDateGreaterThanEqualOrderByDateAsc(LocalDateTime.now());
        List<User> users = new ArrayList<User>();
        for (Visit visit : visits) {
            if (!users.contains(visit.getUser())) {
                users.add(visit.getUser());
            }
        }
        return users;
    }
}
