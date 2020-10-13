import axios from "axios";
var stored = JSON.parse(localStorage.getItem("user"));

class HandleWorkers 
{
  getWorkersByAdmin(admin_id, token)
  {
    return axios.get("http://localhost:8080/admin/workers/" + admin_id, 
    {headers: {
      Authorization: token
    }});
  }

  getWorkerByID(worker_id, admin_id, token)
  {
    return axios.get("http://localhost:8080/admin/worker/" + worker_id + "/" + admin_id,
    {headers: {
      Authorization: token
    }});
  }

  getWorkerByService(service)
  {
    return axios.get("http://localhost:8080/customer/makebooking/workers/" + service, 
    {headers: {
      Authorization: stored.token
    }});
  }

  updateWorker(worker, id, admin_id, token)
  {
    return axios.put("http://localhost:8080/admin/editWorker/" + id + "/" + admin_id, worker,
    {headers: {
      Authorization: token
    }});
  }

  deleteWorker(id, admin_id, token)
  {
    return axios.delete("http://localhost:8080/admin/deleteWorker/" + id + "/" + admin_id,
    {headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: stored
    }});
  }

  createNewWorker(worker, token) 
  {
    return axios.post("http://localhost:8080/admin/createWorker",worker,
    {headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: token
    }});
  }

  getProfile(id, token)
  {
    return axios.get("http://localhost:8080/worker/profile/" + id ,
      {headers: {
        Authorization: token
      }});
  }

  getSession(id, token)
  {
    return axios.get("http://localhost:8080/worker/sessions/" + id ,
      {headers: {
        Authorization: token
      }});
  }
}
export default new HandleWorkers();