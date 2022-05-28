package com.digitazon.Villacastellaccia.models.utilities.security.auth;

import com.digitazon.Villacastellaccia.models.entities.User;

public class AuthResponse {

    private User user;
    private String accessToken;

    public AuthResponse(User user) {
        this.user = user;
    }

    public AuthResponse(User user, String accessToken) {
        this.user = user;
        this.accessToken = accessToken;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
