package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.utils.Request.UpdatePassword;
import com.rmit.sept.monday15302.validator.PasswordValidator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.validation.BeanPropertyBindingResult;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PasswordValidatorTest {
    @Autowired
    private PasswordValidator passwordValidator;

    private static UpdatePassword passwordRequest = new UpdatePassword("123456",
            "******", "******");

    @Test(expected = UserException.class)
    public void changePassword_throwException_IfOldPasswordInvalid() throws UserException {
        BeanPropertyBindingResult errors = new BeanPropertyBindingResult(passwordRequest, "passwordRequest");
        passwordRequest.setOldPassword("*");
        passwordValidator.validate(passwordRequest, errors);
    }

    @Test(expected = UserException.class)
    public void changePassword_throwException_IfNewPasswordInvalid() throws UserException {
        BeanPropertyBindingResult errors = new BeanPropertyBindingResult(passwordRequest, "passwordRequest");
        passwordRequest.setNewPassword("*");
        passwordValidator.validate(passwordRequest, errors);
    }

    @Test(expected = UserException.class)
    public void changePassword_throwException_PasswordNotMatch() throws UserException {
        BeanPropertyBindingResult errors = new BeanPropertyBindingResult(passwordRequest, "passwordRequest");
        passwordRequest.setNewPassword("123456");
        passwordValidator.validate(passwordRequest, errors);
    }

    @Test
    public void support_returnTrue_ifClassMatched() {
        assert(passwordValidator.supports(UpdatePassword.class));
    }

    @Test
    public void changePassword_doNothing_ifPasswordValid() throws UserException {
        BeanPropertyBindingResult errors = new BeanPropertyBindingResult(passwordRequest, "passwordRequest");
        passwordValidator.validate(passwordRequest, errors);
    }
}
