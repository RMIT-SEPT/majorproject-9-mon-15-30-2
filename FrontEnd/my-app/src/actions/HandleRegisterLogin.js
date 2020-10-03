import axios from "axios";
var stored = JSON.parse(localStorage.getItem("user"));

class HandleRegisterLogin 
{
    Login(user)
    {
        return axios.post("http://localhost:8080/api/users/login", user,
        {
            headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }});
    }

    Logout()
    {
        console.log(stored.token);
        const token = 
        {
            token: stored.token
        }
        return axios.put("http://localhost:8080/api/users/logout", token);
    }

    Registering(newCustomer) 
    {
        return axios.post("http://localhost:8080/api/users/register",newCustomer, {withCredentials: false},
        {
            headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }});
    }
}
export default new HandleRegisterLogin();