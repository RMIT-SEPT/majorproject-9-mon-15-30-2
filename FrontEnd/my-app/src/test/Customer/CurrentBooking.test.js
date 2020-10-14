import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CurrentBookings from "../../Components/Customer/CurrentBookings";
import axios from 'axios';

Enzyme.configure({ adapter: new Adapter() });

var stored = {
    success: "true",
    token: "dsfadf",
    id: "1",
    role: "ROLE_CUSTOMER"
}

localStorage.setItem("user", JSON.stringify(stored));

describe('<CurrentBooking /> Unit Test', () => 
{
    it('renders container', () => 
    {
        const wrapper = shallow(<CurrentBookings />);
        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.alert')).toHaveLength(1);
    });

    it('testing currentbooking', () => 
    {
        const customer = {
        address: "77 Latrobe St, Melbourne, Australia",
        email: "tomHall@gmail.com",
        fName: "Tom",
        id: "3",
        lName: "Hall",
        phoneNumber: "1117788890"
        }
        const admin = {
            id: "4", 
            adminName: "Melbourne Salon", 
            service: "Haircut"
        }
        const worker =
        {
            admin: admin,
            fname:"john",
            id: "7",
            lName: "Smith",
            phoneNumber: "499887722"
        };
        const currentbookingdata = {
            confirmation: "CONFIRMED",
            customer: customer,
            date: "2020-09-22",
            endTime: "13:30:00",
            id: "2",
            service: "Haircut",
            startTime: "13:00:00",
            status: "NEW_BOOKING",
            worker: worker
        };
        const current = new CurrentBookings();
        current.state.currentBookings.push(currentbookingdata);

        expect(current.state.currentBookings).toHaveLength(1);
        expect(current.state.currentBookings[0].status).toBe("NEW_BOOKING");
    });
});

describe('<CurrentBooking /> Unit Test Actions', () =>
{
    let wrapper;

    const props = {
        id: "1",
        service: "Haircut",
        worker: {
            fName: "John"
        },
        date: "2020-12-12",
        startTime: "12:00:00",
        endTime: "13:00:00"
    };

    beforeEach(() => {
        wrapper = shallow(<CurrentBookings {...props}/>);
    });

    it('should call componentdidmount()', () => {
        const instance = wrapper.instance();
        jest.spyOn(instance, 'componentDidMount');
        instance.componentDidMount();
        expect(instance.componentDidMount).toHaveBeenCalled();
    });
});

describe('<CurrentBooking /> Unit Test more functions', () => 
{
    it('cancelbooking and axios put when call cancel booking', () => 
    {
        const wrapper = shallow(<CurrentBookings />);
        const instance = wrapper.instance();

        jest.spyOn(instance, 'cancelbooking');
        jest.spyOn(axios, 'put');
        instance.cancelbooking(1);

        expect(instance.cancelbooking).toHaveBeenCalled();
        expect(axios.put).toHaveBeenCalled();
    });
})

