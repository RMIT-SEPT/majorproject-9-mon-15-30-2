package com.rmit.sept.monday15302.model;

public enum Confirmation {
    PENDING("Pending"),
    CONFIRMED("Confirmed"),
    CANCELLED("Cancelled");

    private final String label;

    Confirmation(String label) {
        this.label = label;
    }

    public String getLabel() {
        return this.label;
    }
}
