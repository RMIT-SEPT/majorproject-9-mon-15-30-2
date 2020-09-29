import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CustomerDashBoard from "../../Components/Customer/CustomerDashBoard";

Enzyme.configure({ adapter: new Adapter() });

describe('<AdminDashboard /> Unit Test', () => 
{
    it('renders container', () => 
    {
        const wrapper = shallow(<CustomerDashBoard />);
        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('renders navbar', () => 
    {
        const wrapper = shallow(<CustomerDashBoard />);
        expect(wrapper.find('.nav-item')).toHaveLength(7);
    });
})