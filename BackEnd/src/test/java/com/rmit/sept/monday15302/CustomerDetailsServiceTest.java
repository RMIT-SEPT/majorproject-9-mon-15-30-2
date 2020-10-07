package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.CustomerDetailsRepository;
import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.model.UserType;
import com.rmit.sept.monday15302.services.CustomerDetailsService;
import com.rmit.sept.monday15302.services.UserService;
import com.rmit.sept.monday15302.utils.Request.EditCustomer;
import org.junit.Before;
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

    @MockBean
    private UserService userService;

    private static CustomerDetails customer;
    private static EditCustomer updatedCustomer;
    private static String customerId = "c1";
    private static User user;
    private static String username = "customer";
    private static String newUsername = "customer1";

    @Before
    public void setup() {
        user = new User(username, "******", UserType.ROLE_CUSTOMER);
        customer = new CustomerDetails(user, "John", "Smith",
                "Melbourne", "0123456789", "john@gmail.com");
        updatedCustomer = new EditCustomer(newUsername, "John", "Smith", "john@gmail.com",
                "Melbourne", "0123456789");
        user.setId(customerId);
        customer.setId(customerId);
        Mockito.when(customerDetailsRepository.getCustomerById(customerId)).thenReturn(customer);
        Mockito.when(userService.getUserById(customerId)).thenReturn(user);
    }

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

    @Test
    public void getCustomerById_returnCustomer_ifCustomerFound() {
        assert(customerDetailsService.getCustomerById(customerId) != null);
    }

    @Test(expected = UserException.class)
    public void getCustomerById_throwException_ifCustomerNotFound()
            throws UserException {
        assert(customerDetailsService.getCustomerById("1234") == null);
    }

    @Test
    public void getCustomerProfile_returnCustomer_ifCustomerFound() {
        assert(customerDetailsService.getCustomerProfile(customerId) != null);
    }

    @Test(expected = UserException.class)
    public void updateCustomer_throwException_ifDuplicateUsername() {
        Mockito.when(userService.existsByUsername(newUsername)).thenReturn(true);
        customerDetailsService.updateCustomer(updatedCustomer, customerId);
    }

    @Test(expected = UserException.class)
    public void updateCustomer_throwException_ifCustomerNotFound() {
        Mockito.when(userService.existsByUsername(newUsername)).thenReturn(false);
        customerDetailsService.updateCustomer(updatedCustomer, "123");
    }

    @Test
    public void updateCustomer_returnCustomer_ifCustomerUpdated() {
        Mockito.when(userService.saveUser(user)).thenReturn(user);
        Mockito.when(customerDetailsRepository.save(customer)).thenReturn(customer);
        // when
        customerDetailsService.updateCustomer(updatedCustomer, customerId);
        // then
        Mockito.verify(customerDetailsRepository, times(1)).save(customer);
    }
}
