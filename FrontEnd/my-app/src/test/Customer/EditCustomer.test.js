import React, { Component } from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import EditCustomer from "../../Components/Customer/EditCustomer";
import HandleCustomer from "../../actions/HandleCustomer";
import moxios from 'moxios';

Enzyme.configure({ adapter: new Adapter() });

describe('<EditCustomer /> Unit Test', () => 
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
            role: "ROLE_CUSTOMER",
            id:"1" }
        localStorage.setItem("user", JSON.stringify(stored));
    });

    afterEach(() => {
        cleanup();
    });

    it('render default', () => 
    {
        const props =
        {
            match: {
                params: {
                    id: 1
                }
            }
        }
        const wrapper = shallow(<EditCustomer {...props} />);

        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.row')).toHaveLength(8);
        expect(wrapper.find('.col-md-8')).toHaveLength(1);
        expect(wrapper.find('.display-4')).toHaveLength(1);
        expect(wrapper.find('.display-4').text()).toBe("Update Details");
        expect(wrapper.find('.form-group')).toHaveLength(7);
        expect(wrapper.find('.col')).toHaveLength(7);
        expect(wrapper.find('.form-control')).toHaveLength(7);
        expect(wrapper.find('.btn')).toHaveLength(2);
    });

    it('render with role_admin', () => 
    {
        localStorage.clear();
        var stored = 
        {
            success:"true",
            token: "token",
            role: "ROLE_ADMIN",
            id:"1" 
        }
        localStorage.setItem("user", JSON.stringify(stored));

        const props =
        {
            match: {
                params: {
                    id: 1
                }
            },
            preventDefault() {}
        };
        const wrapper = shallow(<EditCustomer {...props} />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'render');
        instance.render();

        expect(wrapper.find('.container')).toHaveLength(0);
        expect(wrapper.find('.row')).toHaveLength(0);
        expect(wrapper.find('.col-md-8')).toHaveLength(0);
        expect(wrapper.find('.display-4')).toHaveLength(0);
        expect(wrapper.find('.form-group')).toHaveLength(0);
        expect(wrapper.find('.col')).toHaveLength(0);
        expect(wrapper.find('.form-control')).toHaveLength(0);
        expect(wrapper.find('.btn')).toHaveLength(0);
        expect(window.location.pathname).toEqual('/');
    });

    it('cancel', () => 
    {
        const props =
        {
            match: {
                params: {
                    id: 1
                }
            },
            history: []
        };
        const wrapper = shallow(<EditCustomer {...props} />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'cancel');
        instance.cancel();

        expect(instance.cancel).toHaveBeenCalled();
        expect(instance.props.history).toHaveLength(1);
        expect(window.location.pathname).toEqual('/');
    });

    it('updateCustomer', () => 
    {
        const props =
        {
            match: {
                params: {
                    id: 1
                }
            },
            history: []
        };
        const edit = {
            fName: "fname",
            lName: "lName",
            email: "email",
            address: "address",
            phonenumber: "phonenumber",
            username: "username"
        }
        const wrapper = shallow(<EditCustomer {...props} />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'updateCustomer');
        instance.updateCustomer(1, "token", edit);

        expect(instance.updateCustomer).toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
    });

    it('onUpdate', () => 
    {
        const e = {
            target: {
                value: "1"
            },
            preventDefault(){}
        };
        const props =
        {
            match: {
                params: {
                    id: 1
                }
            },
            history: []
        };

        const wrapper = shallow(<EditCustomer {...props} />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onUpdate');
        jest.spyOn(instance, 'updateCustomer');
        instance.onUpdate(e);
        
        expect(instance.onUpdate).toHaveBeenCalled();
        expect(instance.updateCustomer).toHaveBeenCalled();
    });

    it('componentDidMount with role_admin', () => 
    {
        localStorage.clear();
        var stored = 
        {
            success:"true",
            token: "token",
            role: "ROLE_ADMIN",
            id:"1" 
        }
        localStorage.setItem("user", JSON.stringify(stored));

        const props =
        {
            match: {
                params: {
                    id: 1
                }
            },
            history: []
        };
        const wrapper = shallow(<EditCustomer {...props}/>);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'componentDidMount');
        jest.spyOn(instance, 'getCustomerDetail');
        jest.spyOn(axios, 'get');
        instance.componentDidMount();

        expect(instance.componentDidMount).toHaveBeenCalled();
        expect(instance.getCustomerDetail).toHaveBeenCalledTimes(0);
        expect(axios.get).toHaveBeenCalledTimes(0);
        expect(window.location.pathname).toEqual('/');
    });

    it('getCustomerDetail', () => 
    {
        const props =
        {
            match: {
                params: {
                    id: 1
                }
            },
            history: []
        };
        const wrapper = shallow(<EditCustomer {...props}/>);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'getCustomerDetail');
        jest.spyOn(axios, 'get');
        instance.getCustomerDetail(1, "token");

        expect(instance.getCustomerDetail).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalled();
    });

    it('componentDidMount and axios get when call get session', () => 
    {
        const props =
        {
            match: {
                params: {
                    id: 1
                }
            },
            history: []
        };
        const wrapper = shallow(<EditCustomer {...props}/>);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'componentDidMount');
        jest.spyOn(instance, 'getCustomerDetail');
        jest.spyOn(axios, 'get');
        instance.componentDidMount();

        expect(instance.componentDidMount).toHaveBeenCalled();
        expect(instance.getCustomerDetail).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
    });

});