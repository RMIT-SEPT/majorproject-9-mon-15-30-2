import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HomePageDashBoard from './HomePageDashBoard';

class HomePage extends Component 
{
    render() 
    { 
        return(
            <React.Fragment>
                <HomePageDashBoard/>
                    <Container>
                    <Row>
                        <Col>
                            <Jumbotron fluid>
                                <Container>
                                    <h1>SEPT/9.MON-15.30-2</h1>
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
                                </Container>
                            </Jumbotron>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}
export default HomePage;