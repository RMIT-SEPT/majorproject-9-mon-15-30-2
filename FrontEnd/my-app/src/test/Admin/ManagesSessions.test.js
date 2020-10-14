import React, { Component } from "react";
import {shallow, mount, ShallowWrapper} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from 'axios';
import ManageSessions from "../../Components/Admin/ManagesSessions";

Enzyme.configure({ adapter: new Adapter() });

var stored = {
    success: "true",
    token: "dsfadf",
    id: "1",
    role: "ROLE_ADMIN"
}

localStorage.setItem("user", JSON.stringify(stored));

describe('<ManageSessions /> Unit Test', () =>
{
    const session = {
        worker: {
            id: "7",
            fName: "John",
            lName: "Smith",
            phoneNumber: "1234567890",
            admin: {
                id: "4",
                adminName: "Melbourne Salon",
                service: "Haircut"
            },
            hibernateLazyInitializer: {}
        },
        day: "5",
        startTime: "09:00:00",
        endTime: "10:00:00",
        service: "Haircut",
        id: "19"
    }

    class Ev extends Component{
        constructor(){
            super()
        }
    
        preventDefault(){}
    }
    

    it('render', () => 
    {
        const wrapper = shallow(<ManageSessions />);
        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.alert')).toHaveLength(1);
        expect(wrapper.find('.pt-3')).toHaveLength(1);
    });

    it('push to availablesessions state', () => 
    {
        const managesessions = new ManageSessions();
        managesessions.state.availablesessions.push(session);

        expect(managesessions.state.availablesessions).toHaveLength(1);
        expect(managesessions.state.availablesessions[0].day).toBe("5");
    });

    it('componentDidMount and axios get when call get session', () => 
    {
        const wrapper = shallow(<ManageSessions />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'componentDidMount');
        jest.spyOn(axios, 'get');
        instance.componentDidMount();

        expect(instance.componentDidMount).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalled();
    });

    it('deleteSession and axios put when call delete session', () => 
    {
        const wrapper = shallow(<ManageSessions />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'deleteSession');
        jest.spyOn(axios, 'put');

        instance.deleteSession(1);

        expect(instance.deleteSession).toHaveBeenCalled();
        expect(axios.put).toHaveBeenCalled();
    });
    
})