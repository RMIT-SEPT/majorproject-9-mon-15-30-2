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

var stored = {
    success:"true",
    token: "token",
    role: "ROLE_ADMIN",
    id:"1" }
    localStorage.setItem("user", JSON.stringify(stored))
    // jest.spyOn(JSON, 'parse').mockImplementation(() => {
    //     return stored;
    // });

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
        expect(wrapper.find('.form-group')).toHaveLength(5);
    });

    it('changeWorkerId', () =>
    {
        const target1 = {
            value: "p1"
        };
        const e1 = {
            target: target1
        };
        const wrapper = shallow(<EditEmployee {...props1}/>);
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
        const wrapper = shallow(<EditEmployee {...props1}/>);
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
        const wrapper = shallow(<EditEmployee {...props1}/>);
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
        const wrapper = shallow(<EditEmployee {...props1}/>);
        wrapper.instance().changeWorkerPhoneNumber(e1);
        expect(wrapper.instance().state.phoneNumber).toBe(target1.value);
    });

    it('changeWorkerUserName', () =>
    {
        const target1 = {
            value: "p1"
        };
        const e1 = {
            target: target1
        };
        const wrapper = shallow(<EditEmployee {...props1}/>);
        wrapper.instance().changeWorkerUserName(e1);
        expect(wrapper.instance().state.username).toBe(target1.value);
    });

    it('cancel', () =>
    {
        const wrapper = shallow(<EditEmployee {...props1}/>);
        wrapper.instance().cancel();
        expect(wrapper.instance().props.history).toHaveLength(1);
    });

    it('updateEmployee', () =>
    {
        const responce1 = {
            id: "3",
            password: "this.state.password",
            fName: "fName",
            lName: "lName",
            phoneNumber: "1234567890",
            username: "user1",
            adminId: "4"
        };

        jest.spyOn(axios, 'put').mockResolvedValueOnce(responce1);
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        const wrapper = shallow(<EditEmployee {...props1}/>);

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
        expect(axios.put).toHaveBeenCalled();
        
    });
});

describe('Test for success update and alert message', () => {
    let wrapper;
    const props = {
        id: "3",
        password: "this.state.password",
        fName: "fName",
        lName: "lName",
        phoneNumber: "1234567890",
        username: "user1",
        adminId: "4"
    };

    beforeEach(() => {
        wrapper = shallow(<EditEmployee {...props} {...props1}/>);
    });

    it('should call onSubmit', () =>
    {
        class Ev extends Component{
            constructor(){
                super();
            }

            preventDefault(){}
        }

        const ev = new Ev();
        const instance = wrapper.instance();
        jest.spyOn(instance, 'updateEmployee');
        instance.updateEmployee(ev);
        expect(instance.updateEmployee).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalledWith("Employee details are updated successfully");
    });
});
