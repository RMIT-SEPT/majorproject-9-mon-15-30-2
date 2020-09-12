package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.UserRepository;
import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean existsByUsername(String username) {
        User user = getUser(username);
        if(user == null) {
            return false;
        } else {
            return true;
        }
    }

    public User saveUser(User user) {
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new UserException("Cannot create a user");
        }
    }

    public void deleteByUsername(String username) {
        User user = getUser(username);
        if(user == null){
            throw new UserException("Cannot delete user with username '"+username+"'. "
                    + "This user does not exist");
        }
        userRepository.delete(user);
    }

    public User getUser(String username) {
        return userRepository.getUserByUsername(username);
    }
}
