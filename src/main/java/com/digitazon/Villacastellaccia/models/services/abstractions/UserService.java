package com.digitazon.Villacastellaccia.models.services.abstractions;

import com.digitazon.Villacastellaccia.models.entities.User;
import com.digitazon.Villacastellaccia.models.exceptions.BadEmailException;
import com.digitazon.Villacastellaccia.models.exceptions.InvalidUserException;
import com.digitazon.Villacastellaccia.models.exceptions.UserNotFoundException;
import com.digitazon.Villacastellaccia.models.exceptions.UserNotFreeException;

import java.util.List;

public interface UserService {
    List<User> findByUserTypeOrderBySurname(String userType);
    User createNewUser(User user) throws BadEmailException, InvalidUserException;
    User deleteUser(int userId) throws UserNotFoundException, UserNotFreeException;
    User modifyUser(User user) throws UserNotFoundException;
    List<User> findUserWithEventInNextDay();
    List<User> findUserWithVisitInNextDay();
}
