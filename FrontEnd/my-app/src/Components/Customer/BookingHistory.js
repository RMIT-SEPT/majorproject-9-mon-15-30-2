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
            pastBookings: [],
            customer: []
        }
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_CUSTOMER")
        {
            GetPastBookings.getPastBookingById(stored.id).then((res) =>
            {
                this.setState({pastBookings: res.data});
                console.log(res.data);
            }).catch((err) =>
            {
                console.log(err.response.data.message);
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
            if(this.state.pastBookings <= 0)
            {
                return(
                    <React.Fragment>
                        <CustomerDashboard/>
                        <div className="container">
                            <Alert className="alert" variant='danger'>
                                No Past Booking Available
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
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.pastBookings.map(
                                        pastBookings => 
                                        <tr key = {pastBookings.id}>
                                            <td> {pastBookings.id}</td>
                                            <td> {pastBookings.service}</td>
                                            <td> {pastBookings.worker.fName}</td>
                                            <td> {pastBookings.date}</td>   
                                            <td> {pastBookings.startTime}</td>
                                            <td> {pastBookings.endTime}</td>
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
export default BookingHistory;