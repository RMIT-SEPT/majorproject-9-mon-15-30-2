import React, { Component } from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AddEmployee from "../../Components/Admin/AddEmployee";
import axios from 'axios';

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
        const wrapper = mount(<AddEmployee />);
        expect(wrapper.instance().state.id).toBe("");
        wrapper.instance().onChange(e1);
        expect(wrapper.instance().state.id).toBe(target1.value);
    });

    it('onSubmit', () =>
    {

        const responce1 = {
            id: "this.state.id",
            password: "this.state.password",
            fName: "fName",
            lName: "lName",
            phoneNumber: "0912123842",
            username: "this.state.u",
            adminId: "4"
        };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(responce1);
        jest.spyOn(window, 'alert').mockImplementation(() => {});

        // const newBooking = new NewBookings();
        const wrapper = mount(<AddEmployee />);

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
        expect(window.alert).toHaveBeenCalled();

        //expect(wrapper.instance().alert()).toHaveBeenCalled();
        //expect(wrapper.instance().state).toBe(1);
    });
    
    

})
