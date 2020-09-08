import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import LoginPage from './Login_SignUp/Login';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavigationBar from './NavigationBar';

class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                    <Container>
                    <Row>
                        <Col>
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
                        </Col>
                        <Col>
                            <LoginPage/>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
            
            
        )
    }
}
export default HomePage;