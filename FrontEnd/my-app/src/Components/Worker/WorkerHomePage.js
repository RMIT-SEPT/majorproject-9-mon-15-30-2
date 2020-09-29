import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import WorkerDashBoard from './WorkerDashBoard';
import { Redirect } from 'react-router-dom';

class HomePage extends Component 
{
    render() 
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_WORKER")
        {
            return(
                <React.Fragment>
                    <WorkerDashBoard/>
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