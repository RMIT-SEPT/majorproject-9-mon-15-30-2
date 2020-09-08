import React, {Component} from 'react';
import CustomerDashboard from './CustomerDashBoard';
import { Container, Alert } from 'react-bootstrap';

class Account extends Component
{

    render() {

        return (
        <React.Fragment>
            <CustomerDashboard/>
            <Container>
                <Alert variant='danger'>
                    Not Available
                </Alert>
            </Container>
        </React.Fragment>
        )
    }
}

export default Account;