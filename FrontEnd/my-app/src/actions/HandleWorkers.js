import axios from "axios";

class HandleWorkers 
{
  
  getAllWorkers(){
    return axios.get("http://localhost:8080/makebooking/allworkers");
  }

  getWorkerByID(worker_id)
  {
    return axios.get("http://localhost:8080/worker/" + worker_id);
  }

}
export default new HandleWorkers()