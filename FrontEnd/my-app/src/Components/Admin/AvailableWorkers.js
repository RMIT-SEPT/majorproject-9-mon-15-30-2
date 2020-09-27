import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import AdminDashboard from './AdminDashboard';
import { Redirect } from 'react-router-dom';

class AvailableWorkers extends Component 
{
    render() 
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_ADMIN")
        {
            return (
                <React.Fragment>
                    <AdminDashboard/>
                    <div className="container">
                        <Alert variant='danger'>
                            No Available Workers At The Moment
                        </Alert>
                    </div>
                </React.Fragment>
            )
        }
        else 
        {
            return <Redirect to="/"/>
        }
    }
}
export default AvailableWorkers;