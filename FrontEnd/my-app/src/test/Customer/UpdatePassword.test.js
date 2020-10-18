import React, { Component } from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import UpdatePassword from "../../Components/Customer/UpdatePassword";
import moxios from 'moxios';

Enzyme.configure({ adapter: new Adapter() });

describe('<UpdatePassword /> Unit Test', () => 
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
            success: "true",
            token: "dsfadf",
            id: "1",
            role: "ROLE_CUSTOMER"
        }
        
        localStorage.setItem("user", JSON.stringify(stored));
    });

    afterEach(() => 
    {
        cleanup;
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
        const wrapper = shallow(<UpdatePassword {...props} />);

        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.row')).toHaveLength(6);
        expect(wrapper.find('.col-md-8')).toHaveLength(1);
        expect(wrapper.find('.display-4')).toHaveLength(1);
        expect(wrapper.find('.display-4').text()).toBe("Update Password");
        expect(wrapper.find('.form-group')).toHaveLength(5);
        expect(wrapper.find('.col')).toHaveLength(5);
        expect(wrapper.find('.form-control')).toHaveLength(5);
        expect(wrapper.find('.btn')).toHaveLength(2);
    });

    it('render with role_admin', () => 
    {
        localStorage.clear();
        var stored = {
            success: "true",
            token: "dsfadf",
            id: "1",
            role: "ROLE_ADMIN"
        }
        
        localStorage.setItem("user", JSON.stringify(stored));

        const props =
        {
            match: {
                params: {
                    id: 1
                }
            }
        }
        const wrapper = shallow(<UpdatePassword {...props} />);

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
        const wrapper = shallow(<UpdatePassword {...props} />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'cancel');
        instance.cancel();

        expect(instance.cancel).toHaveBeenCalled();
        expect(instance.props.history).toHaveLength(1);
        expect(window.location.pathname).toEqual('/');
    });

    it('updatePassword', () => 
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
            oldPassword: "oldPassword",
            newPassword: "newPassword",
            confirmPassword: "confirmPassword"
        }
        const wrapper = shallow(<UpdatePassword {...props} />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'UpdatePassword');
        instance.UpdatePassword(1, "token", edit);

        expect(instance.UpdatePassword).toHaveBeenCalled();
        expect(window.location.pathname).toEqual('/');
    });

    it('onSave', () => 
    {
        const e = {
            target: {
                value: "1"
            },
            preventDefault() {}
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

        const wrapper = shallow(<UpdatePassword {...props} />);
        const instance = wrapper.instance();
        jest.spyOn(instance, 'onSave');
        jest.spyOn(instance, 'UpdatePassword');
        instance.onSave(e);
        
        expect(instance.onSave).toHaveBeenCalled();
        expect(instance.UpdatePassword).toHaveBeenCalled();
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
        const wrapper = shallow(<UpdatePassword {...props}/>);
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

    it('getCustomerDetail and axios get', () => 
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
        const wrapper = shallow(<UpdatePassword {...props}/>);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'getCustomerDetail');
        jest.spyOn(axios, 'get');
        instance.getCustomerDetail(1, "token");

        expect(instance.getCustomerDetail).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalled();
    });

    it('componentDidMount and axios get', () => 
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
        const wrapper = shallow(<UpdatePassword {...props}/>);
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