import React, { Component } from "react";
import {shallow, mount, ShallowWrapper} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Employees from "../../Components/Admin/Employees";
import axios from 'axios';

Enzyme.configure({ adapter: new Adapter() });

const id1 = "a";
const params1 = 
{
    id: id1
}
const match1 = 
{
    params:params1
}

var stored = {
    success:"true",
    token: "token",
    role: "ROLE_ADMIN",
    id:"1" }
    localStorage.setItem("user", JSON.stringify(stored))

class Ev extends Component{
    constructor(){
        super()
    }

    preventDefault(){}
}

const employee1 = 
{
    id: id1
}
const responce1 = {
    allemployee:[ employee1]
};

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
        const employee2 = 
        {
            id: "id",
            username: "username",
            fName: "fname",
            lName: "lname",
            phoneNumber: "phone"
        }
        
        const allemployee = [ employee2 ];

        const wrapper = shallow(<Employees {...allemployee}/>);
        wrapper.instance().state.allemployee.push(employee2);

        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.table')).toHaveLength(2);
        expect(wrapper.find('.th')).toHaveLength(4);
        expect(wrapper.find('.username')).toHaveLength(1);
        expect(wrapper.find('.fName')).toHaveLength(1);
        expect(wrapper.find('.lName')).toHaveLength(1);
        expect(wrapper.find('.phoneNumber')).toHaveLength(1);

    });

    it('deleteWorker', () =>
    {
        jest.spyOn(axios, 'delete').mockResolvedValueOnce(responce1);
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        jest.spyOn(console, 'log').mockImplementation(() => {});

        // const newBooking = new NewBookings();
        const props1 = 
        {
            match: match1,
            history: []
        }
        const wrapper = shallow(<Employees {...props1}/>);

        const ev = new Ev;
        wrapper.instance().state.allemployee.push(employee1);
        wrapper.instance().deleteWorker();

        expect(axios.delete).toHaveBeenCalled();

        expect(wrapper.instance().state).toStrictEqual(responce1);
        expect(console.log).toHaveBeenCalled();

        expect(wrapper.instance().props.history).toHaveLength(0);
    });

    it('editWorker', () =>
    {
        jest.spyOn(axios, 'delete').mockResolvedValueOnce(responce1);

        const props1 = 
        {
            match: match1,
            history: []
        }
        const wrapper = shallow(<Employees {...props1}/>);

        const ev = new Ev;
        wrapper.instance().state.allemployee.push(employee1);
        wrapper.instance().editWorker(id1);

        expect(wrapper.instance().props.history).toHaveLength(1);
    });
})