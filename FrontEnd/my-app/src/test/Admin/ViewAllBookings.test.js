import React, { Component } from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddEmployee from "../../Components/Admin/AddEmployee";
import axios from 'axios';
import ViewAllBookings from "../../Components/Admin/ViewAllBookings";

Enzyme.configure({ adapter: new Adapter() });

describe('<ViewAllBookings /> Unit Test', () =>
{
    it('renders container for no type of bookings found', () =>
    {
        const wrapper = shallow(<ViewAllBookings />);
        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.alert')).toHaveLength(1);
    });
})