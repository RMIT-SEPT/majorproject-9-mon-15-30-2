import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import AdminDashboard from './AdminDashboard';

class AvailableWorkers extends Component {
    render() {
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
}
export default AvailableWorkers;