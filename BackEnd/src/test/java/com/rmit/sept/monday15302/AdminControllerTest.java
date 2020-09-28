package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.model.AdminDetails;
import com.rmit.sept.monday15302.services.AdminDetailsService;
import com.rmit.sept.monday15302.web.AdminController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@RunWith(SpringRunner.class)
@WebMvcTest(AdminController.class)
public class AdminControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private AdminDetailsService service;

    @Test
    public void givenServices_whenGetServices_thenReturnJsonArray()
            throws Exception {
        String service1 = "Haircut";
        String service2 = "Massage";
        List<String> services = Arrays.asList(service1, service2);

        given(service.getAllServices()).willReturn(services);

        mvc.perform(get("/makebooking/allservices")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(content().json("['Haircut', 'Massage']"));
    }

    @Test
    public void givenAdmin_whenGetService_returnService() throws Exception {
        AdminDetails admin = new AdminDetails();
        admin.setId("a1");
        admin.setService("Haircut");
        given(service.getServiceByAdminId("a1")).willReturn("Haircut");
        mvc.perform(get("/admin/service/{id}", "a1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("Haircut"));
    }
}
