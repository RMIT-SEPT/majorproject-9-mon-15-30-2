import axios from "axios";
var stored = JSON.parse(localStorage.getItem("user"));

class HandleSessions 
{
    createNewSession (session) 
    {
        return axios.post("http://localhost:8080/admin/createSession", session,
        {headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: stored.token
        }});
    }

    getOpeningHoursByAdminAndDay(admin_id, day)
    {
        return axios.get("http://localhost:8080/admin/openinghours/"+ admin_id + "/" + day,
        {headers: {
            Authorization: stored.token
        }});
    }

    getAvailableSessionByWorkerIdAndDay(worker_id, day)
    {
        return axios.get("http://localhost:8080/admin/sessions/" +
        worker_id + "/" + day, 
        {headers: {
            Authorization: stored.token
        }});
    }
}
export default new HandleSessions()