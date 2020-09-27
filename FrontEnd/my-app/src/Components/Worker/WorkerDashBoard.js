import React, { Component } from 'react'
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
        localStorage.clear();
        HandleLogout.logOut();
        // SignUp.Logout().then((res) => 
        // {
        //     console.log(res.response);
        //     console.log(localStorage.getItem("user"));
        //     alert("logout successful");
        // }).catch((err) => 
        // {
        //     console.log(err.response);
        //     localStorage.clear();
        //     console.log(localStorage.getItem("user"));
        //     alert("session expired");
        // });
        // localStorage.clear();
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
                            <li className="nav-item" hidden>
                                <a className="nav-link" href="/account">
                                    Account
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.logOut} href="/">
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
export default DashboardWorker;