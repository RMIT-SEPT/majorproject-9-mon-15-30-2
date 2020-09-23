import axios from "axios";

class HandleServices 
{
  getAllServices()
  {
    return axios.get("http://localhost:8080/customer/makebooking/services");
  }
}
export default new HandleServices()