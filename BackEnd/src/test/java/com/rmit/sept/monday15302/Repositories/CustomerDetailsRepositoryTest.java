package com.rmit.sept.monday15302.Repositories;


import com.rmit.sept.monday15302.model.CustomerDetails;
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
public class CustomerDetailsRepositoryTest {

    private static String customerId;
    private static CustomerDetails customer;
    private static CustomerDetails customer1;

    @Autowired
    TestEntityManager entityManager;

    @Autowired
    private CustomerDetailsRepository customerDetailsRepository;

    @Before
    public void setup() {
        User user2 = new User("worker", "*", UserType.CUSTOMER);
        User user3 = new User("worker1", "*", UserType.CUSTOMER);
        entityManager.persist(user2);
        entityManager.persist(user3);

        customer = new CustomerDetails(user2, "John", "Smith", "Australia",
                "0123456798", "johnsmith@gmail.com");
        entityManager.persist(customer);

        customer1 = new CustomerDetails(user3, "Michael", "Smith", "Sydney",
                "0987654456", "michaelsmith@gmail.com");
        entityManager.persist(customer1);
        entityManager.flush();

        customerId = customer.getId();
    }

    @Test
    public void findAll_returnTrue_ifCustomersFound() {
        List<CustomerDetails> customerList = customerDetailsRepository.findAll();
        boolean toReturn = customerList.size() == 2
                && customerList.contains(customer) && customerList.contains(customer1);
        assert(toReturn);
    }

    @Test
    public void findByCustomerId_returnTrue_ifCustomerFound() {
        assert(customerDetailsRepository.findByCustomerId(customerId).equals(customer));
    }

    @Test
    public void findByCustomerId_returnTrue_ifCustomerNotFound() {
        assert(customerDetailsRepository.findByCustomerId("0") == null);
    }
}
