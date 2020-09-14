package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.UserRepository;
import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.model.UserType;
import com.rmit.sept.monday15302.services.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.times;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {
    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;

    static private User user;
    static private final String username = "admin";
    static private final String userId = "123";

    @Before
    public void setup() {
        user = new User(username, "*", UserType.ADMIN);
        user.setId(userId);

        Mockito.when(userRepository.findByUserName(username)).thenReturn(user);
        Mockito.when(userRepository.getUserById(userId)).thenReturn(user);
    }

    @Test
    public void existsByUsername_returnTrue_ifUserExists() {
        assert(userService.existsByUsername(username));
    }

    @Test
    public void existsByUsername_returnFalse_ifUserNotExists() {
        assert(!userService.existsByUsername("worker"));
    }

    @Test
    public void createUser_returnTrue_ifUserAdded() {
        User user = new User(username, "*", UserType.CUSTOMER);
        userService.saveUser(user);
        Mockito.verify(userRepository,
                times(1)).save(user);
    }

    @Test
    public void testDeleteUserById() {
        Mockito.when(userRepository.getUserById(userId)).thenReturn(user);
        // when
        userService.deleteById(userId);
        // then
        Mockito.verify(userRepository, times(1)).delete(user);
    }

    @Test
    public void getUserByUsername_returnUser_ifUserFound() {
        assert(userService.getUserByUsername(username).equals(user));
    }

    @Test
    public void existsByUsername_returnNull_ifUserNotFound() {
        assert(userService.getUserByUsername("worker") == null);
    }

    @Test
    public void getUserById_returnUser_ifUserFound() {
        assert(userService.getUserById(userId).equals(user));
    }

    @Test(expected = UserException.class)
    public void getUserById_throwException_ifNoUserFound()
            throws UserException {
        userService.getUserById("Sale");
    }
    
    @Test
    public void testDeleteUserByUsername() {
        Mockito.when(userRepository.findByUserName(username)).thenReturn(user);
        // when
        userService.deleteByUsername(username);
        // then
        Mockito.verify(userRepository, times(1)).delete(user);
    }

    @Test(expected = UserException.class)
    public void deleteUserByUsername_throwException_ifNoUserFound()
            throws UserException {
        userService.deleteByUsername("Sale");
    }

}
