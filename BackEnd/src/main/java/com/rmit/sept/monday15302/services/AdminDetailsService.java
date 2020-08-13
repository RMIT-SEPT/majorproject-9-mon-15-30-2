package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.AdminDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminDetailsService {
    @Autowired
    private AdminDetailsRepository adminDetailsRepository;
}
