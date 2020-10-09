package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.utils.Request.CustomerSignup;
import com.rmit.sept.monday15302.validator.UserValidator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.validation.BeanPropertyBindingResult;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserValidatorTest {
    @Autowired
    private UserValidator userValidator;

    @Test(expected = UserException.class)
    public void createAccount_throwException_PasswordInvalid() throws UserException {
        CustomerSignup user = new CustomerSignup();
        BeanPropertyBindingResult errors = new BeanPropertyBindingResult(user, "user");
        user.setPassword("*");
        userValidator.validate(user, errors);
    }

    @Test(expected = UserException.class)
    public void createAccount_throwException_PasswordNotMatch() throws UserException {
        CustomerSignup user = new CustomerSignup();
        BeanPropertyBindingResult errors = new BeanPropertyBindingResult(user, "user");
        user.setPassword("******");
        user.setConfirmPassword("123456");
        userValidator.validate(user, errors);
    }

    @Test
    public void changePassword_doNothing_ifPasswordValid() throws UserException {
        CustomerSignup user = new CustomerSignup();
        BeanPropertyBindingResult errors = new BeanPropertyBindingResult(user, "user");
        user.setPassword("123456");
        user.setConfirmPassword("123456");
        userValidator.validate(user, errors);
    }

    @Test
    public void support_returnTrue_ifClassMatched() {
        assert(userValidator.supports(CustomerSignup.class));
    }
}
