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
    private static String admin1_id = "a1";
    private static String admin2_id = "a2";
    private static String admin3_id = "a3";
    private static String service1 = "Massage";
    private static String service2 = "Haircut";

    @Before
    public void setup() {
        AdminDetails admin1 = new AdminDetails();
        admin1.setId(admin1_id);
        admin1.setService(service1);

        AdminDetails admin2 = new AdminDetails();
        admin2.setId(admin2_id);
        admin2.setService(service2);

        AdminDetails admin3 = new AdminDetails();
        admin3.setId(admin3_id);
        admin3.setService(service1);

        serviceList = Arrays.asList(admin1.getService(), admin2.getService());

        Mockito.when(adminDetailsRepository.getServiceByAdminId(admin1.getId()))
                .thenReturn(admin1.getService());

        List<String> adminIdList = Arrays.asList(admin1.getId(), admin3.getId());

        Mockito.when(adminDetailsRepository.getAdminIdByService(service1))
                .thenReturn(adminIdList);

        Mockito.when(adminDetailsRepository.getAdminById(admin2.getId())).thenReturn(admin2);
    }

    @Test
    public void getServiceByAdminId_returnService_ifServiceFound() {
        assert(adminDetailsService.getServiceByAdminId(admin1_id).equals(service1));
    }

    @Test(expected = AdminDetailsException.class)
    public void getServiceByAdminId_throwException_ifServiceNotFound()
            throws AdminDetailsException {
        adminDetailsService.getServiceByAdminId("a4");
    }

    @Test
    public void getAdminIdByService_returnAdminIds_ifAdminFound() {
        List<String> adminList = adminDetailsService.getAdminIdByService(service1);
        assert(adminList.contains(admin1_id) && adminList.contains(admin3_id));
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
        assert(adminDetailsService.getAdminById(admin2_id) != null);
    }

    @Test(expected = AdminDetailsException.class)
    public void getAdminById_throwException_ifAdminNotFound() throws AdminDetailsException {
        adminDetailsService.getAdminById("Nails");
    }
}
