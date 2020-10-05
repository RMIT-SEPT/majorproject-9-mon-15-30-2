import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Label} from 'reactstrap';
import Input from 'reactstrap/es/Input';
import Form from 'reactstrap/es/Form';
import HomePageDashBoard from '../HomePageDashBoard';
import SignUp from '../../actions/HandleRegisterLogin';

class NewBookings extends Component 
{
    constructor()
    {
        super();
        this.state=
        {
            fname: "",
            lname: "",
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            address: "",
            phoneNumber: ""
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
        const newCustomer = 
        {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            type: "ROLE_CUSTOMER",
            username: this.state.username,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber
        }
        console.log(newCustomer);
        SignUp.Registering(newCustomer).then((res) => 
        {
            alert("Register successful");
            this.props.history.push("/login");
        }, (err) => 
        {
            console.log(err.response.data);
            this.setState({errorMessage: err.response.data.message});
            // alert(err.response.data.message);
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
                                <h4 className="display-5 text-center pb-3">Create new account</h4>
                                <Form onSubmit={this.onSubmit}> 
                                    <div className="form-group">
                                        <Label className="name">First Name</Label>
                                        <Input className="form-control" 
                                            type="text" 
                                            placeholder="First Name"
                                            name="fname"
                                            value={this.state.fname} 
                                            onChange={this.onChange} required/>
                                    </div>

                                    <div className="form-group">
                                        <Label className="name">Last Name</Label>
                                        <Input className="form-control" 
                                            type="text" 
                                            placeholder="Last name"
                                            name="lname"
                                            value={this.state.lname} 
                                            onChange={this.onChange} required/>
                                    </div>

                                    <div className="form-group">
                                        <Label className="name">Email</Label>
                                        <Input className="form-control" 
                                            type="email"
                                            placeholder="Email"
                                            name="email"
                                            value={this.state.email} 
                                            onChange={this.onChange} required/>
                                    </div>

                                    <div className="form-group">
                                        <Label className="name">Username</Label>
                                        <Input className="form-control" 
                                            type="text" 
                                            placeholder="Username"
                                            name="username"
                                            maxLength={21} minLength={3}
                                            value={this.state.username} 
                                            onChange={this.onChange} required/>
                                    </div>

                                    <div className="form-group">
                                        <Label className="name">Password</Label>
                                        <Input className="form-control" 
                                            type="password" 
                                            placeholder="Password"
                                            name="password"
                                            maxLength={24} minLength={6}
                                            value={this.state.password} 
                                            onChange={this.onChange} required/>
                                    </div>

                                    <div className="form-group">
                                        <Label className="name">Confirm Password</Label>
                                        <Input className="form-control" 
                                            type="password" 
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                            maxLength={24} minLength={6}
                                            value={this.state.confirmPassword} 
                                            onChange={this.onChange} required/>
                                    </div>

                                    <div className="form-group">
                                        <Label className="name">Address</Label>
                                        <Input className="form-control" 
                                            type="text" 
                                            placeholder="Address"
                                            name="address"
                                            value={this.state.address} 
                                            onChange={this.onChange} required/>
                                    </div>

                                    <div className="form-group">
                                        <Label className="name">Phone Number</Label>
                                        <Input className="form-control form-control-lg"
                                            type="tel"
                                            placeholder="Phone Number"
                                            name="phoneNumber"
                                            maxLength={10} minLength={10} pattern="[0-9]*"
                                            value={this.state.phoneNumber} 
                                            onChange={this.onChange} required/>
                                    </div>

                                    { 
                                        this.state.errorMessage &&
                                        <h6 className="text-danger"> {this.state.errorMessage} </h6> 
                                    }
                                    <input type="submit"
                                        className="btn-lg btn-dark btn-block" 
                                        value="Register"/>
                                </Form>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}
export default NewBookings;