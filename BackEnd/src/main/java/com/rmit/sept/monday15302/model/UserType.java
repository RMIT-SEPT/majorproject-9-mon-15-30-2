package com.rmit.sept.monday15302.model;

public enum UserType {
    ROLE_ADMIN("Admin"),
    ROLE_CUSTOMER("Customer"),
    ROLE_WORKER("Worker");

    private final String label;

    UserType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return this.label;
    }
}
