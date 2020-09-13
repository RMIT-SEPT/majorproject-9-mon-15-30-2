import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import GetBookings from '../actions/HandleBookings.js';
import Alert from 'react-bootstrap/Alert';
import CustomerDashboard from './Customer/CustomerDashBoard';


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
            console.log(res.data);
        });
    }

    render() 
    {
        if(this.state.currentBookings === 0)
        {
            return (
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
                </React.Fragment>
                
            )
        }
        
    }
}
export default CurrentBookings;