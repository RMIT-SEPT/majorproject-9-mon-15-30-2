package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.security.CustomAuthenticationSuccessHandler;
import com.rmit.sept.monday15302.security.JwtAuthenticationEntryPoint;
import com.rmit.sept.monday15302.security.JwtAuthenticationFilter;
import com.rmit.sept.monday15302.services.CustomUserService;
import com.rmit.sept.monday15302.services.CustomerDetailsService;
import com.rmit.sept.monday15302.utils.Utility;
import com.rmit.sept.monday15302.web.CustomerController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
    private CustomUserService customUserService;

    @MockBean
    private CustomAuthenticationSuccessHandler successHandler;

    @Test
    public void getCustomerById() throws Exception {

        CustomerDetails customer = new CustomerDetails();
        String id = "c1";
        customer.setId(id);

        given(service.getCustomerById(id)).willReturn(customer);
        given(utility.isCurrentLoggedInUser(id)).willReturn(true);

        mvc.perform(get("/customer/profile/{id}", id)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(id)));
    }

    @Test
    public void getCustomerById_throwUnauthorizedStatus() throws Exception {
        given(utility.isCurrentLoggedInUser("c1")).willReturn(false);

        mvc.perform(get("/customer/profile/{id}", "c1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }
}
