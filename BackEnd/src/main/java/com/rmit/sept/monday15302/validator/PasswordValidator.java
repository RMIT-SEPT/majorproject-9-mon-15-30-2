package com.rmit.sept.monday15302.validator;

import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.utils.Request.UpdatePassword;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class PasswordValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return UpdatePassword.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        UpdatePassword passwordRequest = (UpdatePassword) object;

        String oldPassword = passwordRequest.getOldPassword();
        String newPassword = passwordRequest.getNewPassword();
        String confirmPassword = passwordRequest.getConfirmPassword();

        if(oldPassword.length() < 6 || newPassword.length() < 6) {
            throw new UserException("Password must be at least 6 characters");
        }

        if(!newPassword.equals(confirmPassword)){
            throw new UserException("Confirmed password must match");
        }

        //confirmPassword

    }
}
