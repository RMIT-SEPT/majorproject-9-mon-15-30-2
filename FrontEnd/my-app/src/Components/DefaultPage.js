import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import HomePageDashBoard from './HomePageDashBoard';

class DefaultPage extends Component 
{
    render() 
    { 
        return(
            <React.Fragment>
                <HomePageDashBoard/>
                    <Container>
                    
                        <Jumbotron fluid>
                            <Container className="ml-5">
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
                    
                </Container>
            </React.Fragment>
        )
    }
}
export default DefaultPage;