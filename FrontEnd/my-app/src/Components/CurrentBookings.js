import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

class CurrentBookings extends Component {
    render() {
        return (
            <div className="container">
                <Alert variant='danger'>
                    No Current Booking Available
                </Alert>
            </div>
        )
    }
}
export default CurrentBookings;