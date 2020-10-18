package com.rmit.sept.monday15302.utils.Response;

import com.rmit.sept.monday15302.model.UserType;

public class JWTLoginSuccessResponse {

    private boolean success;
    private String token;
    private String id;
    private UserType role;

    public JWTLoginSuccessResponse(boolean success, String token, String id, UserType role) {
        this.success = success;
        this.token = token;
        this.id = id;
        this.role = role;
    }

    public String getId() {
        return id;
    }

    public UserType getRole() {
        return role;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getToken() {
        return token;
    }

}
