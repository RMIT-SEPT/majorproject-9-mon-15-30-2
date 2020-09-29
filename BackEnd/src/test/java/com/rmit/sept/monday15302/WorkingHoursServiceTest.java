package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.WorkingHoursRepository;
import com.rmit.sept.monday15302.model.AdminDetails;
import com.rmit.sept.monday15302.model.WorkingHours;
import com.rmit.sept.monday15302.services.WorkingHoursService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WorkingHoursServiceTest {

    @MockBean
    private WorkingHoursRepository workingHoursRepository;

    @Autowired
    private WorkingHoursService workingHoursService;

    private static WorkingHours hours;
    private static String adminId = "a1";

    @Before
    public void setup() throws ParseException {
        AdminDetails admin = new AdminDetails();
        admin.setId(adminId);

        hours = new WorkingHours(admin, 3,
                "08:00:00", "10:00:00", "2020-12-12");

        Mockito.when(workingHoursRepository.findByAdmin_idAndDay(admin.getId(), hours.getDay()))
                .thenReturn(hours);
    }

    @Test
    public void getOpeningHoursByDayAndAdmin_returnHours_ifHoursFound() {
        assert(workingHoursService.getOpeningHoursByDayAndAdmin(3,adminId).equals(hours));
    }

    @Test
    public void getOpeningHoursByDayAndAdmin_returnNull_ifHoursNotFound() {
        assert(workingHoursService.getOpeningHoursByDayAndAdmin(1, adminId) == null);
    }

}
