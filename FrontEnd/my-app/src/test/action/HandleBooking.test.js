import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from 'axios';
jest.mock('axios');
Enzyme.configure({ adapter: new Adapter() });
import HandleBookings from '../../actions/HandleBookings';

describe('fetchData', () => {
    it('get new bookings successfully from server', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "id": "5",
                        "customer": {
                            "id": "1",
                            "fName": "Karen",
                            "lName": "Baker",
                            "address": "12 Lee St",
                            "phoneNumber": "123456789",
                            "email": "karen@gmai.com",
                            "hibernateLazyInitializer": {}
                        },
                        "worker": {
                            "id": "7",
                            "fName": "John",
                            "lName": "Smith",
                            "phoneNumber": "0123456789",
                            "admin": {
                                "id": "4",
                                "adminName": "Business 2",
                                "service": "Nails",
                                "hibernateLazyInitializer": {}
                            },
                            "hibernateLazyInitializer": {}
                        },
                        "status": "NEW_BOOKING",
                        "date": "2020-10-29",
                        "startTime": "10:00:00",
                        "endTime": "12:00:00",
                        "service": "Nails"
                    }
                ],
            },
        };
        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleBookings.getNewBookingById("5")).resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/customer/newbookings/5",
        );
    });

    it('get error message from server for no new bookings found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleBookings.getNewBookingById("123")).rejects.toThrow(errorMessage);
    });

    it('get past bookings successfully from server', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "id": "5",
                        "customer": {
                            "id": "1",
                            "fName": "Karen",
                            "lName": "Baker",
                            "address": "12 Lee St",
                            "phoneNumber": "123456789",
                            "email": "karen@gmai.com",
                            "hibernateLazyInitializer": {}
                        },
                        "worker": {
                            "id": "7",
                            "fName": "John",
                            "lName": "Smith",
                            "phoneNumber": "0123456789",
                            "admin": {
                                "id": "4",
                                "adminName": "Business 2",
                                "service": "Nails",
                                "hibernateLazyInitializer": {}
                            },
                            "hibernateLazyInitializer": {}
                        },
                        "status": "PAST_BOOKING",
                        "date": "2020-10-29",
                        "startTime": "10:00:00",
                        "endTime": "12:00:00",
                        "service": "Nails"
                    }
                ],
            },
        };
        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleBookings.getPastBookingById("5")).resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/customer/historybookings/5",
        );
    });

    it('get error message from server for no past bookings found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleBookings.getPastBookingById("123")).rejects.toThrow(errorMessage);
    });

    it('get sessions by worker and service successfully from server', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "date": "2020-09-22",
                        "startTime": "08:30:00",
                        "endTime": "09:30:00"
                    },
                    {
                        "date": "2020-09-24",
                        "startTime": "09:00:00",
                        "endTime": "10:00:00"
                    }
                ],
            },
        };
        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleBookings
            .getAvailableSessionsByWorkerAndService("7", "Haircut"))
            .resolves.toEqual(data);

        expect(axios.get)
            .toHaveBeenCalledWith("http://localhost:8080//customer/makebooking/sessions/7/Haircut",
        );
    });

    it('get error message from server for no sessions found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleBookings
            .getAvailableSessionsByWorkerAndService("123", "123"))
            .rejects.toThrow(errorMessage);
    });
});