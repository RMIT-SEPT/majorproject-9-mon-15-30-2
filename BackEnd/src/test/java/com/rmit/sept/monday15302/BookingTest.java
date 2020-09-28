package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.model.*;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.text.ParseException;
import java.util.Set;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BookingTest {

    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    private static CustomerDetails customer = new CustomerDetails();
    private static WorkerDetails worker = new WorkerDetails();
    private static Booking booking;

    @BeforeClass
    public static void createValidator() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @Before
    public void setup() throws ParseException {
        booking = new Booking(customer, worker, BookingStatus.NEW_BOOKING,
                "2021-09-02", "8:00:00", "9:00:00",
                "Haircut", Confirmation.PENDING);
    }

    @AfterClass
    public static void close() {
        validatorFactory.close();
    }

    @Test
    public void serviceCannotBeNull() {
        booking.setService(null);
        Set<ConstraintViolation<Booking>> violations = validator.validate(booking);
        assert(violations.size() == 1);
    }

    @Test
    public void customerCannotBeNull() {
        booking.setCustomer(null);
        Set<ConstraintViolation<Booking>> violations = validator.validate(booking);
        assert(violations.size() == 1);
    }

    @Test
    public void workerCannotBeNull() {
        booking.setWorker(null);
        Set<ConstraintViolation<Booking>> violations = validator.validate(booking);
        assert(violations.size() == 1);
    }

    @Test(expected = NullPointerException.class)
    public void dateCannotBeNull() throws NullPointerException, ParseException {
        booking.setDate(null);
    }

    @Test(expected = NullPointerException.class)
    public void startTimeCannotBeNull() throws NullPointerException, ParseException {
        booking.setStartTime(null);
    }

    @Test(expected = NullPointerException.class)
    public void endTimeCannotBeNull() throws NullPointerException, ParseException {
        booking.setEndTime(null);
    }

    @Test
    public void statusCannotBeNull() {
        booking.setStatus(null);
        Set<ConstraintViolation<Booking>> violations = validator.validate(booking);
        assert(violations.size() == 1);
    }

    @Test(expected = ParseException.class)
    public void endTimeCannotHasWrongFormat() throws ParseException {
        booking.setEndTime("2020-09-00");
    }

    @Test(expected = ParseException.class)
    public void startTimeCannotHasWrongFormat() throws ParseException {
        booking.setStartTime("2009-00");
    }

    @Test(expected = ParseException.class)
    public void dateCannotHasWrongFormat() throws ParseException {
        booking.setDate("Sat Aug");
    }
}
