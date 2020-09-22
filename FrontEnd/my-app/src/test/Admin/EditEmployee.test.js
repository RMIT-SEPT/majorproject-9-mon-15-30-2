import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EditEmployee from "../../Components/Admin/EditEmployee";

Enzyme.configure({ adapter: new Adapter() });

describe('<EditEmployee /> Unit Test', () => 
{
    it('renders container', () => 
    {
        const id1 = "a";
        const params1 = 
        {
            id: id1
        }
        const match1 = 
        {
            params:params1
        }
        const props1 = 
        {
            match: match1
        }
        const wrapper = shallow(<EditEmployee {...props1}/>);

        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('renders navbar', () => 
    {
        const id1 = "a";
        const params1 = 
        {
            id: id1
        }
        const match1 = 
        {
            params:params1
        }
        const props1 = 
        {
            match: match1
        }
        const wrapper = shallow(<EditEmployee {...props1}/>);
        expect(wrapper.find('.form-group')).toHaveLength(6);
    });
})