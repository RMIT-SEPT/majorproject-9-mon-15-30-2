package com.rmit.sept.monday15302.model;

public enum UserType {
    ADMIN("Admin"),
    CUSTOMER("Customer"),
    WORKER("Worker");

    private final String label;

    UserType(String label) {
        this.label = label;
    }

    public String getLabel() {
        return this.label;
    }
}
