import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BookingHistory from "../BookingHistory.js";

Enzyme.configure({ adapter: new Adapter() });

describe('<BookingHistory /> Unit Test', () => 
{
    it('renders container for no bookings', () => 
    {
        const wrapper = shallow(<BookingHistory />);
        expect(wrapper.hasClass('container')).toEqual(true);
        expect(wrapper.find('.alert')).toHaveLength(1);
    });


    it('renders container', () => 
    {
        const work =
        {
            fname:"name"
        };
        const props = 
        {
            id: "a",
            service: "b",
            worker: work,
            date: "d",
            startTime: "e",
            endTime: "f"
        };
        const history = new BookingHistory();
        history.state.pastBookings.push(props);
        const wrapper = shallow(history.render());

        expect(wrapper.find('.table')).toHaveLength(1);
        expect(wrapper.find('.th')).toHaveLength(6);

    });
    

})
