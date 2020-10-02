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
        if (stored)
        {
            if(this.state.profile <= 0)
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
                                            <label> Address: </label>
                                            <div> &nbsp; {this.state.profile.address} </div>
                                        </div>
                                        <div className = "row">
                                            <label> Email: </label>
                                            <div> &nbsp; {this.state.profile.email} </div>
                                        </div>
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