import React, { Component } from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddEmployee from "../../Components/Admin/AddEmployee";
import axios from 'axios';
import ViewAllBookings from "../../Components/Admin/ViewAllBookings";
import { Redirect } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

var stored = {
    success: "true",
    token: "dsfadf",
    id: "1",
    role: "ROLE_ADMIN"
}

localStorage.setItem("user", JSON.stringify(stored));

describe('<ViewAllBookings /> Unit Test', () =>
{
    it('renders container for no type of bookings found', () =>
    {
        const wrapper = shallow(<ViewAllBookings />);
        wrapper.instance().render();
        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.alert')).toHaveLength(1);
    });

    it('confirmbooking and axios put', () => 
    {
        const wrapper = shallow(<ViewAllBookings />);
        const instance = wrapper.instance();
        jest.spyOn(axios, 'put');
        jest.spyOn(instance, 'confirmBooking');
        instance.confirmBooking(1, stored.token);

        expect(instance.confirmBooking).toHaveBeenCalled();
        expect(axios.put).toHaveBeenCalled();

    });

    it('rejectbooking and axios put when called handlebookings.confirmBooking', () =>
    {
        const wrapper = shallow(<ViewAllBookings />);
        const instance = wrapper.instance();
        jest.spyOn(axios, 'put');
        jest.spyOn(instance, 'rejectBooking');
        instance.rejectBooking(1, stored.token);

        expect(instance.rejectBooking).toHaveBeenCalled();
        expect(axios.put).toHaveBeenCalled();
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