 /* Create user data*/
/* password1 */
INSERT INTO USER (USER_ID, PASSWORD, USER_TYPE, USER_NAME) VALUES (1, '$2a$10$Pwb./SxpoztK7wP1ajsWZO0DeNo3xL8enEkOt1BDelcwGXkHBW7hC', 'ROLE_CUSTOMER', 'user1')
/* password2 */
INSERT INTO USER (USER_ID, PASSWORD, USER_TYPE, USER_NAME) VALUES (2, '$2a$10$S.A.ITHaY4vJ/VtCx63I/uM0ieC1j9u5Fe3JVehVeRShMsTLcjsHq', 'ROLE_CUSTOMER', 'user2')
/* password3 */
INSERT INTO USER (USER_ID, PASSWORD, USER_TYPE, USER_NAME) VALUES (3, '$2a$10$.14Py63fWMKf3Y.uzComT.Ose6Vhrs4Y6YdZeIEUtc2qNwc0FNdUO', 'ROLE_CUSTOMER', 'user3')

/* password4 */
INSERT INTO USER (USER_ID, PASSWORD, USER_TYPE, USER_NAME) VALUES (4, '$2a$10$eefqrQoOZJUW85De0mYbr..Q4Cc/VZnNDSa.i8wU.DAwAWLfw0Q5S', 'ROLE_ADMIN', 'admin1')
/* password5 */
INSERT INTO USER (USER_ID, PASSWORD, USER_TYPE, USER_NAME) VALUES (5, '$2a$10$Lwq/I4lPnbHdA3sS8uMx5.rl91Jm.SVMLmch8iL3SamF5LSe2NHBe', 'ROLE_ADMIN', 'admin2')

/* password6 */
INSERT INTO USER (USER_ID, PASSWORD, USER_TYPE, USER_NAME) VALUES (6, '$2a$10$j86COG8MT3oJV9jS5iXreucCrSCDUodrdI.roAyBVZQvaQf3jByAK', 'ROLE_WORKER', 'worker1')
/* password7 */
INSERT INTO USER (USER_ID, PASSWORD, USER_TYPE, USER_NAME) VALUES (7, '$2a$10$7VuC4whK0NITOuswLWPjm.PIIEikjJNFC4hP9yvAHwr2PZ4Nf3FJu', 'ROLE_WORKER', 'worker2')
/* password8 */
INSERT INTO USER (USER_ID, PASSWORD, USER_TYPE, USER_NAME) VALUES (8, '$2a$10$jDlQCRhLGxipJI5kSmhdeuWxAlUlBB.Pn.X1koa4ohF8J3DefCb0u', 'ROLE_WORKER', 'worker3')
/* password9 */
INSERT INTO USER (USER_ID, PASSWORD, USER_TYPE, USER_NAME) VALUES (9, '$2a$10$RsI71VUpBFzoT/sI7ulZ9ex6oFFZp/HABLFxT9glNj/Tf9uQ.c3tm', 'ROLE_WORKER', 'worker4')

/* Create admin details data */
INSERT INTO ADMIN_DETAILS (USER_ID, ADMIN_NAME, SERVICE) VALUES (4, 'Melbourne Salon', 'Haircut')
INSERT INTO ADMIN_DETAILS (USER_ID, ADMIN_NAME, SERVICE) VALUES (5, 'Massage Business', 'Massage')

/* Create worker details data */
INSERT INTO WORKER_DETAILS (USER_ID, WORKER_FNAME, PHONE_NUMBER, WORKER_LNAME, ADMIN_ID) VALUES (6, 'Alex', '0477889998', 'Flinn', 4)
INSERT INTO WORKER_DETAILS (USER_ID, WORKER_FNAME, PHONE_NUMBER, WORKER_LNAME, ADMIN_ID) VALUES (7, 'John', '0499887722','Smith', 4)
INSERT INTO WORKER_DETAILS (USER_ID, WORKER_FNAME, PHONE_NUMBER, WORKER_LNAME, ADMIN_ID) VALUES (8, 'Jenny', '0134567890', 'Clarke', 5)
INSERT INTO WORKER_DETAILS (USER_ID, WORKER_FNAME, PHONE_NUMBER, WORKER_LNAME, ADMIN_ID) VALUES (9, 'Michael', '0444556677', 'Brown', 5)

/* Create customer details data */
INSERT INTO CUSTOMER_DETAILS (USER_ID, ADDRESS, EMAIL, CUSTOMER_FNAME, CUSTOMER_LNAME, PHONE_NUMBER) VALUES (1, '12 Elizabeth St, Melbourne, Australia', 'karenGreen@gmail.com', 'Karen', 'Green', '0488776556')
INSERT INTO CUSTOMER_DETAILS (USER_ID, ADDRESS, EMAIL, CUSTOMER_FNAME, CUSTOMER_LNAME, PHONE_NUMBER) VALUES (2, '30 Bourke St, Sydney, Australia', 'donnaRobinson@gmail.com', 'Donna', 'Robinson', '0363667667')
INSERT INTO CUSTOMER_DETAILS (USER_ID, ADDRESS, EMAIL, CUSTOMER_FNAME, CUSTOMER_LNAME, PHONE_NUMBER) VALUES (3, '77 Latrobe St, Melbourne, Australia', 'tomHall@gmail.com', 'Tom', 'Hall', '0117788891')

