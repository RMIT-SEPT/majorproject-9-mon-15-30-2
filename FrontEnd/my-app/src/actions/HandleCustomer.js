import axios from "axios";
var stored = JSON.parse(localStorage.getItem("user"));

class HandleCustomer 
{
    getProfile(id)
    {
        return axios.get("http://localhost:8080/customer/profile/" + id ,
        {headers: {
            Authorization: stored.token
        }});
    }
}
export default new HandleCustomer();