import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NewBookings from "../Components/CreateNewBooking/NewBooking";

Enzyme.configure({ adapter: new Adapter() });

describe('<NewBookings /> Unit Test', () => 
{
    it('able to submit form', () =>
    {
        const booking = new NewBookings();
        expect(booking.onSubmit).toHaveLength(1);
    });

    it('renders container', () => 
    {
        const wrapper = shallow(<NewBookings />);
        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('renders 5 form-groups', () =>
    {
        const wrapper = shallow(<NewBookings />);
        expect(wrapper.find('.form-group')).toHaveLength(5);
        expect(wrapper.find('.service')).toHaveLength(0);
        expect(wrapper.find('.worker')).toHaveLength(0);
        expect(wrapper.find('.sessionDate')).toHaveLength(0);
        expect(wrapper.find('.sessionStart')).toHaveLength(0);
    });

    it('renders services, workers and sessions', () =>
    {
        const newBookings = new NewBookings();
        const worker1 = 
        {
            id: "id",
            fname: "fname",
            lName: "lname",
        };
        const session1 = 
        {
            id: "id1",
            date: "date",
            startTime: "start",
            endTime: "end"
        };
        const service1 = "service";
        const status1 = "status";
        newBookings.state.status = status1; 
        newBookings.state.service = service1;
        newBookings.state.date = session1.date;
        newBookings.state.startTime = session1.startTime;
        newBookings.state.endTime = session1.endTime;
        newBookings.state.worker = worker1;
        newBookings.state.allservices.push(service1);
        newBookings.state.allworker.push(worker1);
        newBookings.state.availableSessions.push(session1);
        const wrapper = mount(newBookings.render());
        
        expect(wrapper.find('.service')).toHaveLength(1);
        expect(wrapper.find('.worker')).toHaveLength(1);
        expect(wrapper.find('.sessionDate')).toHaveLength(1);
        expect(wrapper.find('.sessionStart')).toHaveLength(1);
    });

    it('handleServiceChange', () =>
    {
        const newBookings = new NewBookings();
        const target1 = {
            name: "n",
            value: "v"
        };
        const e1 = {
            target: target1
        };
        newBookings.handleServiceChange(e1);
        
        expect(newBookings.state.allworker).toHaveLength(1);
        
    });

})
