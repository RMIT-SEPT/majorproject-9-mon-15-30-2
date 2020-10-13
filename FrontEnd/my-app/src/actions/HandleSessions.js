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

    getOpeningHoursByAdminAndDay(admin_id, day, token)
    {
        return axios.get("http://localhost:8080/admin/openinghours/"+ admin_id + "/" + day,
        {headers: {
            Authorization: token
        }});
    }

    getAvailableSessionByWorkerIdAndDay(worker_id, day, token)
    {
        return axios.get("http://localhost:8080/admin/sessions/" + worker_id + "/" + day, 
        {headers: {
            Authorization: token
        }});
    }

    getAllSessionsByAdminId(admin_id)
    {
        return axios.get("http://localhost:8080/admin/sessions/"+admin_id,
        {
            headers: {
                Authorization: stored.token
            }
        });
    }

    getSessionBySessionIdAndAdminId(session_id, admin_id)
    {
        return axios.get("http://localhost:8080/admin/session/"+session_id+"/"+admin_id, 
        {
            headers: {
                Authorization: stored.token
            }
        });
    }

    updateSession(session_id, session)
    {
        return axios.put("http://localhost:8080/admin/editSession/" + session_id, session,
        {
            headers: {
                Authorization: stored.token
        }});
    }

    getSessionInAWeekByWorkerIDAndAdminID(worker_id, admin_id)
    {
        return axios.get("http://localhost:8080/admin/availableSessions/"+worker_id+"/"+admin_id, 
        {
            headers: {
                Authorization: stored.token
            }
        });
    }
}
export default new HandleSessions();