import axios from "axios";
var stored = JSON.parse(localStorage.getItem("user"));

class HandleRegisterLogin 
{
    Login(user)
    {
        return axios.post("http://localhost:8080/api/users/login", user, {withCredentials: false},
        {
            headers: {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }});
    }

    Logout() 
    {
        const token = 
        {
            token: stored.token
        }
        return axios.put("http://localhost:8080/api/users/logout", token).then((response) => 
        {
            console.log(localStorage.getItem("user"));
            window.localStorage.clear();
            console.log(response);
            alert("logout successful");
        },(error) => 
        {
            console.log(localStorage.getItem("user"));
            window.localStorage.clear();
            console.log(error);
            alert("session expired");
        });
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
export default new HandleRegisterLogin()