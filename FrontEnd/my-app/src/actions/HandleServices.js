import axios from "axios";

class HandleServices 
{
  getAllServices(token)
  {
    return axios.get("http://localhost:8080/customer/makebooking/services", 
    {
      headers: {
      Authorization: token
    }});
  }

  getServiceByAdmin(admin_id, token) {
    return axios.get("http://localhost:8080/admin/service/" + admin_id,
    { headers: {
      Authorization: token
    }});
  }
}
export default new HandleServices();