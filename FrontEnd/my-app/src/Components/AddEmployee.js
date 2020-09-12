import React, { Component } from 'react'
import WorkerAction from '../actions/HandleWorkers';
import AdminDashboard from './Admin/AdminDashboard';

class AddEmployee extends Component {
    constructor(){
        super();

        this.state= {
        id: "",
        fName: "",
        lName: "",
        password: "",
        phoneNumber: "",
        username: "",
        adminId: ""

    }; 
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        const newEmployee = {
            id: "",
            fName: this.state.fName,
            lName: this.state.lName,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            username: this.state.username,
            adminId: "1"
        }
        console.log(newEmployee);
        WorkerAction.createNewWorker(newEmployee).then(res => {
            alert("Employee successfully created");
            this.props.history.push("/employee");
        });
    }
    
    render() {
        return (
            <React.Fragment>
                <AdminDashboard/>
                <div className="container">
                    <div className="row">
                    <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Register New Employee</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>

                                <h6>First Name</h6>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg " placeholder="First Name" name="fName" 
                                    value= {this.state.fName}
                                    onChange = {this.onChange} required/>
                                </div>

                                <h6>Last Name</h6>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg " placeholder="Last Name" name="lName"
                                    value= {this.state.lName}
                                    onChange = {this.onChange} required/>
                                </div>

                                <h6>Phone Number</h6>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg " placeholder="Phone Number" name="phoneNumber"
                                    value= {this.state.phoneNumber}
                                    onChange = {this.onChange} required/>
                                </div>
                                
                                <h6>Username</h6>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg " placeholder="Username" name="username"
                                    value= {this.state.username}
                                    onChange = {this.onChange} required/>
                                </div>

                                <h6>Password</h6>
                                <div className="form-group">
                                    <input type="text" className="form-control form-control-lg " placeholder="Password" name="password"
                                    value= {this.state.password}
                                    onChange = {this.onChange} required/>
                                </div>

                                <input type="submit" className="btn btn-primary btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default AddEmployee;