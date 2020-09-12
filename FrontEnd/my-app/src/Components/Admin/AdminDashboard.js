import React, { Component } from 'react'

class AdminDashboard extends Component {
    render() {
        return (
            <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <a className="navbar-brand" href="/adminhomepage">
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
                                <a className="nav-link" href="/employee">
                                    View Employee
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/customer">
                                    View Customer
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/addemployee">
                                    Add New Employee
                                </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">
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
export default AdminDashboard;