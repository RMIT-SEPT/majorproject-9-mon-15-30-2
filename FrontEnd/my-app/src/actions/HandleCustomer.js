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

    updateProfile(id, customer_detail)
    {
        return axios.put("http://localhost:8080/customer/editProfile/" + id , customer_detail,
        {headers: {
            Authorization: stored.token
        }});
    }

    updatePassword(new_password)
    {
        return axios.put("http://localhost:8080/customer/updatePassword/" + stored.id , new_password,
        {headers: {
            Authorization: stored.token
        }});
    }
}
export default new HandleCustomer();