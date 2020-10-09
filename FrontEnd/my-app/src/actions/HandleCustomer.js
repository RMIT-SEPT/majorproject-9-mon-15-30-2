import axios from "axios";

class HandleCustomer 
{
    getProfile(id, token)
    {
        return axios.get("http://localhost:8080/customer/profile/" + id ,
        {headers: {
            Authorization: token
        }});
    }

    updateProfile(id, token, customer_detail)
    {
        return axios.put("http://localhost:8080/customer/editProfile/" + id , customer_detail,
        {headers: {
            Authorization: token
        }});
    }

    updatePassword(id, token, new_password)
    {
        return axios.put("http://localhost:8080/customer/updatePassword/" + id , new_password,
        {headers: {
            Authorization: token
        }});
    }
}
export default new HandleCustomer();