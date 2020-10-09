package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.services.CustomerDetailsService;
import com.rmit.sept.monday15302.services.MapValidationErrorService;
import com.rmit.sept.monday15302.services.UserService;
import com.rmit.sept.monday15302.utils.Request.EditCustomer;
import com.rmit.sept.monday15302.utils.Request.UpdatePassword;
import com.rmit.sept.monday15302.utils.Utility;
import com.rmit.sept.monday15302.validator.PasswordValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CustomerController {
    @Autowired
    private CustomerDetailsService customerDetailsService;

    @Autowired
    private Utility utility;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private PasswordValidator passwordValidator;

    @Autowired
    private UserService userService;

    @GetMapping(value="/customer/profile/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCustomerById(@PathVariable("id") String id) {
        if(utility.isCurrentLoggedInUser(id)) {
            return new ResponseEntity<>(customerDetailsService.getCustomerProfile(id), HttpStatus.OK);
        }
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("/customer/editProfile/{id}")
    public ResponseEntity<?> updateCustomer(@PathVariable("id") String id,
                @Valid @RequestBody EditCustomer customer, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        if(utility.isCurrentLoggedInUser(id)) {
            EditCustomer updatedCustomer = customerDetailsService.updateCustomer(customer, id);
            return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);
        }
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("/customer/updatePassword/{id}")
    public ResponseEntity<?> changeCustomerPassword(@PathVariable("id") String id,
                @Valid @RequestBody UpdatePassword passwordRequest, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        passwordValidator.validate(passwordRequest, result);

        if(utility.isCurrentLoggedInUser(id)) {
            return new ResponseEntity<>(userService.changeUserPassword(passwordRequest, id), HttpStatus.OK);
        }

        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
}
