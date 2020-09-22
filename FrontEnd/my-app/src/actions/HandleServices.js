import axios from "axios";

class HandleServices 
{
  getAllServices()
  {
    return axios.get("http://localhost:8080/makebooking/allservices");
  }
}
export default new HandleServices()