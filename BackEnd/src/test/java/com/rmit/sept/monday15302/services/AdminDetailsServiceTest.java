package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.AdminDetailsRepository;
import com.rmit.sept.monday15302.exception.AdminDetailsException;
import com.rmit.sept.monday15302.model.AdminDetails;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AdminDetailsServiceTest {
    @Autowired
    private AdminDetailsService adminDetailsService;

    @MockBean
    private AdminDetailsRepository adminDetailsRepository;

    @Before
    public void setup() {
        String service = "Massage";

        AdminDetails admin1 = new AdminDetails();
        admin1.setId("a1");
        admin1.setService(service);

        AdminDetails admin2 = new AdminDetails();
        admin2.setId("a2");
        admin2.setService("Haircut");

        AdminDetails admin3 = new AdminDetails();
        admin3.setId("a3");
        admin3.setService(service);

        List<String> serviceList = new ArrayList<>();
        serviceList.add(admin1.getService());
        serviceList.add(admin2.getService());

        Mockito.when(adminDetailsRepository.getServiceByAdminId(admin1.getId()))
                .thenReturn(admin1.getService());

        Mockito.when(adminDetailsRepository.getAllServices())
                .thenReturn(serviceList);

        List<String> adminIdList = new ArrayList<>();
        adminIdList.add(admin1.getId());
        adminIdList.add(admin3.getId());

        Mockito.when(adminDetailsRepository.getAdminIdByService(service))
                .thenReturn(adminIdList);
    }

    @Test
    public void getServiceByAdminId_returnTrue_ifServiceFound() {
        String service = "Massage";
        String adminId = "a1";
        assert(adminDetailsService.getServiceByAdminId(adminId).equals(service));
    }

    @Test(expected = AdminDetailsException.class)
    public void getServiceByAdminId_throwException_ifNoServiceFound() throws AdminDetailsException {
        String adminId = "a4";
        adminDetailsService.getServiceByAdminId(adminId);
    }

    @Test
    public void getAdminIdByService_returnTrue_ifAdminFound() {
        String service = "Massage";
        String admin1 = "a1";
        String admin2 = "a3";
        List<String> adminList = adminDetailsService.getAdminIdByService(service);
        assert(adminList.contains(admin1) && adminList.contains(admin2));
    }

    @Test(expected = AdminDetailsException.class)
    public void getAdminIdByService_throwException_ifAdminNotFound() throws AdminDetailsException {
        adminDetailsService.getAdminIdByService("Nails");
    }

    @Test
    public void getAllServices_returnTrue_ifTwoServicesFound() {
        String service1 = "Massage";
        String service2 = "Haircut";
        List<String> serviceList = adminDetailsService.getAllServices();
        assert(serviceList.contains(service1) && serviceList.contains(service2));
    }
}
