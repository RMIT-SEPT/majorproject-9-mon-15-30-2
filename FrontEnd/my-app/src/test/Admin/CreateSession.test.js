import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CreateSession from "../../Components/Admin/CreateSession";

Enzyme.configure({ adapter: new Adapter() });

describe('<CreateSession /> Unit Test', () => 
{
    it('able to submit form', () =>
    {
        const create = new CreateSession();
        expect(create.onSubmit).toHaveLength(1);
    });

    it('renders container', () => 
    {
        const wrapper = shallow(<CreateSession />);
        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('renders 4 form-groups', () =>
    {
        const wrapper = shallow(<CreateSession />);
        expect(wrapper.find('.form-group')).toHaveLength(4);
        expect(wrapper.find('.service')).toHaveLength(0);
        expect(wrapper.find('.worker')).toHaveLength(0);
        expect(wrapper.find('.sessionDate')).toHaveLength(0);
        expect(wrapper.find('.sessionStart')).toHaveLength(0);
    });

    it('renders services, workers and sessions', () =>
    {
        const create = new CreateSession();
        const worker1 = 
        {
            id: "id",
            fname: "fname",
            lName: "lname",
        };
        const session1 = 
        {
            id: "id1",
            day: "date",
            startTime: "start",
            endTime: "end"
        };
        create.state.day = session1.day;
        create.state.startTime = session1.startTime;
        create.state.endTime = session1.endTime;
        create.state.workerId = worker1.id;
        create.state.allworker.push(worker1);
        const wrapper = mount(create.render());
        
        expect(wrapper.find('.workerId')).toHaveLength(1);
        expect(wrapper.find('.day')).toHaveLength(7);
    });

})
