package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.services.AdminDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AdminController {

    @Autowired
    private AdminDetailsService adminDetailsService;

    @GetMapping("customer/makebooking/services")
    public ResponseEntity<?> getAllServices() {
        return new ResponseEntity<>(adminDetailsService.getAllServices(), HttpStatus.OK);
    }
}
