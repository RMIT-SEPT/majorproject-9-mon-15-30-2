import React, { Component } from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CreateSession from "../../Components/Admin/CreateSession";
import axios from 'axios';

Enzyme.configure({ adapter: new Adapter() });

const id1 = "1";
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
    match: match1,
    history: []
}

var stored = {
    success:"true",
    token: "token",
    role: "ROLE_ADMIN",
    id:"1" }
    localStorage.setItem("user", JSON.stringify(stored));

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
            day: "1",
            startTime: "12:00",
            endTime: "13:00"
        };
        create.state.day = session1.day;
        create.state.startTime = session1.startTime;
        create.state.endTime = session1.endTime;
        create.state.workerId = worker1.id;
        create.state.allworker.push(worker1);
        
        expect(create.state.allworker[0]).toBe(worker1);
    });

    it('error', () =>
    {
        const create = new CreateSession();
        create.state.error = true;
        const wrapper = shallow(create.render());
        expect(wrapper.find('.error')).toHaveLength(1);
    });

    it('handleDaySelection', () =>
    {
        const target1 = {
            name: "service",
            value: "Wash"
        };

        const e1 = {
            target: target1
        };

        const service1 = {
            key: "a",
            value: "Wash"
        };

        const services = [];
        services.push(service1);

        const responce1 = {
            data: services
        };

        jest.spyOn(axios, 'get').mockResolvedValueOnce(responce1);

        const wrapper = shallow(<CreateSession />);
        
        wrapper.instance().handleDaySelection(e1);

        expect(wrapper.instance().state.service).toBe(target1.value);
    });

    it('onChange', () =>
    {
        const target1 = {
            name: "day",
            value: "name"
        };
        const e1 = {
            target: target1
        };
        const wrapper = shallow(<CreateSession />);
        expect(wrapper.instance().state.day).toBe("");
        wrapper.instance().onChange(e1);
        expect(wrapper.instance().state.day).toBe(target1.value);
    });

});

describe('Test for success push', () => {
    let wrapper;
    const props = {
        day : "1",
        startTime : "12:00",
        endTime : "13:00",
        workerId : "2"
    };

    it('should call onSubmit', () =>
    {
        class Ev extends Component{
            constructor(){
                super();
            }

            preventDefault(){}
        }

        const ev = new Ev();
        wrapper = shallow(<CreateSession {...props}/>);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onSubmit');
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        instance.onSubmit(ev);
        expect(instance.onSubmit).toHaveBeenCalledTimes(1);
        // expect(alert).toHaveBeenCalled();
    });
});

describe('Test for unsuccess push', () => {
    let wrapper;
    const props = {
        day : "",
        startTime : "",
        endTime : "",
        workerId : ""
    };

    it('should call onSubmit', () =>
    {
        class Ev extends Component{
            constructor(){
                super();
            }

            preventDefault(){}
        }
        wrapper = shallow(<CreateSession {...props}/>);
        const ev = new Ev();
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onSubmit');
        jest.spyOn(window, 'alert');
        instance.onSubmit(ev);
        expect(instance.onSubmit).toHaveBeenCalledTimes(1);
    });
});