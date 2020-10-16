import React, { Component } from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import EditSession from "../../Components/Admin/EditSession";
import axios from 'axios';
import { cleanup } from "@testing-library/react";

Enzyme.configure({ adapter: new Adapter() });

describe('<EditSession/> Unit Test', () => 
{
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
        cleanup();
    });

    it('render default', () => {
        const props =
        {
            match: {
                params: {
                    id: 1
                }
            }
        }
        const wrapper = shallow(<EditSession {...props} />);
        
        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.row')).toHaveLength(3);
        expect(wrapper.find('.col-md-8')).toHaveLength(1);
        expect(wrapper.find('.display-4')).toHaveLength(1);
        expect(wrapper.find('.display-4').text()).toBe("Edit Session");
        expect(wrapper.find('.form-group')).toHaveLength(3);
        expect(wrapper.find('.col')).toHaveLength(4);
        expect(wrapper.find('.form-control')).toHaveLength(3);
        expect(wrapper.find('.day')).toHaveLength(7);
        expect(wrapper.find('.btn')).toHaveLength(2);
        expect(wrapper.find('.table')).toHaveLength(0);
        expect(wrapper.find('.th')).toHaveLength(0);
    });

    it('render with role_customer', () => 
    {
        localStorage.clear()
        var stored = {
            success: "true",
            token: "dsfadf",
            id: "1",
            role: "ROLE_CUSTOMER"
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
        const wrapper = shallow(<EditSession {...props} />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'render');
        instance.render();

        expect(instance.render).toHaveBeenCalled();
        expect(window.location.pathname).toEqual("/");
    });

    it('render when have available sessions and opening hours', () => 
    {
        const props =
        {
            match: {
                params: {
                    id: 1
                }
            }
        }
        const wrapper = shallow(<EditSession {...props} />);
        const session = 
        [
            {
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
                    "admin": {
                        "id": "4",
                        "adminName": "Melbourne Salon",
                        "service": "Haircut",
                        "hibernateLazyInitializer": {}
                    },
                    "hibernateLazyInitializer": {}
                },
                "day": 1,
                "startTime": "11:00:00",
                "endTime": "12:00:00",
                "service": "Haircut",
                "id": "1"
            },
            {
                "worker": {
                    "id": "6",
                    "fName": "Alex",
                    "lName": "Flinn",
                    "phoneNumber": "0477889998",
                    "admin": {
                        "id": "4",
                        "adminName": "Melbourne Salon",
                        "service": "Haircut",
                        "hibernateLazyInitializer": {}
                    },
                    "hibernateLazyInitializer": {}
                },
                "day": 1,
                "startTime": "12:00:00",
                "endTime": "12:30:00",
                "service": "Haircut",
                "id": "8"
            }
        ]
        const oepningtime = {
            startTime: "10:00:00",
            endTime: "11:00:00"
        }
        wrapper.setState({allavailablesessions: session});
        wrapper.setState({openinghours: oepningtime});

        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.row')).toHaveLength(3);
        expect(wrapper.find('.col-md-8')).toHaveLength(1);
        expect(wrapper.find('.display-4')).toHaveLength(1);
        expect(wrapper.find('.display-4').text()).toBe("Edit Session");
        expect(wrapper.find('.form-group')).toHaveLength(3);
        expect(wrapper.find('.col')).toHaveLength(4);
        expect(wrapper.find('.form-control')).toHaveLength(3);
        expect(wrapper.find('.day')).toHaveLength(7);
        expect(wrapper.find('.btn')).toHaveLength(2);
        expect(wrapper.find('.table')).toHaveLength(1);
        expect(wrapper.find('.th')).toHaveLength(2);

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
        }
        const wrapper = shallow(<EditSession {...props} />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'cancel');
        instance.cancel();

        expect(instance.cancel).toHaveBeenCalled();
        expect(instance.props.history).toHaveLength(1);
        expect(window.location.pathname).toEqual('/');
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

        const props =
        {
            match: {
                params: {
                    id: 1
                }
            },
            history: []
        };
        const wrapper = shallow(<EditSession {...props}/>);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'componentDidMount');
        jest.spyOn(axios, 'get');
        instance.componentDidMount();

        expect(instance.componentDidMount).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledTimes(0);
        expect(window.location.pathname).toEqual('/');
    });

    it('dayselectionChange', () => 
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
        const e = {
            target: {
                value: "1"
            }
        };
        const wrapper = shallow(<EditSession {...props}/>);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'dayselectionChange');
        jest.spyOn(axios, 'get');
        instance.dayselectionChange(e);

        expect(instance.dayselectionChange).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledTimes(3);
        expect(window.location.pathname).toBe('/');
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
        const wrapper = shallow(<EditSession {...props}/>);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'componentDidMount');
        jest.spyOn(axios, 'get');
        instance.componentDidMount();

        expect(instance.componentDidMount).toHaveBeenCalled();
        expect(axios.get).toHaveBeenCalledTimes(5);
    });

    it('updatesession', () => 
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
        const e = {
            target: {
                value: "1"
            }
        };
        const wrapper = shallow(<EditSession {...props}/>);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'updateSession');
        jest.spyOn(axios, 'put');
        instance.updateSession(e);

        expect(instance.updateSession).toHaveBeenCalled();
        expect(axios.put).toHaveBeenCalled();
        expect(window.location.pathname).toBe('/');
    });
});