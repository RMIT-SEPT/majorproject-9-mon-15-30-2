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
            window.localStorage.clear();
            alert("Logout successfully");
            this.props.history.push('/');
        }).catch((error) =>
        {
            window.localStorage.clear();
            alert("Session expired");
            this.props.history.push('/');
        });
    }

    render() 
    {
        console.log("********************************hi");
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
                                        Create New Booking
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/currentbookings">
                                        Current Bookings
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