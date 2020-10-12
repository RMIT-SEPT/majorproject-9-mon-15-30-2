import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BookingHistory from "../../Components/Customer/BookingHistory";

Enzyme.configure({ adapter: new Adapter() });

var stored = {
    success: "true",
    token: "dsfadf",
    id: "1",
    role: "ROLE_CUSTOMER"
}

localStorage.setItem("user", JSON.stringify(stored));

describe('<BookingHistory /> Unit Test', () => 
{
    it('renders container', () => 
    {
        const wrapper = shallow(<BookingHistory />);
        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.alert')).toHaveLength(1);
    });

    it('past booking length', () => 
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

        const bookinghistorydata = {
            confirmation: "CONFIRMED",
            customer: customer,
            date: "2020-09-22",
            endTime: "13:30:00",
            id: "2",
            service: "Haircut",
            startTime: "13:00:00",
            status: "PAST_BOOKING",
            worker: worker
        };

        const bookinghistory = new BookingHistory();
        bookinghistory.state.pastBookings.push(bookinghistorydata);
        expect(bookinghistory.state.pastBookings).toHaveLength(1);
        expect(bookinghistory.state.pastBookings[0].service).toBe("Haircut");
        expect(bookinghistory.state.pastBookings[0].status).toBe("PAST_BOOKING");
    });
});

describe('<BookingHistory /> Unit Test Actions', () =>
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
        wrapper = shallow(<BookingHistory {...props}/>);
    });

    it('should call componentdidmount()', () => {
        const instance = wrapper.instance();
        jest.spyOn(instance, 'componentDidMount');
        instance.componentDidMount();
        expect(instance.componentDidMount).toHaveBeenCalled();
    });
});
