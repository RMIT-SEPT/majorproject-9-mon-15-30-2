package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.CustomerDetailsRepository;
import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.model.CustomerDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerDetailsService {
    @Autowired
    private CustomerDetailsRepository customerDetailsRepository;

    public CustomerDetails saveCustomer(CustomerDetails customer) {
        try {
            return customerDetailsRepository.save(customer);
        } catch(UserException e) {
            throw new UserException("Cannot save new customer");
        }
    }

}
