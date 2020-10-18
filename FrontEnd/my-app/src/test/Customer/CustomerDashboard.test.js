import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CustomerDashBoard from "../../Components/Customer/CustomerDashBoard";

Enzyme.configure({ adapter: new Adapter() });

var stored = {
    success: "true",
    token: "dsfadf",
    id: "1",
    role: "ROLE_CUSTOMER"
}

localStorage.setItem("user", JSON.stringify(stored));


describe('<CustomerDashBoard /> Unit Test', () => 
{

    it('renders container', () => 
    {
        const wrapper = shallow(<CustomerDashBoard />);
        expect(wrapper.find('.container')).toHaveLength(0);
    });

    it('renders navbar', () => 
    {
        const wrapper = shallow(<CustomerDashBoard />);
        expect(wrapper.find('.nav-item')).toHaveLength(0);
    });
})