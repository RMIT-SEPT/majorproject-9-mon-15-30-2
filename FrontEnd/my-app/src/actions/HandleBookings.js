import axios from "axios";

class HandleBookings 
{
    createBooking(booking)
    {
      return axios.post("http://localhost:8080/customer/createbooking", booking, {withCredentials: false},
        { 
          headers: 
          {
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }
        }
      );
    }

    getNewBookingById(customer_id)
    {
      return axios.get("http://localhost:8080/customer/newbookings/" + customer_id);
    }

    getPastBookingById(customer_id)
    {
      return axios.get("http://localhost:8080/customer/historybookings/" + customer_id);
    }

    getAvailableSessionsByWorkerAndService(worker_id, service)
    {
      return axios.get("http://localhost:8080/customer/makebooking/sessions/" + worker_id + "/" + service);
    }

}
export default new HandleBookings()