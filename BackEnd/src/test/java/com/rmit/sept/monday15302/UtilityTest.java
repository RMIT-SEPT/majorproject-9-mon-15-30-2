package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.utils.Utility;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UtilityTest {
    @Autowired
    private Utility utility;

    @Test(expected = UserException.class)
    public void validatePassword_throwException_ifInvalidNewPassword() throws UserException {
        utility.validatePassword("*", "*");
    }

    @Test(expected = UserException.class)
    public void validatePassword_throwException_ifPasswordNotMatch() throws UserException {
        utility.validatePassword("******", "123456");
    }

    @Test
    public void validatePassword_doNothing_ifPasswordValid() throws UserException {
        utility.validatePassword("123456", "123456");
    }
}
