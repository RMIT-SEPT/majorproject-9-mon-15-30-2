package com.rmit.sept.monday15302.model;

public enum BookingStatus {
    PAST_BOOKING("Past"),
    NEW_BOOKING("New"),
    CANCELLED_BOOKING("Cancelled");

    private final String label;

    BookingStatus(String label) {
        this.label = label;
    }

    public String getLabel() {
        return this.label;
    }
}
