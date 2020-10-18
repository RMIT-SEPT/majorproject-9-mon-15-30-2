import React, { Component } from "react";
import {shallow, mount, ShallowWrapper} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AvailableWorkers from "../../Components/Admin/AvailableWorkers";
import axios from 'axios';
import { cleanup } from "@testing-library/react";
import moxios from 'moxios';

Enzyme.configure({ adapter: new Adapter() });

describe('<AvailableWorker /> Unit Test', () => 
{
    beforeEach(() => {
        var stored = {
            success:"true",
            token: "token",
            role: "ROLE_ADMIN",
            id:"1" }
        localStorage.setItem("user", JSON.stringify(stored));

        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
        cleanup;
    });

    it('render', () => 
    {
        const wrapper = shallow(<AvailableWorkers />);
        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('render allworkers', () => 
    {
        var worker = 
        [
            {
                id: "6",
                fName: "Alex",
                lName: "Flinn",
                phoneNumber: "0477889998",
                username: "worker1"
            },
            {
                "id": "7",
                "fName": "John",
                "lName": "Smith",
                "phoneNumber": "0499887722",
                "username": "worker2"
            }
        ]

        var session = 
        [
            {
                "date": "2020-10-15",
                "startTime": "09:00:00",
                "endTime": "10:30:00"
            },
            {
                "date": "2020-10-16",
                "startTime": "09:00:00",
                "endTime": "09:30:00"
            }
        ]

        const wrapper = shallow(<AvailableWorkers />);
        wrapper.setState({allworkersbyadminid: worker});
        wrapper.setState({sessionbyworkerid: session});

        expect(wrapper.find('.worker_container')).toHaveLength(2);
        expect(wrapper.find('.table')).toHaveLength(2);
        expect(wrapper.find('.th')).toHaveLength(6);
    });

    it('testing componentDidMount', () => 
    {
        const wrapper = shallow(<AvailableWorkers />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'componentDidMount');
        instance.componentDidMount();

        expect(instance.componentDidMount).toHaveBeenCalled();
    });

    it('render with role_customer', () => 
    {
        localStorage.clear();
        var stored = {
            success:"true",
            token: "token",
            role: "ROLE_CUSTOMER",
            id:"1" }
        localStorage.setItem("user", JSON.stringify(stored));

        const wrapper = shallow(<AvailableWorkers />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'render');
        instance.render();

        expect(window.location.pathname).toEqual('/');
    });

    it('handleGetSessionByWorkerID', () => 
    {
        const wrapper = shallow(<AvailableWorkers />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'handleGetSessionByWorkerID');
        instance.handleGetSessionByWorkerID(1,2, "Token");

        expect(instance.handleGetSessionByWorkerID).toHaveBeenCalled();
    }); 

    it('componentDidMount run with role_customer', () => 
    {
        localStorage.clear();
        var stored = {
            success:"true",
            token: "token",
            role: "ROLE_CUSTOMER",
            id:"1" }
        localStorage.setItem("user", JSON.stringify(stored));

        const wrapper = shallow(<AvailableWorkers />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'componentDidMount');
        instance.componentDidMount();

        expect(instance.componentDidMount).toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
    });
});