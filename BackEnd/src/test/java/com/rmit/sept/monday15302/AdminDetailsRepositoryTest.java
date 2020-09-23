package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.AdminDetailsRepository;
import com.rmit.sept.monday15302.model.AdminDetails;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.model.UserType;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@DataJpaTest
@RunWith(SpringRunner.class)
public class AdminDetailsRepositoryTest {
    @Autowired
    TestEntityManager entityManager;

    @Autowired
    private AdminDetailsRepository adminDetailsRepository;

    private static AdminDetails admin;
    private static String service;
    private static String service1;

    @Before
    public void setup() {
        User user = new User("admin", "*", UserType.ROLE_ADMIN);
        User user1 = new User("admin1", "*", UserType.ROLE_ADMIN);
        entityManager.persist(user);
        entityManager.persist(user1);

        AdminDetails admin1 = new AdminDetails("Melbourne Salon 1", "Massage", user1);
        admin = new AdminDetails("Melbourne Salon", "Haircut", user);
        entityManager.persist(admin);
        entityManager.persist(admin1);
        entityManager.flush();

        service = admin.getService();
        service1 = admin1.getService();
    }

    @Test
    public void getAllServices_returnServices_ifServicesFound() {
        List<String> services = adminDetailsRepository.getAllServices();
        assert(services.contains(service) && services.contains(service1));
    }

    @Test
    public void getServiceByAdminId_returnOneService_ifServiceFound() {
        assert(adminDetailsRepository.getServiceByAdminId(admin.getId()).equals(service));
    }

    @Test
    public void getServiceByAdminId_returnNull_ifServiceNotFound() {
        assert(adminDetailsRepository.getServiceByAdminId("1") == null);
    }

    @Test
    public void getAdminIdByService_returnAdminId_ifAdminFound() {
        assert(adminDetailsRepository.getAdminIdByService(service).contains(admin.getId()));
    }

    @Test
    public void getAdminIdByService_returnEmptyList_ifServiceNotFound() {
        assert(adminDetailsRepository.getAdminIdByService("Nails").isEmpty());
    }

}
