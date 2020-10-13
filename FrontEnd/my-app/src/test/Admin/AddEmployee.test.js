import React, { Component } from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddEmployee from "../../Components/Admin/AddEmployee";
import axios from 'axios';

Enzyme.configure({ adapter: new Adapter() });

var stored = {
    success:"true",
    token: "token",
    role: "ROLE_ADMIN",
    id:"1" }
    localStorage.setItem("user", JSON.stringify(stored))
    jest.spyOn(JSON, 'parse').mockImplementation(() => {
        return stored;
    });


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
        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('renders 5 form-groups', () =>
    {
        const wrapper = shallow(<AddEmployee />);
        expect(wrapper.find('.form-group')).toHaveLength(5);
    });

    it('onChange', () =>
    {
        const target1 = {
            name: "id",
            value: "name"
        };
        const e1 = {
            target: target1
        };
        const wrapper = shallow(<AddEmployee />);
        expect(wrapper.instance().state.id).toBe("");
        wrapper.instance().onChange(e1);
        expect(wrapper.instance().state.id).toBe(target1.value);
    });

    it('onSubmit', () =>
    {
        const wrapper = shallow(<AddEmployee />);
        const responce1 = {
            id: "1",
            password: "this.state.password",
            fName: "fName",
            lName: "lName",
            phoneNumber: "0912123842",
            username: "this.state.u",
            adminId: "4"
        };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(responce1);
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        class Ev extends Component{
            constructor(){
                super()
            }

            preventDefault(){}
        }

        const ev = new Ev();
        wrapper.instance().state = responce1;
        wrapper.instance().onSubmit(ev);
        expect(axios.post).toHaveBeenCalled();
    });
});

describe('If onSubmit, alert are being called and successfully pushed', () => {
    let wrapper;
    const props = {
        id: "1",
        password: "this.state.password",
        fName: "fName",
        lName: "lName",
        phoneNumber: "0912123842",
        username: "this.state.u",
        adminId: "4"
    };

    beforeEach(() => {
        wrapper = shallow(<AddEmployee {...props}/>);
        
    });

    it('should call onSubmit', () =>
    {
        class Ev extends Component{
            constructor(){
                super()
            }

            preventDefault(){}
        }

        const ev = new Ev();
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onSubmit');
        jest.spyOn(window, 'alert');
        instance.onSubmit(ev);
        expect(instance.onSubmit).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith("Employee successfully created");
    });
});

describe('If onSubmit, alert are being called and unsuccessfully pushed', () => {

    let wrapperfail;
    const failprops = {
        id: "",
        password: "",
        fName: "",
        lName: "",
        phoneNumber: "",
        username: "",
        adminId: ""
    };

    beforeEach(() => {
        wrapperfail = shallow(<AddEmployee {...failprops}/>);
    });

    it('should call onSubmit and fail', () =>
    {
        class Ev extends Component{
            constructor(){
                super()
            }

            preventDefault(){}
        }

        const ev = new Ev();
        const instance = wrapperfail.instance();
        jest.spyOn(instance, 'onSubmit');
        jest.spyOn(window, 'alert');
        instance.onSubmit(ev);
        expect(instance.onSubmit).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalled();
    });
});


