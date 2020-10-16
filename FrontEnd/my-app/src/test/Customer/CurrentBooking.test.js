import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CurrentBookings from "../../Components/Customer/CurrentBookings";
import axios from 'axios';
import { cleanup } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

describe('<CurrentBooking /> Unit Test', () => 
{
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
        cleanup();
    });

    it('renders container', () => 
    {
        const wrapper = shallow(<CurrentBookings />);
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

        const wrapper = shallow(<CurrentBookings />);
        const instance = wrapper.instance();
        wrapper.setState({currentBookings: bookings});

        expect(wrapper.find('.table')).toHaveLength(1);
        expect(wrapper.find('.th')).toHaveLength(8)
        expect(wrapper.find('.btn')).toHaveLength(2);
        expect(instance.state.currentBookings.length).toBe(2);
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

        const wrapper = shallow(<CurrentBookings />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'render');
        instance.render();

        expect(instance.render).toHaveBeenCalled();
        expect(wrapper.find('.container')).toHaveLength(0);
        expect(window.location.pathname).toEqual('/');
    });

    it('testing currentbooking', () => 
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
        const current = new CurrentBookings();
        current.state.currentBookings.push(currentbookingdata);

        expect(current.state.currentBookings).toHaveLength(1);
        expect(current.state.currentBookings[0].status).toBe("NEW_BOOKING");
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

        const wrapper = shallow(<CurrentBookings />);
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
        const wrapper = shallow(<CurrentBookings />);
        const instance = wrapper.instance();
        jest.spyOn(axios, 'get');
        jest.spyOn(instance, 'componentDidMount');
        instance.componentDidMount();

        expect(instance.componentDidMount).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
    });

    it('cancelbooking and axios put when call cancel booking', () => 
    {
        const wrapper = shallow(<CurrentBookings />);
        const instance = wrapper.instance();

        jest.spyOn(window, 'alert');
        jest.spyOn(instance, 'cancelbooking');
        jest.spyOn(axios, 'put');
        instance.cancelbooking(1);

        expect(instance.cancelbooking).toHaveBeenCalled();
        expect(axios.put).toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
    });

});

