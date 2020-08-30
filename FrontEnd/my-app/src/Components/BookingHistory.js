import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';

class BookingHistroy extends Component {
    render() {
        return (
            <div className="container">
                <Alert variant='danger'>
                    No Past Booking Available
                </Alert>
            </div>
        )
    }
}
export default BookingHistroy;