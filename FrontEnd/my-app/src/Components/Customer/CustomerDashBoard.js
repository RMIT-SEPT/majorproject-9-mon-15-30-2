import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import HandleLogout from '../../actions/HandleRegisterLogin';

class NavigationBar extends Component 
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
            console.log(response);
            alert("Logout successful");
            this.props.history.push('/');
        }).catch((error) =>
        {
            console.log(localStorage.getItem("user"));
            window.localStorage.clear();
            console.log(error);
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
                                    <a className="nav-link" href="/newbooking">
                                        New Bookings
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/newbookingsbyservices" hidden>
                                        New Bookings by Services
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/newbookingsbyworkers" hidden>
                                        New Bookings by Workers
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/currentbookings">
                                        View Current Bookings
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/bookinghistory">
                                        Booking History
                                    </a>
                                </li>
                            </ul>

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/account">
                                        Account
                                    </a>
                                </li>
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
export default withRouter(NavigationBar);