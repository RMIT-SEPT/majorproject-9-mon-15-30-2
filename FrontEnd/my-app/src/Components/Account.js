import React, {Component} from 'react';
import CustomerDashboard from './Customer/CustomerDashBoard';
import { Container, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

class Account extends Component
{
    render() 
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && (stored.role === "ROLE_CUSTOMER" || stored.role === "ROLE_WORKER"))
        {
            return(
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
        else 
        {
            return <Redirect to="/"/>
        }
    }
}
export default Account;