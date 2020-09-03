package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.services.CustomerDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CustomerController {
    @Autowired
    CustomerDetailsService customerDetailsService;

    @GetMapping(value="customers", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllCustomers() {
        return new ResponseEntity<List<CustomerDetails>>(customerDetailsService.getAllCustomers(), HttpStatus.OK);
    }

    @GetMapping(value="customer/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCustomerById(@PathVariable("id") String id) {
        return new ResponseEntity<CustomerDetails>(customerDetailsService.getCustomerById(id), HttpStatus.OK);
    }
}
