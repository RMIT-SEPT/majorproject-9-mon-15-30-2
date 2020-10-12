import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import HandleLogout from '../../actions/HandleRegisterLogin';

class DashboardWorker extends Component 
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
            alert("Logout successfully");
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

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item" >
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
                </nav>
            </div>
        )
    }
}
export default withRouter(DashboardWorker);