import axios from "axios";

class HandleWorkers {
  getWorkerByAdmin(admin_id){
    return axios.get("http://localhost:8080/admin/workers/" + admin_id);
  }

  getWorkerByID(worker_id)
  {
    return axios.get("http://localhost:8080/admin/worker/" + worker_id);
  }

  getWorkerByService(service)
  {
    return axios.get("http://localhost:8080/customer/makebooking/workers/" + service);
  }

  updateWorker(worker, id){
      return axios.put("http://localhost:8080/admin/editWorker/" + id, worker);
  }


  deleteWorker(id){
    return axios.delete("http://localhost:8080/admin/deleteWorker/" + id, {withCredentials: false},
    {headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
    });
  }

   createNewWorker(worker) {
    return axios.post("http://localhost:8080/admin/createWorker",worker, {withCredentials: false},
    {headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }});
  }
  
}
export default new HandleWorkers()