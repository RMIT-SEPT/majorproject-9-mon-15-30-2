import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import SignUp from '../../actions/HandleRegisterLogin';
import HomePageDashBoard from '../HomePageDashBoard';

class Login extends Component 
{
    constructor()
    {
        super();
        this.state=
        {
            username: "",
            password: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e)
    {
        e.preventDefault();
        const loginDetail = 
        {
            username: this.state.username,
            password: this.state.password
        }
        console.log(loginDetail);
        SignUp.Login(loginDetail).then((res) => 
        {
            localStorage.clear();
            localStorage.setItem("user", JSON.stringify(res.data)) 
            this.props.history.push("/");
        },(err) => 
        {
            if(String(err.response.status) === "401")
            {
                this.setState({errorMessage: "Username or password is incorrect."});
                console.log("error "+err.response.status+": Username or password is incorrect.");
            }
        });
    }

    render() 
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if(stored)
        {
            return <Redirect to="/"/>
        }
        else
        {
            return(
                <React.Fragment>
                    <HomePageDashBoard/>
                    <div className="container mt-3">
                        <div className="col-md-12">
                            <div className="card card-container">
                                <h4 className="display-5 text-center pb-3">Login</h4>
                                <Container>
                                    <Form onSubmit={this.onSubmit}>
                                        <Form.Group controlId="formBasicUsername">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control type="username" 
                                                placeholder="Username" 
                                                name="username" maxLength={21} minLength={3}
                                                value={this.state.username} 
                                                onChange={this.onChange} required/>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control type="password" 
                                                placeholder="Password"
                                                name="password" maxLength={24} minLength={6}
                                                value={this.state.password} 
                                                onChange={this.onChange} required/>
                                        </Form.Group>
                                        
                                        {
                                            this.state.errorMessage &&
                                            <h6 className="alert alert-danger"> {this.state.errorMessage} </h6> 
                                        }
                                        <input type="submit" className="btn-lg btn-dark" value="Login"/> 
                                            
                                        <Form.Text>
                                            Don't have an account? <a href="/register">Register here </a>
                                        </Form.Text>
                                    </Form>
                                </Container>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}
export default Login;