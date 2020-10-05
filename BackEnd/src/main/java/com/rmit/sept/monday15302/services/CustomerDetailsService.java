package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.CustomerDetailsRepository;
import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.utils.Request.EditCustomer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerDetailsService {
    @Autowired
    private CustomerDetailsRepository customerDetailsRepository;

    @Autowired
    private UserService userService;

    public CustomerDetails saveCustomer(CustomerDetails customer) {
        try {
            return customerDetailsRepository.save(customer);
        } catch(UserException e) {
            throw new UserException("Cannot save new customer");
        }
    }

    public CustomerDetails getCustomerById(String id) {
        CustomerDetails customer = customerDetailsRepository.getCustomerById(id);
        if(customer == null) {
            throw new UserException("No customer with id " + id + " found");
        }
        return customer;
    }

    public EditCustomer getCustomerProfile(String id) {
        CustomerDetails customer = getCustomerById(id);
        String username = userService.getUserById(id).getUsername();
        return new EditCustomer(username, customer.getfName(), customer.getlName(),
                customer.getEmail(), customer.getAddress(), customer.getPhoneNumber());
    }

    public EditCustomer updateCustomer(EditCustomer customer, String id) {
        String username = customer.getUsername();
        if(userService.existsByUsername(username)
                && !username.equals(userService.getUserById(id).getUsername())) {
            throw new UserException("Error: Username is already taken!");
        }

        CustomerDetails newCustomer = customerDetailsRepository.getCustomerById(id);
        User user = userService.getUserById(id);
        if(newCustomer == null || user == null) {
            throw new UserException("Customer with id '"+id+"' not found");
        }

        user.setUserName(username);
        User newUser = userService.saveUser(user);

        newCustomer.setfName(customer.getfName());
        newCustomer.setlName(customer.getlName());
        newCustomer.setPhoneNumber(customer.getPhoneNumber());
        newCustomer.setEmail(customer.getEmail());
        newCustomer.setAddress(customer.getAddress());

        CustomerDetails updatedCustomer = customerDetailsRepository.save(newCustomer);
        return new EditCustomer(newUser.getUsername(), updatedCustomer.getfName(),
                updatedCustomer.getlName(), updatedCustomer.getEmail(),
                updatedCustomer.getAddress(), updatedCustomer.getPhoneNumber());
    }
}
