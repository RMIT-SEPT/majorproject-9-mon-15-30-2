package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.WorkingHoursRepository;
import com.rmit.sept.monday15302.model.AdminDetails;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.model.UserType;
import com.rmit.sept.monday15302.model.WorkingHours;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@RunWith(SpringRunner.class)
public class WorkingHoursRepositoryTest {

    private static String adminID;
    private static WorkingHours workingHours;

    @Autowired
    TestEntityManager entityManager;

    @Autowired
    private WorkingHoursRepository workingHoursRepository;

    @Test
    public void injectedComponentsAreNotNull(){
        assertThat(entityManager).isNotNull();
        assertThat(workingHoursRepository).isNotNull();
    }

    @Before
    public void setup() throws ParseException {
        User user = new User("admin", "*", UserType.ADMIN);
        entityManager.persist(user);
        entityManager.flush();

        AdminDetails admin = new AdminDetails("Business", "Haircut", user);
        entityManager.persist(admin);
        entityManager.flush();
        adminID = admin.getId();

        workingHours = new WorkingHours(admin, 4, "8:00:00",
                "17:00:00", "2020-11-11");
        entityManager.persist(workingHours);
        entityManager.flush();
    }

    @Test
    public void getWorkingHoursByAdminIdAndDay_returnTrue_ifNotFound() {
        assert(workingHoursRepository.findByAdmin_idAndDay(adminID, 3) == null);
    }

    @Test
    public void getWorkingHoursByAdminIdAndDay_returnTrue_ifHoursFound() {
        WorkingHours found = workingHoursRepository.findByAdmin_idAndDay(adminID, 4);
        assert(found.equals(workingHours));
    }


}
