package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.UserRepository;
import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.utils.Request.UpdatePassword;
import com.rmit.sept.monday15302.validator.PasswordValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private PasswordValidator passwordValidator;

    @Autowired
    private UserService userService;

    public boolean existsByUsername(String username) {
        User user = getUserByUsername(username);
        return !(user == null);
    }

    public User saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
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

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);
        if(user==null) throw new UsernameNotFoundException("User not found");
        return user;
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUserName(username);
    }

    public User getUserById(String id) {
        User user = userRepository.getUserById(id);
        if(user == null) {
            throw new UserException("User with id " + id + " not found");
        }
        return user;
    }

    public void deleteByUsername(String username) {
        User user = getUserByUsername(username);
        if(user == null) {
            throw new UserException("Cannot find user with username " + username);
        }
        userRepository.delete(user);
    }

    public User changeUserPassword(UpdatePassword passwordRequest, String id) {
        User user = getUserById(id);
        if(!bCryptPasswordEncoder.matches(passwordRequest.getOldPassword(), user.getPassword())) {
            throw new UserException("Invalid old password");
        }
        user.setPassword(passwordRequest.getNewPassword());
        return saveUser(user);
    }
}
