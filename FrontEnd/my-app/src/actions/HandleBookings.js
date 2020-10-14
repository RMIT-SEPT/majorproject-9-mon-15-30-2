import axios from "axios";
var stored = JSON.parse(localStorage.getItem("user"));

class HandleBookings 
{
  createBooking(booking, token)
  {
    return axios.post("http://localhost:8080/customer/createbooking", booking,
    {
      headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: token
    }});
  }

  getNewBookingById(customer_id, token)
  {
    return axios.get("http://localhost:8080/customer/newbookings/" + customer_id, 
    {
      headers: {
      Authorization: token
    }});
  }

  getPastBookingById(customer_id, token)
  {
    return axios.get("http://localhost:8080/customer/historybookings/" + customer_id, 
    {
      headers: {
      Authorization: token
    }});
  }

  getAvailableSessionsByWorkerAndService(worker_id, service, token)
  {
    return axios.get("http://localhost:8080/customer/makebooking/sessions/" + worker_id + "/" + service, 
    {
      headers: {
      Authorization: token
    }});
  }

  getNewBookingsByAdminID(admin_id, token)
  {
    return axios.get("http://localhost:8080/admin/newBookingsAdmin/"+admin_id,
    {
      headers: {
        Authorization: token
      }
    });
  }

  getPastBookingsByAdminID(admin_id, token)
  {
    return axios.get("http://localhost:8080/admin/pastBookingsAdmin/" + admin_id,
    {
      headers: {
        Authorization: token
      }
    });
  }

  confirmBooking(booking_id, booking, token)
  {
    return axios.put("http://localhost:8080/admin/confirmBooking/"+booking_id, booking,
    { headers: {
      Authorization: token
    }});
  }

  cancelBooking(booking_id, token)
  {
    return axios.put("http://localhost:8080/customer/cancelBooking/"+booking_id, "'",
    { headers: {
      Authorization: token
    }});
  }
}
export default new HandleBookings();