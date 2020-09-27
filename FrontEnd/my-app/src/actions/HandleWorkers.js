import axios from "axios";
var stored = JSON.parse(localStorage.getItem("user"));

class HandleWorkers 
{
  getWorkerByAdmin(admin_id)
  {
    return axios.get("http://localhost:8080/admin/workers/" + admin_id, 
    {headers: {
      Authorization: stored.token
    }});
  }

  getWorkerByID(worker_id)
  {
    return axios.get("http://localhost:8080/admin/worker/" + worker_id, 
    {headers: {
      Authorization: stored.token
    }});
  }

  getWorkerByService(service)
  {
    return axios.get("http://localhost:8080/customer/makebooking/workers/" + service, 
    {headers: {
      Authorization: stored.token
    }});
  }

  updateWorker(worker, id)
  {
    return axios.put("http://localhost:8080/admin/editWorker/" + id, worker, 
    {headers: {
      Authorization: stored.token
    }});
  }

  deleteWorker(id){
    return axios.delete("http://localhost:8080/admin/deleteWorker/" + id,
    {headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: stored.token
    }});
  }

  createNewWorker(worker, token) {
    return axios.post("http://localhost:8080/admin/createWorker",worker,
    {headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: token
    }});
  }
}
export default new HandleWorkers()