import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import GetBookings from '../actions/HandleBookings.js';
import Alert from 'react-bootstrap/Alert';


class CurrentBookings extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = {
            currentBookings: []
        }
    }

    componentDidMount()
    {
        GetBookings.getNewBookingById(3).then((res) => {
            this.setState({currentBookings: res.data});
        });
    }

    render() 
    {
        if(this.state.currentBookings == 0)
        {
            return (
                <div className="container">
                    <Alert variant='danger'>
                        No Current Booking Available
                    </Alert>
                </div>
                
            )
        }

        else
        {
            return(

                <div className="container">

                    {/*<Alert variant='danger'>
                        No Current Booking Available
                    </Alert>*/}

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
                                this.state.currentBookings.map(
                                    currentBookings => 
                                    <tr key = {currentBookings.id}>
                                        <td> {currentBookings.id}</td>
                                        <td> {currentBookings.service}</td>
                                        <td> {currentBookings.worker.fName}</td>
                                        <td> {currentBookings.date}</td>   
                                        <td> {currentBookings.startTime}</td>
                                        <td> {currentBookings.endTime}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            )
        }
        
    }
}
export default CurrentBookings;