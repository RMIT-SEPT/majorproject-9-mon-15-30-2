package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.UserRepository;
import com.rmit.sept.monday15302.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(username);
        if(user==null) new UsernameNotFoundException("User not found");
        return user;
    }


    @Transactional
    public User loadUserById(String id){
        User user = userRepository.getUserById(id);
        if(user==null) new UsernameNotFoundException("User not found");
        return user;

    }
}
