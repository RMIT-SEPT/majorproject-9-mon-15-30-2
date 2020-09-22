package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.AdminDetailsRepository;
import com.rmit.sept.monday15302.exception.AdminDetailsException;
import com.rmit.sept.monday15302.model.AdminDetails;
import com.rmit.sept.monday15302.services.AdminDetailsService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AdminDetailsServiceTest {
    @Autowired
    private AdminDetailsService adminDetailsService;

    @MockBean
    private AdminDetailsRepository adminDetailsRepository;

    private static List<String> serviceList;

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

        serviceList = Arrays.asList(admin1.getService(), admin2.getService());

        Mockito.when(adminDetailsRepository.getServiceByAdminId(admin1.getId()))
                .thenReturn(admin1.getService());

        List<String> adminIdList = Arrays.asList(admin1.getId(), admin3.getId());

        Mockito.when(adminDetailsRepository.getAdminIdByService(service))
                .thenReturn(adminIdList);

        Mockito.when(adminDetailsRepository.getAdminById(admin2.getId())).thenReturn(admin2);
    }

    @Test
    public void getServiceByAdminId_returnService_ifServiceFound() {
        String service = "Massage";
        String adminId = "a1";
        assert(adminDetailsService.getServiceByAdminId(adminId).equals(service));
    }

    @Test(expected = AdminDetailsException.class)
    public void getServiceByAdminId_throwException_ifNoServiceFound()
            throws AdminDetailsException {
        String adminId = "a4";
        adminDetailsService.getServiceByAdminId(adminId);
    }

    @Test
    public void getAdminIdByService_returnAdminIds_ifAdminFound() {
        String service = "Massage";
        String admin1 = "a1";
        String admin2 = "a3";
        List<String> adminList = adminDetailsService.getAdminIdByService(service);
        assert(adminList.contains(admin1) && adminList.contains(admin2));
    }

    @Test(expected = AdminDetailsException.class)
    public void getAdminIdByService_throwException_ifAdminNotFound()
            throws AdminDetailsException {
        adminDetailsService.getAdminIdByService("Nails");
    }

    @Test
    public void getAllServices_returnServices_ifServicesFound() {
        Mockito.when(adminDetailsRepository.getAllServices())
                .thenReturn(serviceList);
        String service1 = "Massage";
        String service2 = "Haircut";
        List<String> serviceList = adminDetailsService.getAllServices();
        assert(serviceList.contains(service1) && serviceList.contains(service2));
    }

    @Test(expected = AdminDetailsException.class)
    public void getAllServices_throwException_ifNoServicesFound() throws AdminDetailsException {
        List<String> services = new ArrayList<>();
        Mockito.when(adminDetailsRepository.getAllServices())
                .thenReturn(services);
        adminDetailsService.getAllServices();
    }

    @Test
    public void getAdminById_returnAdmin_ifAdminFound() {
        String admin2 = "a2";
        assert(adminDetailsService.getAdminById(admin2) != null);
    }

    @Test(expected = AdminDetailsException.class)
    public void getAdminById_throwException_ifAdminNotFound() throws AdminDetailsException {
        adminDetailsService.getAdminById("Nails");
    }
}
