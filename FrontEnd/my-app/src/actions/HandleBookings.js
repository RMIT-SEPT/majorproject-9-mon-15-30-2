import axios from "axios";
var stored = JSON.parse(localStorage.getItem("user"));

class HandleBookings 
{
  createBooking(booking)
  {
    return axios.post("http://localhost:8080/customer/createbooking", booking,
      {
        headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        Authorization: stored.token
      }});
  }

  getNewBookingById(customer_id)
  {
    return axios.get("http://localhost:8080/customer/newbookings/" + customer_id, 
    {
      headers: {
      Authorization: stored.token
    }});
  }

  getPastBookingById(customer_id)
  {
    return axios.get("http://localhost:8080/customer/historybookings/" + customer_id, 
    {
      headers: {
      Authorization: stored.token
    }});
  }

  getAvailableSessionsByWorkerAndService(worker_id, service)
  {
    return axios.get("http://localhost:8080/customer/makebooking/sessions/" + worker_id + "/" + service, 
    {
      headers: {
      Authorization: stored.token
    }});
  }
}
export default new HandleBookings()