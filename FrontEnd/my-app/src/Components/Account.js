import React, {Component} from 'react';
import CustomerDashboard from './Customer/CustomerDashBoard';
import WorkerDashboard from './Worker/WorkerDashBoard';
import { Container, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Workers from '../actions/HandleWorkers';
import Customers from '../actions/HandleCustomer';
import Table from 'react-bootstrap/Table';

class Account extends Component
{
    constructor()
    {
        super()
        this.state = 
        {
            profile: [],
            workingHour: [],
            id: ""
        }
        this.editCustomer = this.editCustomer.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
    }

    editCustomer(id)
    {
        this.props.history.push(`/editCustomer/${id}`);
    }

    updatePassword(id)
    {
        this.props.history.push(`/updatePassword/${id}`);
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_CUSTOMER")
        {
            this.getCustomerDetail(stored.id, stored.token);
        }
        else if (stored && stored.role === "ROLE_WORKER")
        {
            this.getWorkerDetail(stored.id, stored.token);
            this.getWorkerWorkingHour(stored.id, stored.token);
        }
        else
        {
            return <Redirect to="/"/>
        }
    }

    getCustomerDetail(storedId, token)
    {
        return Customers.getProfile(storedId, token).then((res) => 
        {
            this.setState(
            {
                profile: res.data,
                id: storedId
            });
            console.log(res.data);
        }, (err) => 
        {
            if(String(err.response.status) === "401")
            {
                console.log(err.response.status);
                localStorage.clear();
                alert("Session Expired");
                this.props.history.push('/login');
            }
        });
    }

    getWorkerDetail(storedId, token)
    {
        return Workers.getProfile(storedId, token).then((res) => 
        {
            this.setState(
            {
                profile: res.data
            });
            console.log(res.data);
        }, (err) => 
        {
            if(String(err.response.status) === "401")
            {
                console.log(err.response.status);
                localStorage.clear();
                alert("Session Expired");
                this.props.history.push('/login');
            }
        });
    }

    getWorkerWorkingHour(storedId, token)
    {
        return Workers.getSession(storedId, token).then((res) => 
        {
            this.setState(
            {
                workingHour: res.data
            });
            console.log(res.data);
        }, (err) => 
        {
            console.log(err.response);
            if(String(err.response.status) === "401")
            {
                console.log(err.response.status);
                localStorage.clear();
                alert("Session Expired");
                this.props.history.push('/login');
            }
        });
    }

    render() 
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if(stored  && (stored.role === "ROLE_WORKER" || stored.role === "ROLE_CUSTOMER"))
        {
            if(this.state.profile <= 0)
            {
                if (stored.role === "ROLE_WORKER")
                { 
                    return(
                        <React.Fragment>
                            <WorkerDashboard/>
                                {this.renderNotAvailable()}
                        </React.Fragment>
                    )
                }
                else if (stored.role === "ROLE_CUSTOMER")
                { 
                    return(
                        <React.Fragment>
                            <CustomerDashboard/>
                                {this.renderNotAvailable()}
                        </React.Fragment>
                    )
                }
            }
            else
            {
                if (stored.role === "ROLE_WORKER")
                {
                    return (
                        <React.Fragment>
                            <WorkerDashboard/>
                                {this.renderWorkerView()}
                        </React.Fragment>
                    )
                }
                else if (stored.role === "ROLE_CUSTOMER")
                {
                    return (
                        <React.Fragment>
                            <CustomerDashboard/>
                                {this.renderCustomerView()}
                        </React.Fragment>
                    )
                }
            }
        }
        else 
        {
            return <Redirect to="/"/>
        }
    }

    renderNotAvailable()
    {
        return(
            <Container>
                <Alert variant='danger'>
                    Not Available
                </Alert>
            </Container>
        )
    }

    renderWorkerView()
    {
        return(
            <Container>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center">Account Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> First Name: </label>
                            <div> &nbsp; {this.state.profile.fName} </div>
                        </div>
                        <div className = "row">
                            <label> Last Name: </label>
                            <div> &nbsp; {this.state.profile.lName} </div>
                        </div>
                        <div className = "row">
                            <label> Phone Number: </label>
                            <div> &nbsp; {this.state.profile.phoneNumber} </div>
                        </div>
                        <div className = "row">
                            <label> Business Name: </label>
                            <div> &nbsp; {this.state.profile.admin.adminName} </div>
                        </div>
                        <div className = "row">
                            <label> Service: </label>
                            <div> &nbsp; {this.state.profile.admin.service} </div>
                        </div>
                        {
                            this.state.workingHour.length > 0 &&
                        <div className="container">
                            <h3 className = "text-center">Working Hour</h3>
                            <Table className="table" striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th className="th">Day</th>
                                        <th className="th">Start Time</th>
                                        <th className="th">End Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.workingHour.sort((a,b) => a.day > b.day).map(
                                        (workingHour,i) => 
                                        <tr key = {i}>
                                        {}
                                            <td className="day"> {this.displayDay(workingHour.day)}</td>
                                            <td className="startTime"> {workingHour.startTime}</td>
                                            <td className="endTime"> {workingHour.id}</td>
                                        </tr>
                                        
                                    )
                                }
                                </tbody>
                            </Table>
                        </div>
                        }
                    </div>
                </div>
            </Container>
        )
    }

    displayDay(index)
    {
        if (index === 1)
        {
            return "Sunday"
        }
        else  if (index === 2)
        {
            return "Monday"
        }
        else  if (index === 3)
        {
            return "Tuesday"
        }
        else  if (index === 4)
        {
            return "Wednesday"
        }
        else  if (index === 5)
        {
            return "Thursday"
        }
        else  if (index === 6)
        {
            return "Friday"
        }
        else  if (index === 7)
        {
            return "Saturday"
        }
        else 
        {
            return "NULL"
        }
    }

    renderCustomerView()
    {
        return(
            <Container>
                <div className = "card col-md-6 offset-md-3">
                <h3 className = "text-center">Account Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> First Name: </label>
                            <div> &nbsp; {this.state.profile.fName} </div>
                        </div>
                        <div className = "row">
                            <label> Last Name: </label>
                            <div> &nbsp; {this.state.profile.lName} </div>
                        </div>
                        <div className = "row">
                            <label> Phone Number: </label>
                            <div> &nbsp; {this.state.profile.phoneNumber} </div>
                        </div>
                        <div className = "row">
                            <label> Address: </label>
                            <div> &nbsp; {this.state.profile.address} </div>
                        </div>
                        <div className = "row">
                            <label> Email: </label>
                            <div> &nbsp; {this.state.profile.email} </div>
                        </div>
                        <button className="btn btn-primary" 
                                onClick={() => this.editCustomer(this.state.id)} 
                                style={{marginLeft: "10px"}}>Edit Details
                        </button>
                        <button className="btn btn-success" 
                                onClick={() => this.updatePassword(this.state.id)} 
                                style={{marginLeft: "10px"}}>Update Password
                        </button>
                    </div>
                </div>
            </Container>
        )
    }
}
export default Account;