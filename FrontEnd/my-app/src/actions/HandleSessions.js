import axios from "axios";

class HandleSessions 
{
    createNewSession (session) 
    {
        return axios.post("http://localhost:8080/admin/createSession", session, {withCredentials: false},
        {
            headers: 
            {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }

    getOpeningHoursByAdminAndDay(admin_id, day)
    {
        return axios.get("http://localhost:8080/admin/openinghours/"+ admin_id + "/" + day);
    }

    getAvailableSessionByWorkerIdAndDay(worker_id, day)
    {
        return axios.get("http://localhost:8080/admin/sessions/" +
        worker_id + "/" + day);
    }
}
export default new HandleSessions()