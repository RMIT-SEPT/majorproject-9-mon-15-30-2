import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from 'axios';
jest.mock('axios');
Enzyme.configure({ adapter: new Adapter() });
import HandleBookings from '../../actions/HandleBookings';

var stored = {
    success: "true",
    token: "dsfadf",
    id: "1",
    role: "ROLE_CUSTOMER"
}

localStorage.setItem("user", JSON.stringify(stored));

describe('fetchData', () => 
{
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
        await expect(HandleBookings.getNewBookingById("5", stored.token)).resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/customer/newbookings/5", {"headers": {"Authorization": "dsfadf"}}
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
        await expect(HandleBookings.getPastBookingById("5", stored.token)).resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/customer/historybookings/5", {"headers": {"Authorization": "dsfadf"}}
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
            .getAvailableSessionsByWorkerAndService("7", "Haircut", stored.token))
            .resolves.toEqual(data);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/customer/makebooking/sessions/7/Haircut", {"headers": {"Authorization": "dsfadf"}}
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

    it('get new booking by admin successfully', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "id": "1",
                        "customer": {
                            "id": "3",
                            "fName": "Tom",
                            "lName": "Hall",
                            "address": "77 Latrobe St, Melbourne, Australia",
                            "phoneNumber": "1117788890",
                            "email": "tomHall@gmail.com",
                            "hibernateLazyInitializer": {}
                        },
                        "worker": {
                            "id": "6",
                            "fName": "Alex",
                            "lName": "Flinn",
                            "phoneNumber": "477889998",
                            "admin": {
                                "id": "4",
                                "adminName": "Melbourne Salon",
                                "service": "Haircut",
                                "hibernateLazyInitializer": {}
                            }
                        },
                        "status": "NEW_BOOKING",
                        "confirmation": "CONFIRMED",
                        "date": "2020-11-06",
                        "startTime": "13:00:00",
                        "endTime": "14:00:00",
                        "service": "Haircut"
                    }
                ],
            },
        };
        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleBookings
            .getNewBookingsByAdminID("4", stored.token))
            .resolves.toEqual(data);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/admin/newBookingsAdmin/4", {"headers": {"Authorization": "dsfadf"}}
        );
    });

    it('get error message from server for no newbookings by admin id is found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleBookings.getNewBookingsByAdminID("1", stored.token))
            .rejects.toThrow(errorMessage);
    });

    it('get past booking by admin successfully', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "id": "1",
                        "customer": {
                            "id": "3",
                            "fName": "Tom",
                            "lName": "Hall",
                            "address": "77 Latrobe St, Melbourne, Australia",
                            "phoneNumber": "1117788890",
                            "email": "tomHall@gmail.com",
                            "hibernateLazyInitializer": {}
                        },
                        "worker": {
                            "id": "6",
                            "fName": "Alex",
                            "lName": "Flinn",
                            "phoneNumber": "477889998",
                            "admin": {
                                "id": "4",
                                "adminName": "Melbourne Salon",
                                "service": "Haircut",
                                "hibernateLazyInitializer": {}
                            }
                        },
                        "status": "PAST_BOOKING",
                        "confirmation": "CONFIRMED",
                        "date": "2020-11-06",
                        "startTime": "13:00:00",
                        "endTime": "14:00:00",
                        "service": "Haircut"
                    }
                ],
            },
        };
        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleBookings
            .getPastBookingsByAdminID("4", stored.token))
            .resolves.toEqual(data);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/admin/pastBookingsAdmin/4", {"headers": {"Authorization": "dsfadf"}}
        );
    });

    it('get error message from server for no pastbooking by admin id is found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleBookings.getPastBookingsByAdminID("1", stored.token))
            .rejects.toThrow(errorMessage);
    });
});