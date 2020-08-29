import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

class Employee extends Component {
    render() {
        return (
            <div className="container">
                <Alert variant='danger'>
                    No Employee Available
                </Alert>
            </div>
        )
    }
}
export default Employee;