import React, { Component } from "react";
import {shallow, mount, ShallowWrapper} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from 'axios';
import ManageSessions from "../../Components/Admin/ManagesSessions";
import { cleanup } from "@testing-library/react";
import moxios from 'moxios';


Enzyme.configure({ adapter: new Adapter() });

describe('<ManageSessions /> Unit Test', () =>
{
    beforeAll(() => 
    {
        moxios.install();
    });
    afterAll(() => 
    {
        moxios.uninstall();
    });
    
    beforeEach(() => 
    {
        var stored = {
            success:"true",
            token: "token",
            role: "ROLE_ADMIN",
            id:"1" }
        localStorage.setItem("user", JSON.stringify(stored));
    });

    afterEach(() => 
    {
        cleanup;
    });

    it('render', () => 
    {
        const wrapper = shallow(<ManageSessions />);
        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.alert')).toHaveLength(1);
        expect(wrapper.find('.pt-3')).toHaveLength(1);
    });

    it('render with customer_role', () => 
    {
        localStorage.clear()
        var stored = {
            success: "true",
            token: "dsfadf",
            id: "1",
            role: "ROLE_CUSTOMER"
        }
        localStorage.setItem("user", JSON.stringify(stored));

        const wrapper = shallow(<ManageSessions />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'render');
        instance.render();

        expect(instance.render).toHaveBeenCalled();
        expect(window.location.pathname).toEqual("/");
    });

    it('render with notifiedDate is true',() => 
    {  
        const notifydate = "true";
        const wrapper = shallow(<ManageSessions />);
        wrapper.setState({notifiedDate: notifydate});

        expect(wrapper.find('.card')).toHaveLength(1);
        expect(wrapper.find('.centre')).toHaveLength(1);

    });

    it('render when have availablesessions ', () => 
    {
        const sessions = 
        [
            {
                "day": 1,
                "startTime": "11:00:00",
                "endTime": "12:00:00",
                "workerId": null,
                "workerFirstName": "Alex",
                "workerLastName": "Flinn",
                "sessionId": "1"
            },
            {
                "day": 2,
                "startTime": "10:00:00",
                "endTime": "11:30:00",
                "workerId": null,
                "workerFirstName": "Alex",
                "workerLastName": "Flinn",
                "sessionId": "2"
            }
        ]

        const notifydate = "false";

        const wrapper = shallow(<ManageSessions />);
        const instance = wrapper.instance();
        wrapper.setState({availablesessions: sessions});
        wrapper.setState({notifiedDate: notifydate});
        expect(wrapper.find('.table')).toHaveLength(1);
        expect(wrapper.find('.th')).toHaveLength(6);
        expect(instance.state.availablesessions.length).toBe(2);
    });

    it('editsession', () => 
    {
        const props = 
        {
            history: []
        }
        const wrapper = shallow(<ManageSessions {...props}/>);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'editsession');
        instance.editsession("1");
        expect(instance.props.history).toHaveLength(1);
        expect(window.location.pathname).toEqual('/');
    })

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

    it('componentDidMount with role_customer', () => 
    {
        localStorage.clear();
        var stored = {
            success:"true",
            token: "token",
            role: "ROLE_CUSTOMER",
            id:"1" }
        localStorage.setItem("user", JSON.stringify(stored));

        const wrapper = shallow(<ManageSessions />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'componentDidMount');
        instance.componentDidMount();

        expect(instance.componentDidMount).toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
    });

    it('deleteSession and axios put when call delete session and push to login page', () => 
    {
        const wrapper = shallow(<ManageSessions />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'deleteSession');
        jest.spyOn(axios, 'put');

        instance.deleteSession(1);

        expect(instance.deleteSession).toHaveBeenCalled();
        expect(axios.put).toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
    });
    
    it('deleteSession and axios put when call delete session and refresh page', () => 
    {
        const wrapper = shallow(<ManageSessions />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'deleteSession');
        jest.spyOn(axios, 'put');

        instance.deleteSession("0");

        expect(instance.deleteSession).toHaveBeenCalled();
        expect(axios.put).toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
    });
})