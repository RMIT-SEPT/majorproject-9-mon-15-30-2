import React, {Component} from 'react';
import CustomerDashboard from './Customer/CustomerDashBoard';
import WorkerDashboard from './Worker/WorkerDashBoard';
import { Container, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Workers from '../actions/HandleWorkers';
import Customers from '../actions/HandleCustomer';

class Account extends Component
{
    constructor()
    {
        super()
        this.state = 
        {
            profile: []
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
            Customers.getProfile(stored.id).then((res) => 
            {
                this.setState({profile: res.data});
                console.log(res.data);
            });
        }
        else if (stored && stored.role === "ROLE_WORKER")
        {
            Workers.getProfile(stored.id).then((res) => 
            {
                this.setState({profile: res.data});
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
        else
        {
            return <Redirect to="/"/>
        }
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
                            <Container>
                                <Alert variant='danger'>
                                    Not Available
                                </Alert>
                            </Container>
                        </React.Fragment>
                    )
                }
                else if (stored.role === "ROLE_CUSTOMER")
                { 
                    return(
                        <React.Fragment>
                            <CustomerDashboard/>
                            <Container>
                                <Alert variant='danger'>
                                    Not Available
                                </Alert>
                            </Container>
                        </React.Fragment>
                    )
                }
            }
            else
            {
                if (stored.role === "ROLE_WORKER")
                {
                    return(
                        <React.Fragment>
                            <WorkerDashboard/>
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
                                </div>
                                </div>
                            </Container>
                        </React.Fragment>
                    )
                }
                else if (stored.role === "ROLE_CUSTOMER")
                {
                    return(
                        <React.Fragment>
                            <CustomerDashboard/>
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
                                                onClick={() => this.editCustomer(stored.id)} 
                                                style={{marginLeft: "10px"}}>Edit Details
                                        </button>
                                        <button className="btn btn-success" 
                                                onClick={() => this.updatePassword(stored.id)} 
                                                style={{marginLeft: "10px"}}>Update Password
                                        </button>
                                    </div>
                                </div>
                            </Container>
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
}
export default Account;