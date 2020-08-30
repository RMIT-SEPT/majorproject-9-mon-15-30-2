import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import NewBookingImage from '/Users/chhayhykourn/Documents/RMIT/Year2/SoftwareEngineering-Process_and_Tools/majorproject-9-mon-15-30-2/FrontEnd/my-app/src/Components/image/newBooking.jpg';
import AddEmployeeImage from '/Users/chhayhykourn/Documents/RMIT/Year2/SoftwareEngineering-Process_and_Tools/majorproject-9-mon-15-30-2/FrontEnd/my-app/src/Components/image/addEmployee.jpg';
import BookingHistory from '/Users/chhayhykourn/Documents/RMIT/Year2/SoftwareEngineering-Process_and_Tools/majorproject-9-mon-15-30-2/FrontEnd/my-app/src/Components/image/bookingHistory.jpg';

class HomePage extends Component {
    render() {
        return (
            <div className="container">
                
                <Jumbotron fluid>
                    <Container>
                    <h1>SEPT/9.MON-15.30-2</h1>
                    <p>
                        Team Members: 
                        <ul>
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
                        </ul> 
                    </p>
                    </Container>
                </Jumbotron>
        
                <div className="row pt-3">
                    <div className="col">
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={NewBookingImage} />
                            <Card.Body>
                                <Card.Title>New Booking</Card.Title>
                                <Button variant="dark" href="/newbookings">New Booking</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={AddEmployeeImage} />
                            <Card.Body>
                                <Card.Title>Add Employee</Card.Title>
                                <Button variant="dark" href="/addemployee">Add Employee</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col">
                        <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={BookingHistory} />
                            <Card.Body>
                                <Card.Title>Booking History</Card.Title>
                                <Button variant="dark" href="/bookinghistory">Booking History</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomePage;