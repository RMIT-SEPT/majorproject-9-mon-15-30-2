import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import AdminDashboard from './AdminDashboard';
import { Redirect } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import HandleWorkers from '../../actions/HandleWorkers';
import HandleSessions from '../../actions/HandleSessions';
import { UncontrolledCollapse} from 'reactstrap';

class AvailableWorkers extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            allworkersbyadminid: [],
            sessionbyworkerid: [],
            isOpened: ""
        }
        this.handleGetSessionByWorkerID = this.handleGetSessionByWorkerID.bind(this);
    }

    handleGetSessionByWorkerID(worker_id, admin_id)
    {
        HandleSessions.getSessionInAWeekByWorkerIDAndAdminID(worker_id, admin_id).then((res) =>
        {
            this.setState({sessionbyworkerid: res.data});
            console.log(res.data);
        }).catch((err) =>
        {
            // if(String(err.response.status) === "401")
            // {
            //     console.log(err.response.status);
            //     localStorage.clear();
            //     alert("Session Expired");
            //     this.props.history.push('/login');
            // }
            // else
            // {
                console.log(err.response.data.message);
            // }
        });
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        console.log(stored.token);
        if(stored && stored.role === "ROLE_ADMIN")
        {
            HandleWorkers.getWorkersByAdmin(stored.id).then((res) =>
            {
                this.setState({allworkersbyadminid: res.data});
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
                else if(String(err.response.status) === "404")
                {
                    alert("Not Found");
                    this.props.history.push('/');
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
        if (stored && stored.role === "ROLE_ADMIN")
        {
            if(this.state.allworkersbyadminid.length <= 0 )
            {
                return (
                    <React.Fragment>
                        <AdminDashboard/>
                        <div className="container">
                            <Alert variant='danger'>
                                No Available Workers At The Moment
                            </Alert>
                        </div>
                    </React.Fragment>
                )
            }
            else
            {
                return (
                    <React.Fragment>
                        <AdminDashboard/>
                        <div className="container">
                            <h3>Available Workers</h3>
                            {
                                this.state.allworkersbyadminid.map(
                                    allworkersbyadminid => 
                                    <React.Fragment>
                                    <div>
                                        <button className="btn btn-secondary btn-lg btn-block mb-3" key = {allworkersbyadminid.id} id={"toggler"+allworkersbyadminid.id} onClick={() => this.handleGetSessionByWorkerID(allworkersbyadminid.id, stored.id)}>
                                            {allworkersbyadminid.fName}     {allworkersbyadminid.lName}
                                        </button>
                                    </div>
                                    <UncontrolledCollapse toggler={"#toggler"+allworkersbyadminid.id}>
                                    {
                                        this.state.sessionbyworkerid.length > 0 &&
                                        <Table className="table" striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th className="th">Date</th>
                                                <th className="th">Start Time</th>
                                                <th className="th">End Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.sessionbyworkerid.map(
                                                    sessionbyworkerid => 
                                                    <tr>
                                                        <td> {sessionbyworkerid.date}</td>
                                                        <td> {sessionbyworkerid.startTime}</td>
                                                        <td> {sessionbyworkerid.endTime}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                    }
                                    </UncontrolledCollapse>
                                    </React.Fragment>
                                )
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
export default AvailableWorkers;