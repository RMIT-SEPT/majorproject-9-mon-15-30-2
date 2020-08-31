import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddEmployee from "./AddEmployee.js";

Enzyme.configure({ adapter: new Adapter() });

describe('<AddEmployee /> Unit Test', () => 
{
    it('able to submit form', () =>
    {
        const add = new AddEmployee();
        expect(add.onSubmit).toHaveLength(1);
    });

    it('renders container', () => 
    {
        const wrapper = shallow(<AddEmployee />);
        expect(wrapper.hasClass('container')).toEqual(true);
    });

    it('renders 2 form-groups', () =>
    {
        const wrapper = shallow(<AddEmployee />);
        expect(wrapper.find('.form-group')).toHaveLength(2);
    });

})
