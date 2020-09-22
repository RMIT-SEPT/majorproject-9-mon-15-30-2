import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Employees from "../../Components/Admin/Employees";

Enzyme.configure({ adapter: new Adapter() });

describe('<Employees /> Unit Test', () => 
{
    it('renders alert', () => 
    {
        const wrapper = shallow(<Employees />);
        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.alert')).toHaveLength(1);
        expect(wrapper.find('.table')).toHaveLength(0);
        expect(wrapper.find('.th')).toHaveLength(0);
        expect(wrapper.find('.username')).toHaveLength(0);
        expect(wrapper.find('.fName')).toHaveLength(0);
        expect(wrapper.find('.lName')).toHaveLength(0);
        expect(wrapper.find('.phoneNumber')).toHaveLength(0);
    });

    it('renders table', () => 
    {
        const employee1 = 
        {
            id: "id",
            username: "username",
            fName: "fname",
            lName: "lname",
            phoneNumber: "phone"
        }

        const employees = new Employees();
        employees.state.allemployee.push(employee1);
        const wrapper = mount(employees.render());

        expect(wrapper.find('.container')).toHaveLength(2);
        expect(wrapper.find('.alert')).toHaveLength(0);
        expect(wrapper.find('.table')).toHaveLength(2);
        expect(wrapper.find('.th')).toHaveLength(4);
        expect(wrapper.find('.username')).toHaveLength(1);
        expect(wrapper.find('.fName')).toHaveLength(1);
        expect(wrapper.find('.lName')).toHaveLength(1);
        expect(wrapper.find('.phoneNumber')).toHaveLength(1);

    });
})