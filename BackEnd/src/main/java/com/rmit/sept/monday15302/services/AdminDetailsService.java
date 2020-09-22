package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.AdminDetailsRepository;
import com.rmit.sept.monday15302.exception.AdminDetailsException;
import com.rmit.sept.monday15302.model.AdminDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminDetailsService {
    @Autowired
    private AdminDetailsRepository adminDetailsRepository;

    public String getServiceByAdminId(String adminId) {
        String service = adminDetailsRepository.getServiceByAdminId(adminId);

        if(service == null) {
            throw new AdminDetailsException("No service found for admin with id " + adminId);
        }

        return service;
    }

    public List<String> getAllServices() {
        List<String> serviceList = adminDetailsRepository.getAllServices();
        if(serviceList.size() == 0) {
            throw new AdminDetailsException("No service found");
        }
        return serviceList;
    }

    public List<String> getAdminIdByService(String service) {
        List<String> adminList = adminDetailsRepository.getAdminIdByService(service);
        if(adminList.size() == 0) {
            throw new AdminDetailsException("No admin which provides " + service);
        }
        return adminList;
    }

    public AdminDetails getAdminById(String adminId) {
        AdminDetails admin = adminDetailsRepository.getAdminById(adminId);
        if(admin == null) {
            throw new AdminDetailsException("Admin not found");
        }
        return admin;
    }
}
