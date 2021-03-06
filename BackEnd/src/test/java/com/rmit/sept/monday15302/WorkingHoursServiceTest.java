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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.times;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WorkingHoursServiceTest {

    @MockBean
    private WorkingHoursRepository workingHoursRepository;

    @Autowired
    private WorkingHoursService workingHoursService;

    private static WorkingHours hour;
    private static String adminId = "a1";

    @Before
    public void setup() throws ParseException {
        AdminDetails admin = new AdminDetails();
        admin.setId(adminId);

        hour = new WorkingHours(admin, 3,
                "08:00:00", "10:00:00", "2020-12-12");
        List<WorkingHours> hours = Arrays.asList(hour);
        Mockito.when(workingHoursRepository.findByAdmin_id(adminId)).thenReturn(hours);

        Mockito.when(workingHoursRepository.findByAdmin_idAndDay(admin.getId(), hour.getDay()))
                .thenReturn(hour);
    }

    @Test
    public void getOpeningHoursByDayAndAdmin_returnHours_ifHoursFound() {
        assert(workingHoursService.getOpeningHoursByDayAndAdmin(3,adminId).equals(hour));
    }

    @Test
    public void getOpeningHoursByDayAndAdmin_returnNull_ifHoursNotFound() {
        assert(workingHoursService.getOpeningHoursByDayAndAdmin(1, adminId) == null);
    }

    @Test
    public void isNotifiedDate_returnTrue_ifCurrentDateIsNotifiedDate() {
        Date today = new Date();
        hour.setDateByDate(today);
        assert(workingHoursService.isNotifiedDate(adminId));
    }

    @Test
    public void isNotifiedDate_returnFalse_ifCurrentDateIsNotNotifiedDate() {
        assert(!workingHoursService.isNotifiedDate(adminId));
    }

    @Test
    public void isNotifiedDate_returnFalse_ifNoWorkingHoursFound() {
        List<WorkingHours> hours = new ArrayList<>();
        Mockito.when(workingHoursRepository.findByAdmin_id(adminId)).thenReturn(hours);
        assert(!workingHoursService.isNotifiedDate(adminId));
    }

    @Test
    public void testResetNotifiedDate() {
        Mockito.when(workingHoursRepository.save(hour)).thenReturn(hour);
        // when
        workingHoursService.resetNotifiedDate(adminId);
        // then
        Mockito.verify(workingHoursRepository, times(1)).save(hour);
    }

}
