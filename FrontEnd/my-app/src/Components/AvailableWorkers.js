import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

class AvailableWorkers extends Component {
    render() {
        return (
            <div className="container">
                <Alert variant='danger'>
                    No Avaible Workers At The Moment
                </Alert>
            </div>
        )
    }
}
export default AvailableWorkers;