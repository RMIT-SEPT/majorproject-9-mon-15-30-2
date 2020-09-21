import axios from "axios";

class HandleBookings 
{
  createBooking(booking_id) 
  {
    return axios.post("http://localhost:8080/makebooking/create", booking_id, {withCredentials: false},
    { headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    });
  }

  getNewBookingById(customer_id){
    return axios.get("http://localhost:8080/newbookings/" + customer_id);
  }

  getPastBookingById(customer_id){
    return axios.get("http://localhost:8080/historybookings/" + customer_id);
  }

  getAvailableSessionsByWorkerAndService(worker_id, service){
    console.log("http://localhost:8080/makebooking/sessions/" + worker_id + "/" + service);
    return axios.get("http://localhost:8080/makebooking/sessions/" + worker_id + "/" + service);
    
  }

}
export default new HandleBookings()