package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.model.AdminDetails;
import com.rmit.sept.monday15302.model.WorkingHours;
import com.rmit.sept.monday15302.security.CustomAuthenticationSuccessHandler;
import com.rmit.sept.monday15302.security.JwtAuthenticationEntryPoint;
import com.rmit.sept.monday15302.security.JwtAuthenticationFilter;
import com.rmit.sept.monday15302.services.CustomUserService;
import com.rmit.sept.monday15302.services.WorkingHoursService;
import com.rmit.sept.monday15302.web.WorkingHoursController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(WorkingHoursController.class)
@AutoConfigureMockMvc(addFilters=false)
public class WorkingHoursControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private WorkingHoursService service;

    @MockBean
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @MockBean
    private CustomUserService customUserService;

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @MockBean
    private CustomAuthenticationSuccessHandler successHandler;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Test
    public void givenHours_whenGetOpeningHoursByAdminIdAndDay_thenReturnJsonArray()
            throws Exception {

        int day = 1;
        String adminId = "a1";
        AdminDetails admin = new AdminDetails();
        admin.setId(adminId);

        WorkingHours hours = new WorkingHours(admin, day,
                "08:00:00", "17:00:00", "2020-12-12");

        given(service.getOpeningHoursByDayAndAdmin(eq(day), eq(adminId))).willReturn(hours);

        mvc.perform(get("/admin/openinghours/{adminId}/{day}", adminId, day)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.day", is(day)))
                .andExpect(jsonPath("$.startTime", is("08:00:00")));
    }


}
