package com.rmit.sept.monday15302.utils;

import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.YearMonth;
import java.util.Calendar;
import java.util.Date;

@Component
public class Utility {

    @Autowired
    private UserService userService;

    public static Date convertStringToTime(String time) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        return sdf.parse(time);
    }

    public static Date convertStringToDate(String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.parse(date);
    }

    public static int convertDateToDay(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        return calendar.get(Calendar.DAY_OF_WEEK);
    }

    public static String getDateAsString(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(date);
    }

    public static String getTimeAsString(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        return sdf.format(date);
    }

    public static int getWorkingDaysInMonth(int month, int year) {
        return YearMonth.of(year, month).lengthOfMonth();
    }

    public boolean isCurrentLoggedInUser(String id) {
        boolean isLoggedIn = false;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) principal;
            if(userService.getUserByUsername(userDetails.getUsername()).getId().equals(id)) {
                isLoggedIn = true;
            }
        }
        return isLoggedIn;
    }

    public void validatePassword(String password, String confirmPassword) {
        if(password.length() < 6){
            throw new UserException("Password must be at least 6 characters");
        }

        if(!password.equals(confirmPassword)){
            throw new UserException("Confirmed password must match");
        }
    }
}
