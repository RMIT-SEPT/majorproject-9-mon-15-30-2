import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import HandleSessions from '../../actions/HandleSessions';
import AdminDashboard from './AdminDashboard';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';

class ManagesSessions extends Component
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            availablesessions: []
        }
        this.editsession = this.editsession.bind(this);
    }

    editsession(session_id)
    {
        this.props.history.push(`/editsession/${session_id}`);
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if(stored && stored.role === "ROLE_ADMIN")
        {
            HandleSessions.getAllSessionsByAdminId(stored.id, stored.token).then((res) =>
            {
                this.setState({availablesessions: res.data});
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
        return(
            <React.Fragment>
                <AdminDashboard/>
                <div className="container">
                {
                    this.state.availablesessions.length <= 0 && 
                    <div className="pt-3">
                        <h3>Pending Bookings</h3>
                        <Alert className="alert" variant='danger'>
                            No Pending Bookings
                        </Alert>
                    </div>
                }
                {/*
                    This will display when session is found
                */}
                {
                    this.state.availablesessions.length > 0 &&
                    <div>
                        <h3>Sessions</h3>
                        <Table className="table" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="th">Booking ID</th>
                                    <th className="th">Worker</th>
                                    <th className="th">Day</th>
                                    <th className="th">Start Time</th>
                                    <th className="th">End Time</th>
                                    <th className="th">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.availablesessions.map(
                                        availablesessions => 
                                        <tr key={availablesessions.sessionId}>
                                            <td> {availablesessions.sessionId}</td>
                                            <td> {availablesessions.workerFirstName} {availablesessions.workerLastName}</td>
                                            <td> {availablesessions.day}</td>   
                                            <td> {availablesessions.startTime}</td>
                                            <td> {availablesessions.endTime}</td>
                                            <td>
                                                <button onClick={() =>  this.editsession(availablesessions.sessionId) } className="btn btn-info ml-3">
                                                    Edit
                                                </button>
                                            </td>
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
export default ManagesSessions;