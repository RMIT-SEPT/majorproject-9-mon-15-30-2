import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CustomerHomePage from "../../Components/Customer/CustomerHomePage";

Enzyme.configure({ adapter: new Adapter() });

describe('<CustomerHomePage /> Unit Test', () => 
{
    var stored = {
        role: "ROLE_CUSTOMER"
    }

    it('renders container', () => 
    {
        jest.spyOn(JSON, 'parse').mockImplementation(() => 
        {
            return stored
        });
        const wrapper = shallow(<CustomerHomePage />);
        
        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('renders navbar', () => 
    {
        const wrapper = shallow(<CustomerHomePage />);
        expect(wrapper.find('.col')).toHaveLength(2);
    });
})