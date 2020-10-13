package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.model.AdminDetails;
import com.rmit.sept.monday15302.model.WorkingHours;
import com.rmit.sept.monday15302.security.JwtAuthenticationEntryPoint;
import com.rmit.sept.monday15302.security.JwtAuthenticationFilter;
import com.rmit.sept.monday15302.services.UserService;
import com.rmit.sept.monday15302.services.WorkingHoursService;
import com.rmit.sept.monday15302.utils.Utility;
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
    private UserService userService;

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private Utility utility;

    private static String adminId = "a1";

    @Test
    public void givenHours_whenGetOpeningHoursByAdminIdAndDay_thenReturnJsonArray()
            throws Exception {

        int day = 1;
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

    @Test
    public void checkNotifiedDate_returnTrueOrFalse_ifAuthorized() throws Exception {
        given(service.isNotifiedDate(adminId)).willReturn(true);
        given(utility.isCurrentLoggedInUser(adminId)).willReturn(true);
        mvc.perform(get("/admin/checkNotifiedDate/{adminId}", adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    public void checkNotifiedDate_throw401_ifUnauthorized() throws Exception {
        given(utility.isCurrentLoggedInUser(adminId)).willReturn(false);
        mvc.perform(get("/admin/checkNotifiedDate/{adminId}", adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }


}
