package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.services.CustomerDetailsService;
import com.rmit.sept.monday15302.utils.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CustomerController {
    @Autowired
    private CustomerDetailsService customerDetailsService;

    @Autowired
    private Utility utility;

    @GetMapping(value="/customer/profile/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCustomerById(@PathVariable("id") String id) {
        if(utility.isCurrentLoggedInUser(id)) {
            return new ResponseEntity<>(customerDetailsService.getCustomerById(id), HttpStatus.OK);
        }
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
}
