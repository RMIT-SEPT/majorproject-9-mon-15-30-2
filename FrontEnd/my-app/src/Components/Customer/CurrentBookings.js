import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import GetBookings from '../../actions/HandleBookings.js';
import Alert from 'react-bootstrap/Alert';
import CustomerDashboard from './CustomerDashBoard';
import { Redirect } from 'react-router-dom';

class CurrentBookings extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = 
        {
            currentBookings: []
        }
        this.cancelbooking = this.cancelbooking.bind(this);
    }

    cancelbooking(booking_id)
    {
        GetBookings.cancelBooking(booking_id).then((res) => 
        {
            alert("Booking id: " + booking_id + " has been cancelled");
            window.location.reload();
        }).catch((err) => 
        {
            if(String(err.response.status) === "401")
            {
                console.log(err.response.status);
                localStorage.clear();
                alert("Session Expired");
                this.props.history.push('/login');
            }
            else
            {
                alert(err.response.data.message);
                console.log(err.response);
            }
        });
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_CUSTOMER")
        {
            GetBookings.getNewBookingById(stored.id).then((res) =>
            {
                this.setState({currentBookings: res.data});
                console.log(res.data);
            }).catch((err) =>
            {
                if(String(err.response.status) === "401")
                {
                    console.log(err.response.status);
                    localStorage.clear();
                    alert("Session Expired");
                    this.props.history.push('/login');
                }
                else
                {
                    console.log(err.response);
                }
            });
        }
        else
        {
            return <Redirect to="/"/>
        }
    }

    render() 
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_CUSTOMER")
        {
            if(this.state.currentBookings <= 0)
            {
                return(
                    <React.Fragment>
                        <CustomerDashboard/>
                        <div className="container">
                            <Alert className="alert" variant='danger'>
                                No Current Booking Available
                            </Alert>
                        </div>
                    </React.Fragment>
                )
            }
            else
            {
                return(
                    <React.Fragment>
                        <CustomerDashboard/>
                        <div className="container">
                            <Table className="table" striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th className="th">Booking ID</th>
                                        <th className="th">Service</th>
                                        <th className="th">Worker</th>
                                        <th className="th">Date</th>
                                        <th className="th">Start Time</th>
                                        <th className="th">End Time</th>
                                        <th className="th">Confirmation</th>
                                        <th className="th">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.currentBookings.map(
                                        currentBookings => 
                                        <tr key = {currentBookings.id}>
                                            <td> {currentBookings.id}</td>
                                            <td> {currentBookings.service}</td>
                                            <td> {currentBookings.worker.fName} {currentBookings.worker.lName}</td>
                                            <td> {currentBookings.date}</td>   
                                            <td> {currentBookings.startTime}</td>
                                            <td> {currentBookings.endTime}</td>
                                            <td> {currentBookings.confirmation}</td>
                                            <td>
                                                <button onClick={() => this.cancelbooking(currentBookings.id)} className="btn btn-danger ml-3">
                                                    Cancel
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        </div>
                    </React.Fragment>
                    
                )
            }
        }
        else 
        {
            return <Redirect to="/"/>
        }
    }
}
export default CurrentBookings;