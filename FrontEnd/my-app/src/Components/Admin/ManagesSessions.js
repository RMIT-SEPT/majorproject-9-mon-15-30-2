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
            availablesessions: [],
            notifiedDate: ""
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
                this.setState({notifiedDate: res.data});
                console.log(res.data)
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

    deleteSession(resetNumber)
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        const reset =
        {
            "isReset": resetNumber
        }
        HandleSessions.resetSession(reset, stored.id, stored.token).then((res) =>
        {
            if(resetNumber === 1)
            {
                alert("All current sessions are deleted");
                this.props.history.push('/createsession');
            }
            else 
            {
                alert("All current sessions are kept");
                window.location.reload();
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
        })
    }

    render()
    {
        if(String(this.state.notifiedDate) === "true")
        {
            return(
                <React.Fragment>
                    <AdminDashboard/>
                    <div className="card card-container">
                        <p className="display-5 text-center ">Your sessions have been expired after a month.</p>
                        <h4 className="display-5 text-center pb-4">Do you want to reset your Session?</h4>
                        <div className="centre">
                            <button onClick={() =>  this.deleteSession(0) } className="btn btn-info" >
                            Keep</button> &nbsp;&nbsp;&nbsp;
                            <button  onClick={() =>  this.deleteSession(1) } className="btn btn-danger" >
                            Reset</button>
                        </div>
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
                    {
                        this.state.availablesessions.length <= 0 && 
                        <div className="pt-3">
                            <h3>Sessions</h3>
                            <Alert className="alert" variant='danger'>
                                No session available. Please create new session.
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
                                        <th className="th">Session ID</th>
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
}
export default ManagesSessions;