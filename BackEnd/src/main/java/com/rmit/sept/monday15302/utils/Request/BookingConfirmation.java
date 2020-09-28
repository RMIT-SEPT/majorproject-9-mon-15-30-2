package com.rmit.sept.monday15302.utils.Request;

import com.rmit.sept.monday15302.model.BookingStatus;
import com.rmit.sept.monday15302.model.Confirmation;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

public class BookingConfirmation {
    @NotNull
    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Confirmation confirmation;

    public BookingConfirmation(BookingStatus status, Confirmation confirm) {
        this.status = status;
        this.confirmation = confirm;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public Confirmation getConfirmation() {
        return confirmation;
    }

    public void setConfirmation(Confirmation confirm) {
        this.confirmation = confirm;
    }
}
