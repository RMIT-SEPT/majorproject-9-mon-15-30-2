import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from 'axios';
import HandleService from '../../actions/HandleServices';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('axios');

var stored = {
    success: "true",
    token: "dsfadf",
    id: "1",
    role: "ROLE_CUSTOMER"
}

localStorage.setItem("user", JSON.stringify(stored));

describe('<HandleServices /> Unit test', () => 
{
    it('local storage return role role_customer', async () => {
        var stored1 = JSON.parse(localStorage.getItem("user"));
        expect(stored1.role).toBe("ROLE_CUSTOMER");
    });

    it('get all services successfully', async () => {
        const data = {
            data: {
                hits: [
                    "Haircut",
                    "Massage"
                ],
            },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleService
            .getAllServices(stored.token))
            .resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/customer/makebooking/services", {"headers": {"Authorization": "dsfadf"}}
        );
    });

    it('get error message from server for no services found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleService.getAllServices(stored.token))
            .rejects.toThrow(errorMessage);
    });

    it('get service by admin successfully', async () => {
        const data = {
            data: {
                hits: [
                    "Haircut"
                ],
            },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleService
            .getServiceByAdmin("4",stored.token))
            .resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/admin/service/4", {"headers": {"Authorization": "dsfadf"}}
        );        
    });

    it('get error message from server for no services by admin id is found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleService.getServiceByAdmin("4",stored.token))
            .rejects.toThrow(errorMessage);
    });
})