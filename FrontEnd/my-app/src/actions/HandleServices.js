import axios from "axios";

class HandleServices 
{
  getAllServices()
  {
    return axios.get("http://localhost:8080/makebooking/allservices");
  }

  getServiceByWorker(worker_id)
  {
    return axios.get("http://localhost:8080/makebooking/byworker/" + worker_id);
  }

}
export default new HandleServices()