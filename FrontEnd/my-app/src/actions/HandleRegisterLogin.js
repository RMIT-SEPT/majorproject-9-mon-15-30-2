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

    async Logout() 
    {
        const token = 
        {
            token: stored.token
        }
        return await axios.put("http://localhost:8080/api/users/logout", token).then((response) => 
        {
            console.log(localStorage.getItem("user"));
            localStorage.clear();
            console.log(response);
            alert("Logout successfully");
        }).catch((error) => 
        {
            console.log(localStorage.getItem("user"));
            localStorage.clear();
            console.log(error);
            alert("Session expired");
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