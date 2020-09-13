import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class Login extends Component {

    render() {
        return (

            <Container>
                <Form className="pt-4">
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <Button variant="secondary" type="submit" href="/adminhomepage">
                        Login
                    </Button>

                    <Form.Text>
                        Don't have an account? <a href="/register">Register</a> here
                    </Form.Text>
                </Form>
            </Container>
            
        );
    }
}

export default Login;