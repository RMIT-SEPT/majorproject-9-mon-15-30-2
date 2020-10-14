import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AdminDashboard from "../../Components/Admin/AdminDashboard";

Enzyme.configure({ adapter: new Adapter() });

describe('<AdminDashboard /> Unit Test', () => 
{
    it('renders container', () => 
    {
        const wrapper = shallow(<AdminDashboard />);
        expect(wrapper.find('.container')).toHaveLength(0);
    });

    it('renders navbar', () => 
    {
        const wrapper = shallow(<AdminDashboard />);
        expect(wrapper.find('.nav-item')).toHaveLength(0);
    });
})