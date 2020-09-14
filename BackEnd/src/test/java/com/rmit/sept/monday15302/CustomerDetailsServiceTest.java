package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.CustomerDetailsRepository;
import com.rmit.sept.monday15302.exception.CustomerDetailsException;
import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.services.CustomerDetailsService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CustomerDetailsServiceTest {
    @Autowired
    private CustomerDetailsService customerDetailsService;

    @MockBean
    private CustomerDetailsRepository customerDetailsRepository;

    @Before
    public void setup() {

        CustomerDetails customer1 = new CustomerDetails();
        customer1.setId("c1");
        CustomerDetails customer2 = new CustomerDetails();
        customer2.setId("c2");

        List<CustomerDetails> customerList = Arrays.asList(customer1, customer2);

        Mockito.when(customerDetailsRepository.findAll())
                .thenReturn(customerList);

        Mockito.when(customerDetailsRepository.findByCustomerId("c1")).thenReturn(customer1);
    }

    @Test
    public void getAllCustomers_returnCustomers_ifCustomersFound() {
        String id1 = "c1";
        String id2 = "c2";
        List<CustomerDetails> list = customerDetailsService.getAllCustomers();
        assert(list.size() == 2 && list.get(0).getId().equals(id1)
                && list.get(1).getId().equals(id2));
    }

    @Test
    public void getCustomerById_returnCustomer_ifCustomerFound() {
        String id1 = "c1";
        CustomerDetails toCheck = customerDetailsService.getCustomerById(id1);
        assert(toCheck != null);
    }

    @Test(expected = CustomerDetailsException.class)
    public void getCustomerById_throwException_ifCustomerNotFound() throws CustomerDetailsException {
        assert(customerDetailsService.getCustomerById("1234") == null);
    }
}
