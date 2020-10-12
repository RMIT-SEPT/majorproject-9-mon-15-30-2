import React, { Component } from 'react';
import WorkerAction from '../../actions/HandleWorkers';
import AdminDashboard from './AdminDashboard';
import { Redirect } from 'react-router-dom';

class EditEmployee extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = 
        {
            id: this.props.match.params.id,
            fName: "",
            lName: "",
            phoneNumber: "",
            username: "",
            adminId: ""
        }
        this.changeWorkerId = this.changeWorkerId.bind(this);
        this.changeWorkerFirstName = this.changeWorkerFirstName.bind(this);
        this.changeWorkerLastName = this.changeWorkerLastName.bind(this);
        this.changeWorkerPhoneNumber = this.changeWorkerPhoneNumber.bind(this);
        this.changeWorkerUserName = this.changeWorkerUserName.bind(this);
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_ADMIN") {
            WorkerAction.getWorkerByID(this.state.id, stored.id, stored.token).then((res) => 
            {
                let editEmployee = res.data;
                this.setState(
                {
                    id: editEmployee.id,
                    fName: editEmployee.fName,
                    lName: editEmployee.lName,
                    phoneNumber: editEmployee.phoneNumber,
                    username: editEmployee.username,
                    adminId: editEmployee.adminId
                });
            }).catch((err) => 
            {
                if(String(err.response.status) === "401")
                {
                    console.log(err.response.status);
                    localStorage.clear();
                    alert("Session Expired");
                    this.props.history.push('/login');
                }
                else
                {
                    // Render page not found
                    this.props.history.push('/employees');
                }
            });
        }
        else
        {
            return <Redirect to="/"/>
        }
    }

    updateEmployee = (e) => 
    {
        e.preventDefault();
        var stored = JSON.parse(localStorage.getItem("user"));
        let editEmployee = 
        {
            id: this.state.id,
            fName: this.state.fName,
            lName: this.state.lName,
            phoneNumber: this.state.phoneNumber,
            username: this.state.username,
            adminId: stored.id
        };
        WorkerAction.updateWorker(editEmployee, this.state.id, stored.id, stored.token).then((res) =>
        { 
            this.props.history.push('/employees');
            alert("Employee details are updated successfully");
        }, (err) => 
        {
            if (String(err.response.status) === "401")
            {
                localStorage.clear();
                alert("Session Expired");
                this.props.history.push('/login');
            }
            else
            {
                console.log(err.response);
                this.setState({errorMessage: err.response.data.message});
            }
        });
    }

    changeWorkerId = (e) => 
    {
        this.setState({id: e.target.value});
    }
    changeWorkerFirstName = (e) => 
    {
        this.setState({fName: e.target.value});
    }
    changeWorkerLastName = (e) => 
    {
        this.setState({lName: e.target.value});
    }
    changeWorkerPhoneNumber = (e) => 
    {
        this.setState({phoneNumber: e.target.value});
    }
    changeWorkerUserName = (e) => 
    {
        this.setState({username: e.target.value});
    }

    cancel()
    {
        this.props.history.push('/employees');
    }

    render() 
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_ADMIN")
        {
            return(
                <React.Fragment>
                    <AdminDashboard/>
                    <div className="container">
                        <div className="row">
                        <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Update Employee</h5>
                                <hr />
                                <form onSubmit={this.updateEmployee}>

                                    <h6>Employees ID</h6>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col">
                                                <input readOnly="readonly" 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Enter new Employees ID"
                                                    name="id" 
                                                    value={this.state.id} 
                                                    onChange={this.changeWorkerId} required/>
                                            </div>
                                        </div>
                                    </div>

                                    <h6>First Name</h6>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col">
                                                <input type="text" 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Enter new First Name" 
                                                    name="fName" 
                                                    value={this.state.fName} 
                                                    onChange={this.changeWorkerFirstName} required/>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <h6>Last Name</h6>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col">
                                                <input type="text" 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Enter new Last Name" 
                                                    name="lName" 
                                                    value={this.state.lName} 
                                                    onChange={this.changeWorkerLastName} required/>
                                            </div>
                                        </div>
                                    </div>

                                    <h6>Phone Number</h6>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col">
                                                <input type="tel" 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Enter new Phone Number"
                                                    name="phoneNumber" 
                                                    maxLength={10} minLength={10} pattern="[0-9]*"
                                                    value={this.state.phoneNumber} 
                                                    onChange={this.changeWorkerPhoneNumber} required/>
                                            </div>
                                        </div>
                                    </div>

                                    <h6>Username</h6>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col">
                                                <input type="text" 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Enter new Username"
                                                    name="username" 
                                                    maxLength={24} minLength={3}
                                                    value={this.state.username} 
                                                    onChange={this.changeWorkerUserName} required/>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        this.state.errorMessage &&
                                        <h6 className="alert alert-danger"> {this.state.errorMessage} </h6> 
                                    }
                                    <button className="btn btn-success" 
                                            type="submit" >Save
                                    </button>
                                    <button className="btn btn-danger" 
                                            onClick={this.cancel.bind(this)} 
                                            style={{marginLeft: "10px"}}>Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
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
export default EditEmployee;
