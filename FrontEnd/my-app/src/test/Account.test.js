import React, { Component } from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Account from "../Components/Account";
import axios from 'axios';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('axios'); 

const id1 = "1";
const params1 = {
    id: id1
}
const match1 = {
    params:params1
}

class Acc extends Component{
    constructor(){
        super()
    }

    preventDefault(){}
}

const responce2 = {
    adminName: "adminName",
    service: "service"
}
const account1 = {
    id: id1,
    admin:responce2
}

describe('<Account /> Unit Test', () => {
    it('able to click on update Password', () => {
        const account = new Account();
        expect(account.editCustomer).toHaveLength(1);
    });

    it('able to click on edit Detail', () => {
        const account = new Account();
        expect(account.updatePassword).toHaveLength(1);
    });


    it('render CustomerView', () => {
        const account = new Account();
        account.state.profile = account1
        const wrapper = mount(account.renderCustomerView());

        expect(wrapper.find('.card-body')).toHaveLength(1);
        expect(wrapper.find('.row')).toHaveLength(5);
    });

    it('render WorkerView', () => {
        const account = new Account();
        account.state.profile = account1

        const wrapper = mount(account.renderWorkerView());

        expect(wrapper.find('.card-body')).toHaveLength(1);
        expect(wrapper.find('.row')).toHaveLength(5);
        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.table')).toHaveLength(0);
        expect(wrapper.find('.th')).toHaveLength(0);
        expect(wrapper.find('.day')).toHaveLength(0);
        expect(wrapper.find('.startTime')).toHaveLength(0);
        expect(wrapper.find('.endTime')).toHaveLength(0);
    });

    it('render NotAvailable', () => {
        const account = new Account();
        const wrapper = mount(account.renderNotAvailable());

        expect(wrapper.find('.alert')).toHaveLength(1);
    });

    it('updatePassword', () =>{
        const props1 = 
        {
            match: match1,
            history: []
        }
        const wrapper = shallow(<Account {...props1}/>);

        wrapper.instance().state.profile.push(account1);
        wrapper.instance().updatePassword(id1);

        expect(wrapper.instance().props.history).toHaveLength(1);
    });

    it('editCustomer', () =>{
        const props1 = 
        {
            match: match1,
            history: []
        }
        const wrapper = shallow(<Account {...props1}/>);

        wrapper.instance().state.profile.push(account1);
        wrapper.instance().editCustomer(id1);

        expect(wrapper.instance().props.history).toHaveLength(1);
    });

    it('render day', () =>{
        const sunday = 1;
        const monday = 2;
        const mondayText = "Monday";
        const sundayText = "Sunday";
        const wrapper = shallow(<Account />);
        
        expect(wrapper.instance().displayDay(sunday)).toEqual(sundayText);
        expect(wrapper.instance().displayDay(monday)).toEqual(mondayText);
        expect(wrapper.instance().displayDay(monday)).not.toEqual(sundayText);
        expect(wrapper.instance().displayDay(monday)).not.toBe(sundayText);
    });

    it('retrieve undefined data for getCustomerDetail', () => {       
        const profile = {};    

        jest.spyOn(axios, 'get').mockImplementationOnce(() => {
            return Promise.resolve(profile)});
        const wrapper = shallow(<Account/>);
        wrapper.instance().getCustomerDetail().then(() => expect().toBeUndefined());
    });

    it('retrieve undefined data from getWorkerDetail', () => {
        jest.spyOn(axios, 'get').mockImplementationOnce(() => 
        Promise.resolve(""));
        const wrapper = shallow(<Account/>);
        wrapper.instance().getWorkerDetail().then(() => expect().toBeUndefined());
    });

    it('retrieve undefined data from getWorkerWorkingHour', () => {
        jest.spyOn(axios, 'get').mockImplementationOnce(() => 
        Promise.resolve(""));
        const wrapper = shallow(<Account/>);
        wrapper.instance().getWorkerWorkingHour().then(() => expect().toBeUndefined());
    });
});
