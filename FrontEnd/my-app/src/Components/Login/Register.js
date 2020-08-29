import React, { Component } from 'react'
import {FormGroup, Label} from "reactstrap"
import "./Login.css"
import Input from "reactstrap/es/Input";
import Button from "react-bootstrap/Button";
import Form from "reactstrap/es/Form";

class NewBookings extends Component {
    
    render() {
        return (
            <Form className = "register-form">
                <div className="wrapper">
                    <div className="form-wrapper">
                        <h4>Create new account</h4>

                        <FormGroup className="form-group">
                            <Label className="name">First Name</Label>
                            <Input type="firstname" placeholder="First Name"/>
                        </FormGroup>

                        <FormGroup className="form-group">
                            <Label className="name">Last Name</Label>
                            <Input type="lastname" placeholder="Last name"/>
                        </FormGroup>

                        <FormGroup className="form-group">
                            <Label className="name">Email</Label>
                            <Input type="email" placeholder="Email"/>
                        </FormGroup>

                        <FormGroup className="form-group">
                            <Label className="name">Username</Label>
                            <Input type="username" placeholder="Username"/>
                        </FormGroup>

                        <FormGroup className="form-group">
                            <Label className="name">Password</Label>
                            <Input type="password" placeholder="Password"/>
                        </FormGroup>

                        <Button className="btn-lg btn-dark btn-block" href="/homepage">
                            Register
                        </Button>

                    </div>
                </div>
            </Form>
        );
    }
}
export default NewBookings;