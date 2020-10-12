import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from 'axios';
import HandleService from '../../actions/HandleServices';
import HandleSessions from "../../actions/HandleSessions";

Enzyme.configure({ adapter: new Adapter() });
jest.mock('axios');

var stored = {
    success: "true",
    token: "dsfadf",
    id: "1",
    role: "ROLE_ADMIN"
}

localStorage.setItem("user", JSON.stringify(stored));

describe('<HandleSessions /> Unit test', () => 
{
    it('local storage return role role_customer', async () => {
        var stored1 = JSON.parse(localStorage.getItem("user"));
        expect(stored1.role).toBe("ROLE_ADMIN");
    });

    it('get OpeningHours By Admin id And Day successfully', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "id": "7",
                        "day": 1,
                        "date": "2020-10-22",
                        "startTime": "10:00:00",
                        "endTime": "15:00:00"
                    }
                ],
            },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleSessions
            .getOpeningHoursByAdminAndDay("4","1",stored.token))
            .resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/admin/openinghours/4/1", {"headers": {"Authorization": "dsfadf"}}
        );
    });

    it('get error message from server for no opening hours is found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleSessions.getOpeningHoursByAdminAndDay("4","10",stored.token))
            .rejects.toThrow(errorMessage);
    });

    it('get available sessions by worker id successfully', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "worker": {
                            "id": "6",
                            "fName": "Alex",
                            "lName": "Flinn",
                            "phoneNumber": "477889998",
                            "admin": {
                                "id": "4",
                                "adminName": "Melbourne Salon",
                                "service": "Haircut",
                                "hibernateLazyInitializer": {}
                            },
                            "hibernateLazyInitializer": {}
                        },
                        "day": 1,
                        "startTime": "11:00:00",
                        "endTime": "12:00:00",
                        "service": "Haircut",
                        "id": "1"
                    }
                ],
            },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleSessions
            .getAvailableSessionByWorkerIdAndDay("6","1",stored.token))
            .resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/admin/sessions/6/1", {"headers": {"Authorization": "dsfadf"}}
        );        
    });

    it('get error message from server for no available session by worker id and day is found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleSessions.getAvailableSessionByWorkerIdAndDay("10","10",stored.token))
            .rejects.toThrow(errorMessage);
    });

    it('get all sessions by admin id successfully', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "day": 1,
                        "startTime": "11:00:00",
                        "endTime": "12:00:00",
                        "workerId": null,
                        "workerFirstName": "Alex",
                        "workerLastName": "Flinn",
                        "sessionId": "1"
                    }
                ],
            },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleSessions
            .getAllSessionsByAdminId("4",stored.token))
            .resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/admin/sessions/4", {"headers": {"Authorization": "dsfadf"}}
        );
    });

    it('get error message from server for no available session by worker id and day is found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleSessions.getAllSessionsByAdminId("10",stored.token))
            .rejects.toThrow(errorMessage);
    });

    it('get sessions by sessions id and admin idsuccessfully', async () => {
        const data = {
            data: {
                hits: [
                    {
                        "worker": {
                            "id": "6",
                            "fName": "Alex",
                            "lName": "Flinn",
                            "phoneNumber": "477889998",
                            "admin": {
                                "id": "4",
                                "adminName": "Melbourne Salon",
                                "service": "Haircut"
                            },
                            "hibernateLazyInitializer": {}
                        },
                        "day": 4,
                        "startTime": "09:00:00",
                        "endTime": "10:30:00",
                        "service": "Haircut",
                        "id": "4"
                    }
                ],
            },
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));
        await expect(HandleSessions
            .getSessionBySessionIdAndAdminId("4", "4",stored.token))
            .resolves.toEqual(data);

        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/admin/session/4/4", {"headers": {"Authorization": "dsfadf"}}
        );
    });

    it('get error message from server for no available session by worker id and day is found', async () => {
        const errorMessage = 'Network Error';

        axios.get.mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage)),
        );
        await expect(HandleSessions.getSessionBySessionIdAndAdminId("10","4",stored.token))
            .rejects.toThrow(errorMessage);
    });
})