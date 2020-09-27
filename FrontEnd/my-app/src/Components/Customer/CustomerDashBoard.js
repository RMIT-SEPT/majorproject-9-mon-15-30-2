import React, { Component } from 'react'
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
        HandleLogout.Logout();
        // SignUp.Logout().then((res) => 
        // {
        //     localStorage.clear();
        //     console.log(res.response);
        //     console.log(localStorage.getItem("user"));
        //     alert("logout successful");
        // }).catch((err) => 
        // {
        //     localStorage.clear();
        //     console.log(err.response);
        //     console.log(localStorage.getItem("user"));
        //     alert("session expired");
        // }
        // ,(err) => {
        //     if (err.response.data <= 0)
        //     {
        //         console.log(err.response.data);
        //         this.setState({errorMessage: err.response.data.message});
        //         alert(err.response.data.message);
        //     }
        //     else 
        //     {
        //         console.log("Session Expired");
        //         alert("Session expired");
        //         localStorage.removeItem("user");
        //         this.props.history.push("/");   
        //     }
        // }
        // );
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
                                    <a className="nav-link" onClick={this.logOut} href="/">
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
export default NavigationBar;