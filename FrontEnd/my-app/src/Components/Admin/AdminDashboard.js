import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import HandleLogout from '../../actions/HandleRegisterLogin';

class AdminDashboard extends Component 
{
    constructor(props) 
    {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() 
    {
        HandleLogout.Logout().then((response) =>
        {
            console.log(localStorage.getItem("user"));
            window.localStorage.clear();
            this.props.history.push("/");
            alert("Logout successfully");
        }, (error) =>
        {
            console.log(localStorage.getItem("user"));
            window.localStorage.clear();
            alert("Session expired");
            this.props.history.push('/');
        });
    }

    render() 
    {
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <a className="navbar-brand" href="/">
                            Booking System
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/availableworkers">
                                        Available Workers
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/employees">
                                        View Employees
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/addemployee">
                                        Add New Employee
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/createsession">
                                        Create New Session
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/viewallbookings">
                                        Manage Bookings
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/managessessions">
                                        Manage Sessions
                                    </a>
                                </li>
                            </ul>

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" onClick={this.logOut} href="#logout">
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>        
        )
    }
}
export default withRouter(AdminDashboard);