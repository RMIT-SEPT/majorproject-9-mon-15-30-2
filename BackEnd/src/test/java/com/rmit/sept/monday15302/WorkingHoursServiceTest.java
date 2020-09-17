package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.WorkingHoursRepository;
import com.rmit.sept.monday15302.exception.WorkingHoursException;
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

    @Before
    public void setup() throws ParseException {
        AdminDetails admin = new AdminDetails();
        admin.setId("a1");

        WorkingHours hours = new WorkingHours();
        hours.setAdminId(admin);
        hours.setDay(3);
        hours.setStartTime("8:00:00");
        hours.setEndTime("10:00:00");

        Mockito.when(workingHoursRepository.findByAdmin_idAndDay(admin.getId(), hours.getDay()))
                .thenReturn(hours);
    }

    @Test
    public void getOpeningHours_ReturnHour_IfHoursFound() throws ParseException {
        String adminId = "a1";
        String date = "2020-09-15";
        assert(workingHoursService.getOpeningHours(adminId, date).size() == 2);
    }

    @Test(expected = WorkingHoursException.class)
    public void getOpeningHours_ThrowException_IfNoHoursFound()
            throws ParseException, WorkingHoursException {
        String adminId = "a1";
        String date = "2020-09-16";
        workingHoursService.getOpeningHours(adminId, date);
    }
}
