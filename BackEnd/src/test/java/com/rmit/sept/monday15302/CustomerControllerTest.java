package com.rmit.sept.monday15302;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.model.UserType;
import com.rmit.sept.monday15302.security.JwtAuthenticationEntryPoint;
import com.rmit.sept.monday15302.security.JwtAuthenticationFilter;
import com.rmit.sept.monday15302.services.CustomerDetailsService;
import com.rmit.sept.monday15302.services.MapValidationErrorService;
import com.rmit.sept.monday15302.services.UserService;
import com.rmit.sept.monday15302.utils.Request.EditCustomer;
import com.rmit.sept.monday15302.utils.Request.UpdatePassword;
import com.rmit.sept.monday15302.utils.Utility;
import com.rmit.sept.monday15302.web.CustomerController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(CustomerController.class)
@AutoConfigureMockMvc(addFilters=false)
public class CustomerControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private CustomerDetailsService service;

    @MockBean
    private Utility utility;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @MockBean
    private UserService userService;

    @MockBean
    private MapValidationErrorService mapValidationErrorService;

    private ObjectMapper objectMapper = new ObjectMapper();

    private static String customerId = "c1";
    private static String username = "customer";
    private static EditCustomer customer = new EditCustomer(username, "John",
            "Smith", "john@gmail.com", "Melbourne", "0123456789");
    private static UpdatePassword passwordRequest = new UpdatePassword("123456",
            "******", "******");

    @Test
    public void getCustomerById_returnStatusOK_ifAuthorized() throws Exception {

        EditCustomer customer = new EditCustomer();
        customer.setUserName(username);

        given(service.getCustomerProfile(customerId)).willReturn(customer);
        given(utility.isCurrentLoggedInUser(customerId)).willReturn(true);

        mvc.perform(get("/customer/profile/{id}", customerId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username", is(username)));
    }

    @Test
    public void getCustomerById_return401_ifUnauthorized() throws Exception {
        given(utility.isCurrentLoggedInUser(customerId)).willReturn(false);

        mvc.perform(get("/customer/profile/{id}", customerId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void updateCustomer_returnStatusOK_ifAuthorized() throws Exception {
        String jsonString = objectMapper.writeValueAsString(customer);
        given(utility.isCurrentLoggedInUser(customerId)).willReturn(true);
        given(service.updateCustomer(Mockito.any(EditCustomer.class), eq(customerId))).willReturn(customer);
        mvc.perform(put("/customer/editProfile/{id}", customerId)
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"));
    }

    @Test
    public void updateCustomer_return401_ifUnauthorized() throws Exception {
        String jsonString = objectMapper.writeValueAsString(customer);
        given(utility.isCurrentLoggedInUser(customerId)).willReturn(false);
        mvc.perform(put("/customer/editProfile/{id}", customerId)
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentType("application/json"));
    }

    @Test
    public void updatePassword_returnStatusOK_ifAuthorized() throws Exception {
        String jsonString = objectMapper.writeValueAsString(passwordRequest);
        User user = new User("customer", "******", UserType.ROLE_CUSTOMER);
        given(utility.isCurrentLoggedInUser(customerId)).willReturn(true);
        given(userService.changeUserPassword(passwordRequest, customerId)).willReturn(user);
        mvc.perform(put("/customer/updatePassword/{id}", customerId)
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void updatePassword_return401_ifUnauthorized() throws Exception {
        String jsonString = objectMapper.writeValueAsString(passwordRequest);
        given(utility.isCurrentLoggedInUser(customerId)).willReturn(false);
        mvc.perform(put("/customer/updatePassword/{id}", customerId)
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}
