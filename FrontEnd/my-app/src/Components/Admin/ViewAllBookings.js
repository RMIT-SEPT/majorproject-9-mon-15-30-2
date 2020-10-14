import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import HandleBookings from '../../actions/HandleBookings';
import AdminDashboard from './AdminDashboard';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

class ViewAllBookings extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            pendingbookings: [],
            newbookings: [],
            pastbookings: []
        }
        this.confirmBooking = this.confirmBooking.bind(this);
        this.rejectBooking = this.rejectBooking.bind(this);
    }

    confirmBooking(booking_id, token)
    {
        console.log("confirm: "+booking_id);
        let bookingResponse =
        {
            status: "NEW_BOOKING",
            confirmation: "CONFIRMED"
        }
        HandleBookings.confirmBooking(booking_id, bookingResponse, token).then((res) => 
        {
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
                console.log(err.response.data.message);
                alert(err.response.data.message);
            }
        });
    }

    rejectBooking(booking_id, token)
    {
        console.log("reject: "+ booking_id);
        let bookingResponse =
        {
            status: "CANCELLED_BOOKING",
            confirmation: "CANCELLED"
        }
        HandleBookings.confirmBooking(booking_id, bookingResponse, token).then((res) => 
        {
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
                console.log(err.response.data.message);
                alert(err.response.data.message);
            }
        });
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if(stored && stored.role === "ROLE_ADMIN")
        {
            HandleBookings.getNewBookingsByAdminID(stored.id, stored.token).then((res) => 
            {
                for(var i=0; i < res.data.length; i++)
                {
                    if(res.data[i].confirmation === "CONFIRMED")
                    {
                        console.log(res.data[i]);
                        this.setState({newbookings: this.state.newbookings.concat(res.data[i])});
                    }
                    else if(res.data[i].confirmation === "PENDING")
                    {
                        this.setState({pendingbookings: this.state.pendingbookings.concat(res.data[i])});
                    }
                }
                
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

            HandleBookings.getPastBookingsByAdminID(stored.id, stored.token).then((res) => 
            {   
                this.setState({pastbookings: res.data});
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
        if(stored && stored.role === "ROLE_ADMIN")
        {
            if(this.state.pendingbookings <= 0 && this.state.newbookings <= 0 && this.state.pastbookings <= 0)
            {
                return(
                    <React.Fragment>
                        <AdminDashboard/>
                        <div className="container">
                            <Alert className="alert" variant='danger'>
                                No Booking
                            </Alert>
                        </div>
                    </React.Fragment>
                )
            }
            else
            {
                return(
                    <React.Fragment>
                        <AdminDashboard/>
                        <div className="container">
                        {/*
                            This will display if no pending bookings
                        */}
                        {
                            this.state.pendingbookings.length <= 0 && 
                            <div className="pt-3">
                                <h3>Pending Bookings</h3>
                                <Alert className="alert" variant='danger'>
                                    No Pending Bookings
                                </Alert>
                            </div>
                        }
                        {/*
                            This will display when pending booking is found
                        */}
                        {
                            this.state.pendingbookings.length  > 0 &&
                            <div>
                                <h3>Pending Bookings</h3>
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
                                        
                                        this.state.pendingbookings.map(
                                            
                                            pendingbookings => 
                                            <tr key = {pendingbookings.id}>
                                                <td> {pendingbookings.id}</td>
                                                <td> {pendingbookings.service}</td>
                                                <td> {pendingbookings.worker.fName} {pendingbookings.worker.lName}</td>
                                                <td> {pendingbookings.date}</td>   
                                                <td> {pendingbookings.startTime}</td>
                                                <td> {pendingbookings.endTime}</td>
                                                <td> {pendingbookings.confirmation}</td>
                                                <td> 
                                                    <button onClick={() => this.confirmBooking(pendingbookings.id, stored.token)} className="btn btn-info ml-3">
                                                        Confirm
                                                    </button>
                                                    <button onClick={() => this.rejectBooking(pendingbookings.id, stored.token)} className="btn btn-danger ml-3">
                                                        Reject
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </Table>
                            </div>
                            
                        }
                        {/*
                            This will display if no new bookings
                        */}
                        {
                            this.state.newbookings.length <= 0 && 
                            <div className="pt-3">
                                <h3>New Bookings</h3>
                                <Alert className="alert" variant='danger'>
                                    No New Bookings
                                </Alert>
                            </div>
                        }
                        {/*
                            This will display when new booking is found
                        */}
                        {
                            this.state.newbookings.length  > 0 && 
                            <div className="pt-3"> 
                                <h3>New Bookings</h3>
                                <Table className="table" striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th className="th">Booking ID</th>
                                            <th className="th">Service</th>
                                            <th className="th">Worker</th>
                                            <th className="th">Date</th>
                                            <th className="th">Start Time</th>
                                            <th className="th">End Time</th>
                                            <th className="th">Status</th>
                                            <th className="th">Confirmation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.newbookings.map(
                                            newbookings => 
                                            <tr key = {newbookings.id}>
                                                <td> {newbookings.id}</td>
                                                <td> {newbookings.service}</td>
                                                <td> {newbookings.worker.fName} {newbookings.worker.lName}</td>
                                                <td> {newbookings.date}</td>   
                                                <td> {newbookings.startTime}</td>
                                                <td> {newbookings.endTime}</td>
                                                <td> {newbookings.status}</td>
                                                <td> {newbookings.confirmation}</td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </Table>
                            </div>
                            
                        }
                        {/*
                            This will display if no past bookings
                        */}
                        {
                            this.state.pastbookings.length <= 0 && 
                            <div>
                                <h3>Past Bookings</h3>
                                <Alert className="alert" variant='danger'>
                                    No Past Bookings
                                </Alert>
                            </div>
                        }
                        {/*
                            This will display when past booking is found
                        */}
                        {
                            this.state.pastbookings.length > 0 && 
                            <div className = "pt-3">
                                <h3>Past Bookings</h3>
                                <Table className="table" striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th className="th">Booking ID</th>
                                            <th className="th">Service</th>
                                            <th className="th">Worker</th>
                                            <th className="th">Date</th>
                                            <th className="th">Start Time</th>
                                            <th className="th">End Time</th>
                                            <th className="th">Status</th>
                                            <th className="th">Confirmation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.pastbookings.map(
                                            pastbookings => 
                                            <tr key = {pastbookings.id}>
                                                <td> {pastbookings.id}</td>
                                                <td> {pastbookings.service}</td>
                                                <td> {pastbookings.worker.fName} {pastbookings.worker.lName}</td>
                                                <td> {pastbookings.date}</td>   
                                                <td> {pastbookings.startTime}</td>
                                                <td> {pastbookings.endTime}</td>
                                                <td> {pastbookings.status}</td>
                                                <td> {pastbookings.confirmation}</td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </Table>
                            </div>
                        }
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
export default ViewAllBookings;