import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import GetPastBookings from '../actions/HandleBookings.js';
import Alert from 'react-bootstrap/Alert';
import CustomerDashboard from './CustomerDashBoard';
class BookingHistory extends Component 
{
    
    constructor(props) 
    {
        super(props)
        this.state = {
            pastBookings: [],
            customer: []
        }
    }

    componentDidMount()
    {
        GetPastBookings.getPastBookingById(3).then((res) => {
            this.setState({pastBookings: res.data});
            console.log(res.data);
        });

    }

    render() 
    {
        if(this.state.pastBookings == "")
        {
            return (
                <React.Fragment>
                    <CustomerDashboard/>
                    <div className="container">
                        <Alert variant='danger'>
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
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Service</th>
                                    <th>Worker</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
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
}
export default BookingHistory;