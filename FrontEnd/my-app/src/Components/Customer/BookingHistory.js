import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import GetPastBookings from '../../actions/HandleBookings.js';
import Alert from 'react-bootstrap/Alert';
import CustomerDashboard from './CustomerDashBoard';
import { Redirect } from 'react-router-dom';

class BookingHistory extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = 
        {
            pastBookings: []
        }
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_CUSTOMER")
        {
            GetPastBookings.getPastBookingById(stored.id, stored.token).then((res) =>
            {
                this.setState({pastBookings: res.data});
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
                    console.log(err.response.data.message);
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
        console.log(stored.role);
        if (stored && stored.role === "ROLE_CUSTOMER")
        {
            return(
                <React.Fragment>
                    <CustomerDashboard/>
                    <div className = "container">

                        {
                            this.state.pastBookings.length > 0 && 
                            <Table className="table" striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th className="th">Booking ID</th>
                                        <th className="th">Service</th>
                                        <th className="th">Worker</th>
                                        <th className="th">Date</th>
                                        <th className="th">Start Time</th>
                                        <th className="th">End Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.pastBookings.map(
                                        pastBookings => 
                                        <tr key = {pastBookings.id}>
                                            <td> {pastBookings.id}</td>
                                            <td> {pastBookings.service}</td>
                                            <td> {pastBookings.worker.fName} {pastBookings.worker.lName}</td>
                                            <td> {pastBookings.date}</td>   
                                            <td> {pastBookings.startTime}</td>
                                            <td> {pastBookings.endTime}</td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        }
                        {
                            this.state.pastBookings.length <= 0 && 
                            <Alert className="alert" variant='danger'>
                                No Past Bookings
                            </Alert>
                            
                        }
                    </div>
                </React.Fragment>
            )
        }
        else 
        {
            return <Redirect to="/"/>
        }
    }
                
}
export default BookingHistory;