package com.rmit.sept.monday15302.validator;

import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.utils.Request.CustomerSignup;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        CustomerSignup customer = (CustomerSignup) object;

        if(customer.getPassword().length() < 6){
            errors.rejectValue("password","Length",
                    "Password must be at least 6 characters");
        }

        if(!customer.getPassword().equals(customer.getConfirmPassword())){
            errors.rejectValue("confirmPassword","Match",
                    "Passwords must match");

        }

        //confirmPassword

    }
}
