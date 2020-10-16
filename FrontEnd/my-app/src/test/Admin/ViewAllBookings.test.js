import React, { Component } from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddEmployee from "../../Components/Admin/AddEmployee";
import axios from 'axios';
import ViewAllBookings from "../../Components/Admin/ViewAllBookings";
import { Redirect } from "react-router-dom";
import { cleanup } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

describe('<ViewAllBookings /> Unit Test', () =>
{
    beforeEach(() => 
    {
        var stored = {
            success: "true",
            token: "dsfadf",
            id: "1",
            role: "ROLE_ADMIN"
        }
        
        localStorage.setItem("user", JSON.stringify(stored));
    });

    afterEach(() => 
    {
        cleanup;
    });

    it('render with customer_role', () => 
    {
        localStorage.clear()
        var stored = {
            success: "true",
            token: "dsfadf",
            id: "1",
            role: "ROLE_CUSTOMER"
        }
        localStorage.setItem("user", JSON.stringify(stored));

        const wrapper = shallow(<ViewAllBookings />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'render');
        instance.render();

        expect(instance.render).toHaveBeenCalled();
        expect(window.location.pathname).toEqual("/");
    });

    it('renders container for no type of bookings found', () =>
    {
        const wrapper = shallow(<ViewAllBookings />);
        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.alert')).toHaveLength(1);
    });

    it('renders with pending bookings', () => 
    {
        const bookingpending = 
        [
            {
                "id": "1",
                "customer": {
                    "id": "3",
                    "fName": "Tom",
                    "lName": "Hall",
                    "address": "77 Latrobe St, Melbourne, Australia",
                    "phoneNumber": "0117788891",
                    "email": "tomHall@gmail.com",
                    "hibernateLazyInitializer": {}
                },
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
                    "admin": {
                        "id": "4",
                        "adminName": "Melbourne Salon",
                        "service": "Haircut",
                        "hibernateLazyInitializer": {}
                    }
                },
                "status": "NEW_BOOKING",
                "confirmation": "PENDING",
                "date": "2020-11-06",
                "startTime": "13:00:00",
                "endTime": "14:00:00",
                "service": "Haircut"
            },
            {
                "id": "4",
                "customer": {
                    "id": "3",
                    "fName": "Tom",
                    "lName": "Hall",
                    "address": "77 Latrobe St, Melbourne, Australia",
                    "phoneNumber": "0117788891",
                    "email": "tomHall@gmail.com",
                    "hibernateLazyInitializer": {}
                },
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
                    "admin": {
                        "id": "4",
                        "adminName": "Melbourne Salon",
                        "service": "Haircut",
                        "hibernateLazyInitializer": {}
                    }
                },
                "status": "NEW_BOOKING",
                "confirmation": "PENDING",
                "date": "2020-11-07",
                "startTime": "14:00:00",
                "endTime": "15:00:00",
                "service": "Haircut"
            }
        ]

        const wrapper = shallow(<ViewAllBookings />);
        wrapper.setState({pendingbookings: bookingpending});

        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.table')).toHaveLength(1);
        expect(wrapper.find('.th')).toHaveLength(8);
        expect(wrapper.find('.btn')).toHaveLength(4);
        expect(wrapper.find('.alert')).toHaveLength(2);
        expect(wrapper.find('.alert').first().text()).toEqual('No New Bookings');
        expect(wrapper.find('.alert').last().text()).toEqual('No Past Bookings');
    });

    it('redners with pending bookings and newbookings', () => 
    {
        const bookingpending = 
        [
            {
                "id": "1",
                "customer": {
                    "id": "3",
                    "fName": "Tom",
                    "lName": "Hall",
                    "address": "77 Latrobe St, Melbourne, Australia",
                    "phoneNumber": "0117788891",
                    "email": "tomHall@gmail.com",
                    "hibernateLazyInitializer": {}
                },
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
                    "admin": {
                        "id": "4",
                        "adminName": "Melbourne Salon",
                        "service": "Haircut",
                        "hibernateLazyInitializer": {}
                    }
                },
                "status": "NEW_BOOKING",
                "confirmation": "PENDING",
                "date": "2020-11-06",
                "startTime": "13:00:00",
                "endTime": "14:00:00",
                "service": "Haircut"
            },
            {
                "id": "4",
                "customer": {
                    "id": "3",
                    "fName": "Tom",
                    "lName": "Hall",
                    "address": "77 Latrobe St, Melbourne, Australia",
                    "phoneNumber": "0117788891",
                    "email": "tomHall@gmail.com",
                    "hibernateLazyInitializer": {}
                },
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
                    "admin": {
                        "id": "4",
                        "adminName": "Melbourne Salon",
                        "service": "Haircut",
                        "hibernateLazyInitializer": {}
                    }
                },
                "status": "NEW_BOOKING",
                "confirmation": "PENDING",
                "date": "2020-11-07",
                "startTime": "14:00:00",
                "endTime": "15:00:00",
                "service": "Haircut"
            }
        ]
        const bookingnew = 
        [
            {
                "id": "1",
                "customer": {
                    "id": "3",
                    "fName": "Tom",
                    "lName": "Hall",
                    "address": "77 Latrobe St, Melbourne, Australia",
                    "phoneNumber": "0117788891",
                    "email": "tomHall@gmail.com",
                    "hibernateLazyInitializer": {}
                },
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
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
            },
            {
                "id": "4",
                "customer": {
                    "id": "3",
                    "fName": "Tom",
                    "lName": "Hall",
                    "address": "77 Latrobe St, Melbourne, Australia",
                    "phoneNumber": "0117788891",
                    "email": "tomHall@gmail.com",
                    "hibernateLazyInitializer": {}
                },
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
                    "admin": {
                        "id": "4",
                        "adminName": "Melbourne Salon",
                        "service": "Haircut",
                        "hibernateLazyInitializer": {}
                    }
                },
                "status": "NEW_BOOKING",
                "confirmation": "CONFIRMED",
                "date": "2020-11-07",
                "startTime": "14:00:00",
                "endTime": "15:00:00",
                "service": "Haircut"
            }
        ]

        const wrapper = shallow(<ViewAllBookings />);
        wrapper.setState({pendingbookings: bookingpending});
        wrapper.setState({newbookings: bookingnew});

        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.table')).toHaveLength(2);
        expect(wrapper.find('.th')).toHaveLength(16);
        expect(wrapper.find('.btn')).toHaveLength(4);
        expect(wrapper.find('.alert')).toHaveLength(1);
        expect(wrapper.find('.alert').text()).toEqual('No Past Bookings');
    });

    it('render with all types of bookings', () => 
    {
        const bookingpending = 
        [
            {
                "id": "1",
                "customer": {
                    "id": "3",
                    "fName": "Tom",
                    "lName": "Hall",
                    "address": "77 Latrobe St, Melbourne, Australia",
                    "phoneNumber": "0117788891",
                    "email": "tomHall@gmail.com",
                    "hibernateLazyInitializer": {}
                },
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
                    "admin": {
                        "id": "4",
                        "adminName": "Melbourne Salon",
                        "service": "Haircut",
                        "hibernateLazyInitializer": {}
                    }
                },
                "status": "NEW_BOOKING",
                "confirmation": "PENDING",
                "date": "2020-11-06",
                "startTime": "13:00:00",
                "endTime": "14:00:00",
                "service": "Haircut"
            },
            {
                "id": "4",
                "customer": {
                    "id": "3",
                    "fName": "Tom",
                    "lName": "Hall",
                    "address": "77 Latrobe St, Melbourne, Australia",
                    "phoneNumber": "0117788891",
                    "email": "tomHall@gmail.com",
                    "hibernateLazyInitializer": {}
                },
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
                    "admin": {
                        "id": "4",
                        "adminName": "Melbourne Salon",
                        "service": "Haircut",
                        "hibernateLazyInitializer": {}
                    }
                },
                "status": "NEW_BOOKING",
                "confirmation": "PENDING",
                "date": "2020-11-07",
                "startTime": "14:00:00",
                "endTime": "15:00:00",
                "service": "Haircut"
            }
        ]
        const bookingnew = 
        [
            {
                "id": "1",
                "customer": {
                    "id": "3",
                    "fName": "Tom",
                    "lName": "Hall",
                    "address": "77 Latrobe St, Melbourne, Australia",
                    "phoneNumber": "0117788891",
                    "email": "tomHall@gmail.com",
                    "hibernateLazyInitializer": {}
                },
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
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
            },
            {
                "id": "4",
                "customer": {
                    "id": "3",
                    "fName": "Tom",
                    "lName": "Hall",
                    "address": "77 Latrobe St, Melbourne, Australia",
                    "phoneNumber": "0117788891",
                    "email": "tomHall@gmail.com",
                    "hibernateLazyInitializer": {}
                },
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
                    "admin": {
                        "id": "4",
                        "adminName": "Melbourne Salon",
                        "service": "Haircut",
                        "hibernateLazyInitializer": {}
                    }
                },
                "status": "NEW_BOOKING",
                "confirmation": "CONFIRMED",
                "date": "2020-11-07",
                "startTime": "14:00:00",
                "endTime": "15:00:00",
                "service": "Haircut"
            }
        ]
        const bookingpast = 
        [
            {
                "id": "1",
                "customer": {
                    "id": "3",
                    "fName": "Tom",
                    "lName": "Hall",
                    "address": "77 Latrobe St, Melbourne, Australia",
                    "phoneNumber": "0117788891",
                    "email": "tomHall@gmail.com",
                    "hibernateLazyInitializer": {}
                },
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
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
            },
            {
                "id": "4",
                "customer": {
                    "id": "3",
                    "fName": "Tom",
                    "lName": "Hall",
                    "address": "77 Latrobe St, Melbourne, Australia",
                    "phoneNumber": "0117788891",
                    "email": "tomHall@gmail.com",
                    "hibernateLazyInitializer": {}
                },
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
                    "admin": {
                        "id": "4",
                        "adminName": "Melbourne Salon",
                        "service": "Haircut",
                        "hibernateLazyInitializer": {}
                    }
                },
                "status": "PAST_BOOKING",
                "confirmation": "CONFIRMED",
                "date": "2020-11-07",
                "startTime": "14:00:00",
                "endTime": "15:00:00",
                "service": "Haircut"
            }
        ]

        const wrapper = shallow(<ViewAllBookings />);
        wrapper.setState({pendingbookings: bookingpending});
        wrapper.setState({newbookings: bookingnew});
        wrapper.setState({pastbookings: bookingpast});

        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.table')).toHaveLength(3);
        expect(wrapper.find('.th')).toHaveLength(24);
        expect(wrapper.find('.btn')).toHaveLength(4);
        expect(wrapper.find('.alert')).toHaveLength(0);
    });

    it('confirmbooking and axios put', () => 
    {
        const wrapper = shallow(<ViewAllBookings />);
        const instance = wrapper.instance();
        jest.spyOn(axios, 'put');
        jest.spyOn(instance, 'confirmBooking');
        instance.confirmBooking(1, "token");

        expect(instance.confirmBooking).toHaveBeenCalled();
        expect(axios.put).toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
    });

    it('rejectbooking and axios put when called handlebookings.confirmBooking', () =>
    {
        const wrapper = shallow(<ViewAllBookings />);
        const instance = wrapper.instance();
        jest.spyOn(axios, 'put');
        jest.spyOn(instance, 'rejectBooking');
        instance.rejectBooking(1, "token");

        expect(instance.rejectBooking).toHaveBeenCalled();
        expect(axios.put).toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
    });

    it('componentDidMount with customer_role', () => 
    {
        localStorage.clear()
        var stored = {
            success: "true",
            token: "dsfadf",
            id: "1",
            role: "ROLE_CUSTOMER"
        }
        localStorage.setItem("user", JSON.stringify(stored));

        const wrapper = shallow(<ViewAllBookings />);
        const instance = wrapper.instance();
        jest.spyOn(axios, 'get');
        jest.spyOn(instance, 'componentDidMount');
        instance.componentDidMount();

        expect(instance.componentDidMount).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledTimes(0);
        expect(window.location.pathname).toEqual('/');
    });

    it('componentDidMount and axios get when call to get bookings', () => 
    {
        const wrapper = shallow(<ViewAllBookings />);
        const instance = wrapper.instance();
        jest.spyOn(axios, 'get');
        jest.spyOn(instance, 'componentDidMount');
        instance.componentDidMount();

        expect(instance.componentDidMount).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
    });

    it('push to newbooking state', () => 
    {
        const customer = {
        address: "77 Latrobe St, Melbourne, Australia",
        email: "tomHall@gmail.com",
        fName: "Tom",
        id: "3",
        lName: "Hall",
        phoneNumber: "1117788890"
        }
        const admin = {
            id: "4", 
            adminName: "Melbourne Salon", 
            service: "Haircut"
        }
        const worker =
        {
            admin: admin,
            fname:"john",
            id: "7",
            lName: "Smith",
            phoneNumber: "499887722"
        };
        const currentbookingdata = {
            confirmation: "CONFIRMED",
            customer: customer,
            date: "2020-09-22",
            endTime: "13:30:00",
            id: "2",
            service: "Haircut",
            startTime: "13:00:00",
            status: "NEW_BOOKING",
            worker: worker
        };
        const viewbooking = new ViewAllBookings();
        viewbooking.state.newbookings.push(currentbookingdata);
        viewbooking.render();

        const wrapper = shallow(<ViewAllBookings />);

        expect(viewbooking.state.newbookings).toHaveLength(1);
        expect(viewbooking.state.newbookings[0].status).toBe("NEW_BOOKING");
    });

    it('push to pastbooking state', () => 
    {
        const customer = {
        address: "77 Latrobe St, Melbourne, Australia",
        email: "tomHall@gmail.com",
        fName: "Tom",
        id: "3",
        lName: "Hall",
        phoneNumber: "1117788890"
        }
        const admin = {
            id: "4", 
            adminName: "Melbourne Salon", 
            service: "Haircut"
        }
        const worker =
        {
            admin: admin,
            fname:"john",
            id: "7",
            lName: "Smith",
            phoneNumber: "499887722"
        };
        const pastbookingdata = {
            confirmation: "CONFIRMED",
            customer: customer,
            date: "2020-09-22",
            endTime: "13:30:00",
            id: "2",
            service: "Haircut",
            startTime: "13:00:00",
            status: "PAST_BOOKING",
            worker: worker
        };
        const viewbooking = new ViewAllBookings();
        viewbooking.state.pastbookings.push(pastbookingdata);
        viewbooking.render();

        expect(viewbooking.state.pastbookings).toHaveLength(1);
        expect(viewbooking.state.pastbookings[0].status).toBe("PAST_BOOKING");
    });

    it('push to pending state', () => 
    {
        const customer = {
        address: "77 Latrobe St, Melbourne, Australia",
        email: "tomHall@gmail.com",
        fName: "Tom",
        id: "3",
        lName: "Hall",
        phoneNumber: "1117788890"
        }
        const admin = {
            id: "4", 
            adminName: "Melbourne Salon", 
            service: "Haircut"
        }
        const worker =
        {
            admin: admin,
            fname:"john",
            id: "7",
            lName: "Smith",
            phoneNumber: "499887722"
        };
        const pendingbookingdata = {
            confirmation: "PENDING",
            customer: customer,
            date: "2020-09-22",
            endTime: "13:30:00",
            id: "2",
            service: "Haircut",
            startTime: "13:00:00",
            status: "NEW_BOOKING",
            worker: worker
        };
        const viewbooking = new ViewAllBookings();
        viewbooking.state.pendingbookings.push(pendingbookingdata);
        viewbooking.render();

        const wrapper = shallow(<ViewAllBookings />);

        expect(viewbooking.state.pendingbookings).toHaveLength(1);
        expect(viewbooking.state.pendingbookings[0].confirmation).toBe("PENDING");
    });


})