import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import GetPastBookings from '../actions/HandleBookings.js';
import Alert from 'react-bootstrap/Alert';

class CurrentBookings extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = {
            pastBookings: []
        }
    }

    componentDidMount()
    {
        GetPastBookings.getPastBookingById(3).then((res) => {
            this.setState({pastBookings: res.data});
        });
    }

    render() 
    {
        if(this.state.pastBookings == 0)
        {
            return (
                <div className="container">
                    <Alert variant='danger'>
                        No Past Booking Available
                    </Alert>
                </div>
            )
        }
        return(
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
        )
    }
}
export default CurrentBookings;