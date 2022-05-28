package com.digitazon.Villacastellaccia.models.exceptions;

import com.digitazon.Villacastellaccia.models.entities.User;

public class UserNotFoundException extends Exception {
    public UserNotFoundException(String message) {
        super(message);
    }
}
