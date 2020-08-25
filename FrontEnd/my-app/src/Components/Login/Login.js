import React, { Component } from "react";
import {FormGroup, Label} from "reactstrap"
import "./Login.css"
import Input from "reactstrap/es/Input";
import Button from "react-bootstrap/Button";
import Form from "reactstrap/es/Form";

class Login extends Component {
    render() {
        return (
            <Form className = "login-form">
                <div className="wrapper">
                    <div className="form-wrapper">
                        <h4>Log in to your account</h4>
                        <FormGroup className="form-group">
                            <Label className="name">Username</Label>
                            <Input type="username" placeholder="Username"/>
                        </FormGroup>
                        <FormGroup className="form-group">
                            <Label className="name">Password</Label>
                            <Input type="password" placeholder="Password"/>
                        </FormGroup>
                        <Button className="btn-lg btn-dark btn-block" href="/homepage">
                            Log in
                        </Button>
                        <div className="text-center pt-3">
                            Do not have an account? <a href="#">Register here</a>
                        </div>
                    </div>
                </div>
            </Form>
        );
    }
}

export default Login;