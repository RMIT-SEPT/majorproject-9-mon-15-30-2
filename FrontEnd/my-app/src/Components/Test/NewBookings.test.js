import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NewBookings from "../NewBookings.js";

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
        expect(wrapper.hasClass('container')).toEqual(true);
    });

    it('renders 4 form-groups', () =>
    {
        const wrapper = shallow(<NewBookings />);
        expect(wrapper.find('.form-group')).toHaveLength(4);
    });

})
