import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AdminHomePage from "../../Components/Admin/AdminHomePage";

Enzyme.configure({ adapter: new Adapter() });

var stored = {
    role: "ROLE_ADMIN"
}
jest.spyOn(JSON, 'parse').mockImplementation(() => {
    return stored;
});

describe('<AdminHomePage /> Unit Test', () => 
{

    it('renders container', () => 
    {
        const wrapper = shallow(<AdminHomePage />);
        expect(JSON.parse).toHaveBeenCalled();
        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('renders buttons', () => 
    {
        const wrapper = shallow(<AdminHomePage />);
        expect(wrapper.find('.col')).toHaveLength(2);
    });
})