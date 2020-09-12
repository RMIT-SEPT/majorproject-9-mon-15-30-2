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
  
  getWorkerByfName(worker_id)
  {
    return axios.get("http://localhost:8080/workerbyfName/" + worker_id);
  }

  getWorkerByService(service)
  {
    return axios.get("http://localhost:8080/makebooking/byservice/" + service);
  }

  updateWorker(worker, id){
    return axios.put("http://localhost:8080/editWorker/" + id, worker);
  }

  deleteWorker(id){
    return axios.delete("http://localhost:8080/workers/" + id, {withCredentials: false},
    {headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    });
  }

  createNewWorker(worker){
    return axios.post("http://localhost:8080/createWorker",worker, {withCredentials: false},
    {headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
    });
  }

}
export default new HandleWorkers()