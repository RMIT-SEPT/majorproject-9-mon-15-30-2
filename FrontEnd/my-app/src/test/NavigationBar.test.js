import React from "react";
import {shallow, mount} from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import NavigationBar from "../Components/NavigationBar.js";

Enzyme.configure({ adapter: new Adapter() });

describe('<NavigationBar /> Unit Test', () => {
    it('renders container', () => 
        {
            const wrapper = shallow(<NavigationBar />);
            expect(wrapper.find('.container')).toHaveLength(1);
        }
    );

    it('renders 7 nav-item', () =>
        {
            const wrapper = shallow(<NavigationBar />);
            expect(wrapper.find('.nav-item')).toHaveLength(7);
        }
    );


})
