import React, {Component} from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NewBookings from "../../Components/CreateNewBooking/NewBooking";
import axios from 'axios';
import HandleServiceTest from '../action/HandleServices.test';

Enzyme.configure({ adapter: new Adapter() });

var stored = {
    success: "true",
    token: "dsfadf",
    id: "1",
    role: "ROLE_CUSTOMER"
}

localStorage.setItem("user", JSON.stringify(stored));

describe('<NewBookings /> Unit Test', () => 
{
    it('able to submit form', () =>
    {
        const booking = new NewBookings();
        expect(booking.onSubmit).toHaveLength(1);
    });

    it('renders container', () => 
    {
        const wrapper = shallow(<NewBookings />);
        expect(wrapper.find('.container')).toHaveLength(1);
    });

    it('renders 3 form-groups', () =>
    {
        const wrapper = shallow(<NewBookings />);
        expect(wrapper.find('.form-group')).toHaveLength(3);
        expect(wrapper.find('.service')).toHaveLength(0);
        expect(wrapper.find('.worker')).toHaveLength(0);
        expect(wrapper.find('.sessionDate')).toHaveLength(0);
        expect(wrapper.find('.sessionStart')).toHaveLength(0);
    });

    // it('renders services, workers and sessions', () =>
    // {
    //     const newbooking = new NewBookings();
    //     const service = "haircut";
    //     const wrapper = mount(newbooking.render());
    //     // const component = wrapper.instance();

    //     // component.state.allservices.push(service);
    //     // component.render();
        
    //     newbooking.state.allservices.push(service);
    //     // newbooking.render();
    //     // expect(component.state.allservices[0]).toBe("haircut");
    //     expect(newbooking.state.allservices[0]).toBe("haircut");
    //     expect(wrapper.find('.service')).toHaveLength(1);
    //     expect(wrapper.find('.form-group')).toHaveLength(3);
    //     expect(wrapper.find('.worker')).toHaveLength(1);
    // });

    it('handleServiceChange', () =>
    {
        const target1 = {
            name: "service",
            value: "Wash"
        };
        const e1 = {
            target: target1
        };

        const service1 = {
            key: "a",
            value: "Wash"
        };

        const services = [];
        services.push(service1);

        const responce1 = {
            data: services
        };

        jest.spyOn(axios, 'get').mockResolvedValueOnce(responce1);
        const wrapper = shallow(<NewBookings />);
        wrapper.instance().handleServiceChange(e1);
        expect(wrapper.instance().state.service).toBe(target1.value);
    });

    it('handleWorkerSelection', () =>
    {
        const target1 = {
            name: "worker",
            value: "Wash"
        };

        const e1 = {
            target: target1
        };

        const service1 = {
            key: "a",
            value: "Wash"
        };

        const services = [];
        services.push(service1);

        const responce1 = {
            data: services
        };

        jest.spyOn(axios, 'get').mockResolvedValueOnce(responce1);

        const wrapper = shallow(<NewBookings />);
        
        wrapper.instance().handleServiceChange(e1);

        expect(wrapper.instance().state.worker).toBe(target1.value);
    });

    it('onChange', () =>
    {
        const w1 = {
            fname: "a"
        };
        const target1 = {
            name: "worker",
            value: w1
        };
        const e1 = {
            target: target1
        };
        const wrapper = shallow(<NewBookings />);
        wrapper.instance().onChange(e1);
        expect(wrapper.instance().state.worker.fname).toBe(w1.fname);
    });

    it('onSubmit', () =>
    {
        const wrapper = shallow(<NewBookings />);
        const responce1 = {
            customer: {
                id: "3",
                fName: "Tom",
                lName: "Hall",
                address: "77 Latrobe St, Melbourne, Australia",
                phoneNumber: 1117788890,
                email: "tomHall@gmail.com",
                hibernateLazyInitializer: {}
            },
            worker: {
                id: "2",
                fName: "fName",
                lName: "lName",
                admin: {
                    id: "1",
                    adminName: "adminName",
                    service: "Haircut",
                    hibernateLazyInitializer: {}
                },
                hibernateLazyInitializer: {}
            },
            status: "NEW_BOOKING",
            date: "Date: 2020-12-12 Start Time: 12:00:00 End Time: 13:00:00",
            startTime: "12:00:00",
            endTime: "13:00:00",
            service: "Haircut"
        };

        jest.spyOn(axios, 'post').mockResolvedValueOnce(responce1);
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        jest.spyOn(wrapper.instance(), 'onSubmit');
        class Ev extends Component{
            constructor(){
                super()
            }

            preventDefault(){}
        }

        const ev = new Ev();
        wrapper.instance().state.selectedSession = "Date: 2020-12-12 Start Time: 12:00:00 End Time: 13:00:00";
        wrapper.instance().onSubmit(ev);
        expect(axios.post).toHaveBeenCalled();
        expect(wrapper.instance().onSubmit).toHaveBeenCalled();
    });
});

describe('If onSubmit, alert are being called and successfully pushed', () => {
    let wrapper;
    const props = {
        customer: {
            id: "3",
            fName: "Tom",
            lName: "Hall",
            address: "77 Latrobe St, Melbourne, Australia",
            phoneNumber: 1117788890,
            email: "tomHall@gmail.com",
            hibernateLazyInitializer: {}
        },
        worker: {
            id: "2",
            fName: "fName",
            lName: "lName",
            admin: {
                id: "1",
                adminName: "adminName",
                service: "Haircut",
                hibernateLazyInitializer: {}
            },
            hibernateLazyInitializer: {}
        },
        status: "NEW_BOOKING",
        date: "Date: 2020-12-12 Start Time: 12:00:00 End Time: 13:00:00",
        startTime: "12:00:00",
        endTime: "13:00:00",
        service: "Haircut"
    };

    beforeEach(() => {
        wrapper = shallow(<NewBookings {...props}/>);
        
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
        instance.onSubmit(ev);
        expect(instance.onSubmit).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith("Booking successful");
    });
});

describe('If onSubmit, alert are being called and unsuccessfully pushed', () => {

    let wrapperfail;
    const failprops = {
        customer: {
            id: "3",
            fName: "Tom",
            lName: "Hall",
            address: "77 Latrobe St, Melbourne, Australia",
            phoneNumber: 1117788890,
            email: "tomHall@gmail.com",
            hibernateLazyInitializer: {}
        },
        worker: {
            id: "",
            fName: "",
            lName: "",
            admin: {
                id: "",
                adminName: "",
                service: "",
                hibernateLazyInitializer: {}
            },
            hibernateLazyInitializer: {}
        },
        status: "",
        date: "",
        startTime: "",
        endTime: "",
        service: ""
    };

    beforeEach(() => {
        wrapperfail = shallow(<NewBookings {...failprops}/>);
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
        instance.onSubmit(ev);
        expect(instance.onSubmit).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalled();
    });
});
