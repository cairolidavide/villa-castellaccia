package com.digitazon.Villacastellaccia.controllers;

import com.digitazon.Villacastellaccia.models.entities.User;
import com.digitazon.Villacastellaccia.models.exceptions.BadEmailException;
import com.digitazon.Villacastellaccia.models.exceptions.InvalidUserException;
import com.digitazon.Villacastellaccia.models.exceptions.UserNotFoundException;
import com.digitazon.Villacastellaccia.models.exceptions.UserNotFreeException;
import com.digitazon.Villacastellaccia.models.repositories.UserRepository;
import com.digitazon.Villacastellaccia.models.services.abstractions.UserService;
import com.digitazon.Villacastellaccia.models.utilities.security.auth.AuthRequest;
import com.digitazon.Villacastellaccia.models.utilities.security.auth.AuthResponse;
import com.digitazon.Villacastellaccia.models.utilities.security.auth.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public ResponseEntity getUserByEmailAndPassword(@RequestBody AuthRequest request) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            User user = (User) authentication.getPrincipal();
            String accessToken = jwtTokenUtil.generateAccessToke(user);
            AuthResponse response = new AuthResponse(user, accessToken);
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping
    public ResponseEntity getUserByUserType(@RequestParam String userType) {
        List<User> users = userService.findByUserTypeOrderBySurname(userType);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/eventsUsers")
    public ResponseEntity getUsersOfNextEvents() {
        List<User> users = userService.findUserWithEventInNextDay();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/visitsUsers")
    public ResponseEntity getUsersOfNextVisits() {
        List<User> users = userService.findUserWithVisitInNextDay();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/newUser")
    public ResponseEntity addNewUser(@RequestBody User user) {
        try {
            User receivedUser = userService.createNewUser(user);
            return ResponseEntity.ok(receivedUser);
        } catch (BadEmailException | InvalidUserException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity modifyUser(@RequestBody User user) {
        try {
            User modifiedUser = userService.modifyUser(user);
            return ResponseEntity.ok(modifiedUser);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity deleteUser(@RequestParam int id) {
        try {
            User deletedUser = userService.deleteUser(id);
            return ResponseEntity.ok(deletedUser);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (UserNotFreeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
