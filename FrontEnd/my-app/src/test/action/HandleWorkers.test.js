import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from 'axios';
import HandleService from '../../actions/HandleServices';
import HandleSessions from "../../actions/HandleSessions";
import HandleWorkers from "../../actions/HandleWorkers";

Enzyme.configure({ adapter: new Adapter() });
jest.mock('axios');

var stored = {
    success: "true",
    token: "dsfadf",
    id: "1",
    role: "ROLE_WORKER"
}

localStorage.setItem("user", JSON.stringify(stored));

describe('<HandleSessions /> Unit test', () => 
{
    it('local storage return role roler_worker', async () => {
        var stored1 = JSON.parse(localStorage.getItem("user"));
        expect(stored1.role).toBe("ROLE_WORKER");
    });

    it('get worker by admin id successfully', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "id": "6",
                        "fName": "Alex",
                        "lName": "Flinn",
                        "phoneNumber": "477889998",
                        "username": "worker1"
                    }
                ],
            },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleWorkers
            .getWorkersByAdmin("4",stored.token))
            .resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/admin/workers/4", {"headers": {"Authorization": "dsfadf"}}
        );
    });

    it('get error message from server for no worker by admin id is found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleWorkers.getWorkersByAdmin("10",stored.token))
            .rejects.toThrow(errorMessage);
    });

    it('get worker by id successfully', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "id": "6",
                        "fName": "Alex",
                        "lName": "Flinn",
                        "phoneNumber": "477889998",
                        "username": "worker1"
                    }
                ],
            },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleWorkers
            .getWorkerByID("6","4",stored.token))
            .resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/admin/worker/6/4", {"headers": {"Authorization": "dsfadf"}}
        );        
    });

    it('get error message from server for no worker is found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleWorkers.getWorkerByID("10","10",stored.token))
            .rejects.toThrow(errorMessage);
    });

    it('get all workers by service successfully', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "id": "7",
                        "fName": "John",
                        "lName": "Smith",
                        "phoneNumber": "499887722",
                        "admin": {
                            "id": "4",
                            "adminName": "Melbourne Salon",
                            "service": "Haircut",
                            "hibernateLazyInitializer": {}
                        }
                    }
                ],
            },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleWorkers
            .getWorkerByService("Haircut",stored.token))
            .resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/customer/makebooking/workers/Haircut", {"headers": {"Authorization": "dsfadf"}}
        );
    });

    it('get error message from server for no worker by service is found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleWorkers.getWorkerByService("Daning lessions",stored.token))
            .rejects.toThrow(errorMessage);
    });

    it('get profile by id idsuccessfully', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "id": "7",
                        "fName": "John",
                        "lName": "Smith",
                        "phoneNumber": "499887722",
                        "admin": {
                            "id": "4",
                            "adminName": "Melbourne Salon",
                            "service": "Haircut",
                            "hibernateLazyInitializer": {}
                        }
                    }
                ],
            },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleWorkers
            .getProfile("7",stored.token))
            .resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/worker/profile/7", {"headers": {"Authorization": "dsfadf"}}
        );
    });

    it('get error message from server for no worker profile is found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleWorkers.getProfile("10",stored.token))
            .rejects.toThrow(errorMessage);
    });
})