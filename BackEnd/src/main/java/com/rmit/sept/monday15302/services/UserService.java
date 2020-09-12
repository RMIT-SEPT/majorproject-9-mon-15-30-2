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

    public void deleteById(String id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    public User getUser(String username) {
        return userRepository.getUserByUsername(username);
    }

    public User getUserById(String id) {
        User user = userRepository.getUserById(id);
        if(user == null) {
            throw new UserException("User with id " + id + " not found");
        }
        return user;
    }

    public void deleteByUsername(String username) {
        User user = getUser(username);
        if(user == null) {
            throw new UserException("Cannot find user with username " + username);
        }
        userRepository.delete(user);
    }
}
