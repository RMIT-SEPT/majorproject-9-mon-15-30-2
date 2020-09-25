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

    public void setId(String id) {
        this.id = id;
    }

    public UserType getRole() {
        return role;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "JWTLoginSuccessResponse{" +
                "success=" + success +
                ", token='" + token + '\'' +
                ", id='" + id + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
