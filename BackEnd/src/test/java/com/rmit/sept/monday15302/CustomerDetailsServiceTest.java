package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.CustomerDetailsRepository;
import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.services.CustomerDetailsService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import static org.mockito.Mockito.times;

@RunWith(SpringRunner.class)
@SpringBootTest
public class CustomerDetailsServiceTest {
    @Autowired
    private CustomerDetailsService customerDetailsService;

    @MockBean
    private CustomerDetailsRepository customerDetailsRepository;

    private static CustomerDetails customer = new CustomerDetails();

    @Test
    public void createCustomer_returnCustomer_ifCustomerIsSaved() {
        customerDetailsService.saveCustomer(customer);
        Mockito.verify(customerDetailsRepository,
                times(1)).save(customer);
    }

    @Test(expected = UserException.class)
    public void createCustomer_throwException_ifCustomerNotSaved() throws UserException {
        Mockito.doThrow(new UserException("Cannot save new customer"))
                .when(customerDetailsRepository)
                .save(customer);
        customerDetailsService.saveCustomer(customer);
    }
}
