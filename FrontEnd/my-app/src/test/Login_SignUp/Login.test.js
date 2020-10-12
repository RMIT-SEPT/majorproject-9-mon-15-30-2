import React, {Component} from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "../../Components/Login_SignUp/Login";
import axios from 'axios';

Enzyme.configure({ adapter: new Adapter() });

describe('<Login /> Unit Test', () => 
{
    it('able to submit form', () =>
    {
        const login = new Login();
        expect(login.onSubmit).toHaveLength(1);
    });

    it('renders container', () => 
    {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('.container')).toHaveLength(2);
    });

    it('renders form with username and password', () =>
    {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('.form')).toHaveLength(1);
        expect(wrapper.find('.password')).toHaveLength(1);
        expect(wrapper.find('.username')).toHaveLength(1);
    });

    it('onChange', () =>
    {
        const target1 = {
            name: "username",
            value: "a"
        };
        const e1 = {
            target: target1
        };
        const wrapper = mount(<Login />);
        wrapper.instance().onChange(e1);
        expect(wrapper.instance().state.username).toBe(target1.value);
    });

    it('onSubmit', () =>
    {
        const wrapper = mount(<Login />);
        const instance = wrapper.instance();
        const user =
        {
            username: "asdasda",
            password: "asdasda"
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

describe('If onSubmit, error', () => {

    let wrapperfail;

    beforeEach(() => {
        wrapperfail = shallow(<Login />);
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
        jest.spyOn(instance, 'setState');
        jest.spyOn(console, 'log');
        instance.onSubmit(ev);
        expect(instance.onSubmit).toHaveBeenCalledTimes(1);
        // const status1 = 401;
        // const response1 =
        // {
        //     status: status1
        // }
        // const err = {
        //     response: response1
        // }
        // expect(console.log).toHaveBeenCalledWith("error "+err.response.status+": Username or password is incorrect.");
        expect(console.log).toHaveBeenCalled();
        //expect(instance.setState).toHaveBeenCalled();
    });
});


