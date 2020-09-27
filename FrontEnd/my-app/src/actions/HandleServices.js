import axios from "axios";
var stored = JSON.parse(localStorage.getItem("user"));

class HandleServices 
{
  getAllServices()
  {
    return axios.get("http://localhost:8080/customer/makebooking/services", 
    {
      headers: {
      Authorization: stored.token
    }});
  }
}
export default new HandleServices()