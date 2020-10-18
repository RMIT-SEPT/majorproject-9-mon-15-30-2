import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import CustomerDashboard from './CustomerDashBoard';
import NewBookingImage from '../../Components/image/newBooking.jpg';
import BookingHistory from '../../Components/image/bookingHistory.jpg';
import { Redirect } from 'react-router-dom';

class HomePage extends Component 
{
    render() 
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_CUSTOMER")
        {
            return(
                <React.Fragment>
                    <CustomerDashboard/>
                    <div className="container">
                        <Jumbotron fluid>
                            <Container>
                            <h1>SEPT/9.MON-15.30-2</h1>
                            <p>
                                Team Members: 
                                
                                    <li>
                                        Bossen, William (s3658961)
                                    </li>
                                    <li>
                                        Kourn, Chhayhy (s3699618)
                                    </li>
                                    <li>
                                        Le, Hue Phuong (s3687477)
                                    </li>
                                    <li>
                                        Leng, Meng Kheang (s3704080)
                                    </li>
                                    <li>
                                        Villaflores, Vincent (s3728807)
                                    </li>
                                
                            </p>
                            </Container>
                        </Jumbotron>
                        
                        <div className="row pt-3">
                            <div className="col">
                                <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={NewBookingImage} />
                                    <Card.Body>
                                        <Card.Title>New Booking</Card.Title>
                                        <Button variant="dark" href="/newbooking">New Booking</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                            
                            <div className="col">
                                <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={BookingHistory} />
                                    <Card.Body>
                                        <Card.Title>View Current Booking</Card.Title>
                                        <Button variant="dark" href="/currentbookings">View Current Booking</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
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
export default HomePage;