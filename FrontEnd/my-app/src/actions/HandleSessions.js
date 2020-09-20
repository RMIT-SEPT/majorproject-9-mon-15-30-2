import axios from "axios";

class HandleSessions 
{
    createNewSession (session) {
        return axios.post("http://localhost:8080/createSession", session, {withCredentials: false}, 
        {
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
        });
    }

    getOpeningHoursByAdmin (admin_id){
        return axios.get("http://localhost:8080/openinghours/" + admin_id);
    }

    getAvailableSessionByAdmin_id(admin_id)
    {
        return axios.get("http://localhost:8080/sessions/" + admin_id);
    }

}
export default new HandleSessions()