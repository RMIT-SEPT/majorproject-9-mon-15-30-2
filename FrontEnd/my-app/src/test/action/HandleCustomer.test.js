import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from 'axios';
import HandleService from '../../actions/HandleServices';
import HandleCustomer from "../../actions/HandleCustomer";

Enzyme.configure({ adapter: new Adapter() });
jest.mock('axios');

var stored = {
    success: "true",
    token: "dsfadf",
    id: "1",
    role: "ROLE_CUSTOMER"
}

localStorage.setItem("user", JSON.stringify(stored));

describe('<HandleCustomer /> Unit test', () => 
{
    it('local storage return role role_customer', async () => {
        var stored1 = JSON.parse(localStorage.getItem("user"));
        expect(stored1.role).toBe("ROLE_CUSTOMER");
    });

    it('get profile by user id successfully', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "fName": "Green",
                        "lName": "Karen",
                        "address": "12 Elizabeth St, Melbourne, Australia",
                        "phoneNumber": "488776556",
                        "email": "karenGreen@gmail.com",
                        "username": "user1"
                    }
                ],
            },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleCustomer
            .getProfile("1",stored.token))
            .resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/customer/profile/1", {"headers": {"Authorization": "dsfadf"}}
        );
    });

    it('get error message from server for no profile by id is found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleCustomer
            .getProfile("1",stored.token))
            .rejects.toThrow(errorMessage);
    });

})