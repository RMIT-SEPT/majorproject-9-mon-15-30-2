package com.rmit.sept.monday15302.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AdminDetailsException extends RuntimeException {

    public AdminDetailsException(String message) {
        super(message);
    }
}

