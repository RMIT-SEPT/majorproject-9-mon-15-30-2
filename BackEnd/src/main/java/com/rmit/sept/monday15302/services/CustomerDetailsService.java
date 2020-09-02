package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.CustomerDetailsRepository;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.model.CustomerDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerDetailsService {
    @Autowired
    private CustomerDetailsRepository customerDetailsRepository;

    public List<CustomerDetails> getAllCustomers() {
        return customerDetailsRepository.findAll();
    }

    public CustomerDetails getCustomerById(String id) {
        CustomerDetails customer = customerDetailsRepository.findByCustomerId(id);
        if(customer == null) {
            throw new BookingException("Customer not found");
        }
        return customer;
    }
}
