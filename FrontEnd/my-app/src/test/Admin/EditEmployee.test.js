import React, { Component } from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EditEmployee from "../../Components/Admin/EditEmployee";
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
const props1 = 
{
    match: match1,
    history: []
}

describe('<EditEmployee /> Unit Test', () => 
{
    it('renders container', () => 
    {

        const wrapper = shallow(<EditEmployee {...props1}/>);

        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('renders navbar', () => 
    {

        const wrapper = shallow(<EditEmployee {...props1}/>);
        expect(wrapper.find('.form-group')).toHaveLength(6);
    });

    it('changeWorkerId', () =>
    {
        const target1 = {
            value: "p1"
        };
        const e1 = {
            target: target1
        };
        const wrapper = mount(<EditEmployee {...props1}/>);
        wrapper.instance().changeWorkerId(e1);
        expect(wrapper.instance().state.id).toBe(target1.value);
    });

    it('changeWorkerFirstName', () =>
    {
        const target1 = {
            value: "p1"
        };
        const e1 = {
            target: target1
        };
        const wrapper = mount(<EditEmployee {...props1}/>);
        wrapper.instance().changeWorkerFirstName(e1);
        expect(wrapper.instance().state.fName).toBe(target1.value);
    });

    it('changeWorkerLastName', () =>
    {
        const target1 = {
            value: "p1"
        };
        const e1 = {
            target: target1
        };
        const wrapper = mount(<EditEmployee {...props1}/>);
        wrapper.instance().changeWorkerLastName(e1);
        expect(wrapper.instance().state.lName).toBe(target1.value);
    });

    it('changeWorkerPhoneNumber', () =>
    {
        const target1 = {
            value: "p1"
        };
        const e1 = {
            target: target1
        };
        const wrapper = mount(<EditEmployee {...props1}/>);
        wrapper.instance().changeWorkerPhoneNumber(e1);
        expect(wrapper.instance().state.phoneNumber).toBe(target1.value);
    });

    it('changeWorkerPassword', () =>
    {
        const target1 = {
            value: "p1"
        };
        const e1 = {
            target: target1
        };
        const wrapper = mount(<EditEmployee {...props1}/>);
        wrapper.instance().changeWorkerPassword(e1);
        expect(wrapper.instance().state.password).toBe(target1.value);
    });

    it('changeWorkerUserName', () =>
    {
        const target1 = {
            value: "p1"
        };
        const e1 = {
            target: target1
        };
        const wrapper = mount(<EditEmployee {...props1}/>);
        wrapper.instance().changeWorkerUserName(e1);
        expect(wrapper.instance().state.username).toBe(target1.value);
    });

    it('cancel', () =>
    {
        const wrapper = mount(<EditEmployee {...props1}/>);
        wrapper.instance().cancel();
        expect(wrapper.instance().props.history).toHaveLength(1);
    });

    it('updateEmployee', () =>
    {

        const responce1 = {
            id: "this.state.id",
            password: "this.state.password",
            fName: "this.state.fName",
            lName: "this.state.lName",
            phoneNumber: "this.state.phoneNumber",
            username: "this.state.username",
            adminId: "4"
        };

        jest.spyOn(axios, 'put').mockResolvedValueOnce(responce1);

        // const newBooking = new NewBookings();
        const wrapper = mount(<EditEmployee {...props1}/>);

        class Ev extends Component{
            constructor(){
                super()
            }

            preventDefault(){}
        }
        const ev = new Ev;
        wrapper.instance().state = responce1;
        wrapper.instance().updateEmployee(ev);

        expect(wrapper.instance().props.history).toHaveLength(1);
        //expect(wrapper.instance().state).toBe(1);
    });
})