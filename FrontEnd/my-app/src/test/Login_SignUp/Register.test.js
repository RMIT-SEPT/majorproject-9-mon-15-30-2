import React, {Component} from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Register from "../../Components/Login_SignUp/Register";
import axios from 'axios';

Enzyme.configure({ adapter: new Adapter() });

describe('<Register /> Unit Test', () => 
{
    it('able to submit form', () =>
    {
        const login = new Register();
        expect(login.onSubmit).toHaveLength(1);
    });

    it('renders form group', () =>
    {
        const wrapper = shallow(<Register />);
        expect(wrapper.find('.form-group')).toHaveLength(1);
        expect(wrapper.find('.name')).toHaveLength(8);
        expect(wrapper.find('.form-control')).toHaveLength(7);
        expect(wrapper.find('.form-control form-control-lg')).toHaveLength(1);
    });

    it('onChange', () =>
    {
        const target1 = {
            name: "fname",
            value: "a"
        };
        const e1 = {
            target: target1
        };
        const wrapper = mount(<Register />);
        wrapper.instance().onChange(e1);
        expect(wrapper.instance().state.fname).toBe(target1.value);
    });

    it('onSubmit', () =>
    {
        const wrapper = mount(<Register />);
        const instance = wrapper.instance();
        const user =
        {
            fname: "asdasda",
            lname: "asdasda",
            email: "asdasda@gmail.com",
            username: "asdasda",
            password: "asdasda",
            password: "asdasda",
            address: "asdasda",
            phoneNumber: 1117788890
        }
        instance.setState(user);

        jest.spyOn(axios, 'post').mockResolvedValueOnce(user);
        jest.spyOn(instance, 'onSubmit');
        // jest.spyOn(localStorage, 'clear');
        // jest.spyOn(localStorage, 'setItem');
        class Ev extends Component{
            constructor(){
                super()
            }

            preventDefault(){}
        }

        const ev = new Ev();
        wrapper.instance().onSubmit(ev);
        expect(axios.post).toHaveBeenCalled();
        // expect(localStorage.clear).toHaveBeenCalled();
        // expect(localStorage.setItem).toHaveBeenCalled();
        expect(instance.onSubmit).toHaveBeenCalled();
    });
});

// describe('If onSubmit, error', () => {

//     let wrapperfail;

//     beforeEach(() => {
//         wrapperfail = shallow(<Login />);
//     });

//     it('should call onSubmit and fail', () =>
//     {
//         class Ev extends Component{
//             constructor(){
//                 super()
//             }

//             preventDefault(){}
//         }

//         const ev = new Ev();
//         const instance = wrapperfail.instance();
//         jest.spyOn(instance, 'onSubmit');
//         jest.spyOn(instance, 'setState');
//         jest.spyOn(console, 'log');
//         instance.onSubmit(ev);
//         expect(instance.onSubmit).toHaveBeenCalledTimes(1);
//         // const status1 = 401;
//         // const response1 =
//         // {
//         //     status: status1
//         // }
//         // const err = {
//         //     response: response1
//         // }
//         // expect(console.log).toHaveBeenCalledWith("error "+err.response.status+": Username or password is incorrect.");
//         expect(console.log).toHaveBeenCalled();
//         expect(instance.setState).toHaveBeenCalled();
//     });
// });
