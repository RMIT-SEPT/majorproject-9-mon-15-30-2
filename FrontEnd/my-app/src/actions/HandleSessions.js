import axios from "axios";

class HandleSessions 
{
    createNewSession (session, token) 
    {
        return axios.post("http://localhost:8080/admin/createSession", session,
        {headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: token
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

    getAllSessionsByAdminId(admin_id, token)
    {
        return axios.get("http://localhost:8080/admin/sessions/"+admin_id,
        {
            headers: {
                Authorization: token
            }
        });
    }

    getSessionBySessionIdAndAdminId(session_id, admin_id, token)
    {
        return axios.get("http://localhost:8080/admin/session/"+session_id+"/"+ admin_id, 
        {
            headers: {
                Authorization: token
            }
        });
    }

    updateSession(session_id, session, token)
    {
        return axios.put("http://localhost:8080/admin/editSession/" + session_id, session,
        {
            headers: {
                Authorization: token
        }});
    }
}
export default new HandleSessions();