/* Create working hours data */
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (1, '2020-10-22', 2, '08:00:00', '17:00:00', 4)
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (2, '2020-10-22', 3, '08:00:00', '17:00:00', 4)
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (3, '2020-10-22', 4, '08:00:00', '17:00:00', 4)
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (4, '2020-10-22', 5, '08:00:00', '17:00:00', 4)
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (5, '2020-10-22', 6, '08:00:00', '17:00:00', 4)
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (6, '2020-10-22', 7, '10:00:00', '17:00:00', 4)
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (7, '2020-10-22', 1, '10:00:00', '15:00:00', 4)
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (8, '2020-10-30', 2, '08:30:00', '16:00:00', 5)
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (9, '2020-10-30', 3, '08:30:00', '16:00:00', 5)
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (10, '2020-10-30', 4, '08:30:00', '16:00:00', 5)
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (11, '2020-10-30', 5, '08:30:00', '16:00:00', 5)
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (12, '2020-10-30', 6, '08:30:00', '16:00:00', 5)
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (13, '2020-10-30', 7, '09:00:00', '18:00:00', 5)
INSERT INTO WORKING_HOURS (WORKING_HOURS_ID, NOTIFIED_DATE, DAY, START_TIME, END_TIME, ADMIN_ID) VALUES (14, '2020-10-30', 1, '11:00:00', '19:00:00', 5)

/* Create session data */
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (1, 1, '11:00:00', 'Haircut', '12:00:00', 6)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (2, 2, '10:00:00', 'Haircut', '11:30:00', 6)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (3, 3, '11:00:00', 'Haircut', '13:00:00', 6)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (4, 4, '09:00:00', 'Haircut', '10:30:00', 6)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (5, 5, '09:00:00', 'Haircut', '09:30:00', 6)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (6, 6, '13:00:00', 'Haircut', '14:00:00', 6)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (7, 7, '14:00:00', 'Haircut', '15:00:00', 6)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (8, 1, '12:00:00', 'Haircut', '12:30:00', 6)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (9, 2, '09:00:00', 'Haircut', '10:00:00', 6)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (10, 3, '15:00:00', 'Haircut', '16:00:00', 6)

INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (11, 1, '12:00:00', 'Haircut', '13:00:00', 7)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (12, 2, '10:30:00', 'Haircut', '11:00:00', 7)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (13, 3, '13:00:00', 'Haircut', '13:30:00', 7)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (14, 4, '14:00:00', 'Haircut', '15:30:00', 7)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (15, 5, '10:00:00', 'Haircut', '10:30:00', 7)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (16, 6, '13:00:00', 'Haircut', '14:00:00', 7)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (17, 7, '14:00:00', 'Haircut', '15:00:00', 7)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (18, 4, '12:00:00', 'Haircut', '12:30:00', 7)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (19, 5, '09:00:00', 'Haircut', '09:30:00', 7)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (20, 3, '15:00:00', 'Haircut', '16:00:00', 7)

INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (21, 1, '12:30:00', 'Massage', '13:00:00', 8)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (22, 2, '10:00:00', 'Massage', '11:00:00', 8)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (23, 3, '12:00:00', 'Massage', '13:30:00', 8)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (24, 4, '15:00:00', 'Massage', '16:30:00', 8)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (25, 5, '09:30:00', 'Massage', '11:30:00', 8)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (26, 6, '13:30:00', 'Massage', '15:00:00', 8)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (27, 7, '14:30:00', 'Massage', '15:00:00', 8)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (28, 4, '12:30:00', 'Massage', '13:30:00', 8)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (29, 5, '11:30:00', 'Massage', '12:30:00', 8)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (30, 3, '15:00:00', 'Massage', '16:00:00', 8)

INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (31, 1, '12:00:00', 'Massage', '13:00:00', 9)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (32, 2, '10:30:00', 'Massage', '11:00:00', 9)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (33, 3, '13:00:00', 'Massage', '13:30:00', 9)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (34, 4, '14:00:00', 'Massage', '15:30:00', 9)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (35, 5, '10:00:00', 'Massage', '10:30:00', 9)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (36, 6, '13:00:00', 'Massage', '14:00:00', 9)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (37, 7, '14:00:00', 'Massage', '15:00:00', 9)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (38, 2, '12:00:00', 'Massage', '12:30:00', 9)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (39, 2, '09:00:00', 'Massage', '09:30:00', 9)
INSERT INTO SESSION (SESSION_ID, DAY, START_TIME, SERVICE, END_TIME, WORKER_ID) VALUES (40, 3, '15:00:00', 'Massage', '16:00:00', 9)

/* Create booking data */
INSERT INTO BOOKING (BOOKING_ID, DATE, START_TIME, SERVICE, END_TIME, BOOKING_STATUS, CUSTOMER_ID, WORKER_ID, CONFIRMATION) VALUES (1, '2020-11-06', '13:00:00', 'Haircut', '14:00:00', 'NEW_BOOKING', 3, 6, 'PENDING')
INSERT INTO BOOKING (BOOKING_ID, DATE, START_TIME, SERVICE, END_TIME, BOOKING_STATUS, CUSTOMER_ID, WORKER_ID, CONFIRMATION) VALUES (2, '2020-09-22', '13:00:00', 'Haircut', '13:30:00', 'PAST_BOOKING', 3, 7, 'CONFIRMED')
INSERT INTO BOOKING (BOOKING_ID, DATE, START_TIME, SERVICE, END_TIME, BOOKING_STATUS, CUSTOMER_ID, WORKER_ID, CONFIRMATION) VALUES (3, '2020-09-21', '10:00:00', 'Massage', '11:00:00', 'CANCELLED_BOOKING', 3, 8, 'CANCELLED')
INSERT INTO BOOKING (BOOKING_ID, DATE, START_TIME, SERVICE, END_TIME, BOOKING_STATUS, CUSTOMER_ID, WORKER_ID, CONFIRMATION) VALUES (4, '2020-11-07', '14:00:00', 'Haircut', '15:00:00', 'NEW_BOOKING', 3, 6, 'PENDING')
