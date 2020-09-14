package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.services.CustomerDetailsService;
import com.rmit.sept.monday15302.web.CustomerController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(CustomerController.class)
public class CustomerControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private CustomerDetailsService service;

    @Test
    public void givenCustomers_whenGetAllCustomers_thenReturnJsonArray()
            throws Exception {

        CustomerDetails customer1 = new CustomerDetails();
        customer1.setId("c1");
        CustomerDetails customer2 = new CustomerDetails();
        customer2.setId("c2");

        List<CustomerDetails> customers = new ArrayList<>();
        customers.add(customer1);
        customers.add(customer2);

        given(service.getAllCustomers()).willReturn(customers);

        mvc.perform(get("/customers")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(customer1.getId())))
                .andExpect(jsonPath("$[1].id", is(customer2.getId())));
    }

    @Test
    public void givenCustomer_fetchOneCustomerById() throws Exception {

        CustomerDetails customer = new CustomerDetails();
        String id = "c1";
        customer.setId(id);

        given(service.getCustomerById(id)).willReturn(customer);

        mvc.perform(get("/customer/{id}", id)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(id)));
    }
}
