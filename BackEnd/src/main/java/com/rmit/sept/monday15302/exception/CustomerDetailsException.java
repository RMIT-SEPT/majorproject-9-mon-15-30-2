package com.rmit.sept.monday15302.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CustomerDetailsException extends RuntimeException {

    public CustomerDetailsException(String message) {
        super(message);
    }
}
