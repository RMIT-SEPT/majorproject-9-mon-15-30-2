import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BookingHistory from "../../Components/Customer/BookingHistory";
import { cleanup } from "@testing-library/react";
import axios from 'axios';
import moxios from 'moxios';

Enzyme.configure({ adapter: new Adapter() });

describe('<BookingHistory /> Unit Test', () => 
{
    beforeAll(() => 
    {
        moxios.install();
    });
    afterAll(() => 
    {
        moxios.uninstall();
    });

    beforeEach(() => 
    {
        var stored = {
            success: "true",
            token: "dsfadf",
            id: "1",
            role: "ROLE_CUSTOMER"
        }
        localStorage.setItem("user", JSON.stringify(stored));
    });

    afterEach(() => 
    {
        cleanup;
    });

    it('renders container', () => 
    {
        const wrapper = shallow(<BookingHistory />);
        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.alert')).toHaveLength(1);
    });

    it('render current bookings with role_customer', () => 
    {
        const bookings = 
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
                    },
                    "hibernateLazyInitializer": {}
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
                    },
                    "hibernateLazyInitializer": {}
                },
                "status": "NEW_BOOKING",
                "confirmation": "PENDING",
                "date": "2020-11-07",
                "startTime": "14:00:00",
                "endTime": "15:00:00",
                "service": "Haircut"
            }
        ]

        const wrapper = shallow(<BookingHistory />);
        const instance = wrapper.instance();
        wrapper.setState({pastBookings: bookings});

        expect(wrapper.find('.table')).toHaveLength(1);
        expect(wrapper.find('.th')).toHaveLength(6)
        expect(instance.state.pastBookings.length).toBe(2);
    });

    it('render current bookings with role_admin', () => 
    {
        localStorage.clear();
        var stored = {
            success: "true",
            token: "dsfadf",
            id: "1",
            role: "ROLE_ADMIN"
        }
        localStorage.setItem("user", JSON.stringify(stored));

        const wrapper = shallow(<BookingHistory />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'render');
        instance.render();

        expect(instance.render).toHaveBeenCalled();
        expect(wrapper.find('.container')).toHaveLength(0);
        expect(window.location.pathname).toEqual('/');
    });

    it('past booking length', () => 
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

        const bookinghistorydata = {
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

        const bookinghistory = new BookingHistory();
        bookinghistory.state.pastBookings.push(bookinghistorydata);
        expect(bookinghistory.state.pastBookings).toHaveLength(1);
        expect(bookinghistory.state.pastBookings[0].service).toBe("Haircut");
        expect(bookinghistory.state.pastBookings[0].status).toBe("PAST_BOOKING");
    });

    it('componentDidMount with role_admin', () => 
    {
        localStorage.clear();
        var stored = {
            success: "true",
            token: "dsfadf",
            id: "1",
            role: "ROLE_ADMIN"
        }
        localStorage.setItem("user", JSON.stringify(stored));

        const wrapper = shallow(<BookingHistory />);
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
        const wrapper = shallow(<BookingHistory />);
        const instance = wrapper.instance();
        jest.spyOn(axios, 'get');
        jest.spyOn(instance, 'componentDidMount');
        instance.componentDidMount();

        expect(instance.componentDidMount).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
    });

});