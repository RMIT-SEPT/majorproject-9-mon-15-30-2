import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import BookingHistory from "../Components/BookingHistory";

Enzyme.configure({ adapter: new Adapter() });

describe('<BookingHistory /> Unit Test', () => 
{
    it('renders container for no bookings', () => 
    {
        const wrapper = shallow(<BookingHistory />);
        expect(wrapper.find('.container')).toHaveLength(1);
        expect(wrapper.find('.alert')).toHaveLength(1);
    });


    it('renders container', () => 
    {
        const work =
        {
            fname:"name"
        };
        const props = 
        {
            id: "a",
            service: "b",
            worker: work,
            date: "d",
            startTime: "e",
            endTime: "f"
        };
        const history = new BookingHistory();
        history.state.pastBookings.push(props);
        const wrapper = mount(history.render());

        expect(wrapper.find('.table')).toHaveLength(2);
        expect(wrapper.find('.th')).toHaveLength(6);
        expect(wrapper.find('.td')).toHaveLength(6);

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
