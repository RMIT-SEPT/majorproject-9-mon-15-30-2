package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.UserRepository;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.model.UserType;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@DataJpaTest
@RunWith(SpringRunner.class)
public class UserRepositoryTest {
    @Autowired
    TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    static private User user;
    static private String username = "admin";
    static private String userId;

    @Before
    public void setup() {
        user = new User(username, "*", UserType.ADMIN);
        entityManager.persist(user);
        entityManager.flush();
        userId = user.getId();
    }

    @Test
    public void getUserByUsername_returnUser_ifUserFound() {
        assert(userRepository.getUserByUsername(username).equals(user));
    }

    @Test
    public void getUserByUsername_returnNull_ifNoUserFound() {
        assert(userRepository.getUserByUsername("worker") == null);
    }

    @Test
    public void getUserById_returnUser_ifUserFound() {
        assert(userRepository.getUserById(userId).equals(user));
    }

    @Test
    public void getUserById_returnNull_ifNoUserFound() {
        assert(userRepository.getUserById("worker") == null);
    }

}
