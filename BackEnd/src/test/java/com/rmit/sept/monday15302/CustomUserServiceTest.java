package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.UserRepository;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.services.CustomUserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CustomUserServiceTest {
    @Autowired
    private CustomUserService customUserService;

    @MockBean
    private UserRepository userRepository;

    private static User user = new User();
    private static String username = "customer";
    private static String userId = "c1";

    @Test(expected = UsernameNotFoundException.class)
    public void loadUserByUsername_throwException_ifUserNotFound() throws UsernameNotFoundException {
        Mockito.when(userRepository.findByUserName(username)).thenReturn(null);
        customUserService.loadUserByUsername(username);
    }

    @Test(expected = UsernameNotFoundException.class)
    public void loadUserById_throwException_ifUserNotFound() throws UsernameNotFoundException {
        Mockito.when(userRepository.getUserById(userId)).thenReturn(null);
        customUserService.loadUserById(userId);
    }

    @Test
    public void loadUserByUsername_returnUser_ifUserFound() {
        Mockito.when(userRepository.findByUserName(username)).thenReturn(user);
        assert(customUserService.loadUserByUsername(username) != null);
    }

    @Test
    public void loadUserById_returnUser_ifUserFound() {
        Mockito.when(userRepository.getUserById(userId)).thenReturn(user);
        assert(customUserService.loadUserById(userId) != null);
    }
}
