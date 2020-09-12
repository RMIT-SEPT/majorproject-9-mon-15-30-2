import React, { Component } from 'react';
import WorkerAction from '../actions/HandleWorkers';
import AdminDashboard from './Admin/AdminDashboard';

class EditEmployee extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // id: this.props.match.params.id,
            id: "",
            fName: "",
            lName: "",
            password: "",
            phoneNumber: "",
            username: this.props.match.params.username,
            adminId: ""
        }
        this.changeWorkerId = this.changeWorkerId.bind(this);
        this.changeWorkerFirstName = this.changeWorkerFirstName.bind(this);
        this.changeWorkerLastName = this.changeWorkerLastName.bind(this);
        this.changeWorkerPhoneNumber = this.changeWorkerPhoneNumber.bind(this);
        this.changeWorkerPassword = this.changeWorkerPassword.bind(this);
        this.changeWorkerUserName = this.changeWorkerUserName.bind(this);
    }

    componentDidMount(){
        // WorkerAction.getWorkerByID(this.state.id).then( (res) => {
        WorkerAction.getWorkerByfName(this.state.fName).them( (res) => {
            let editemployee = res.data;
            this.setState({
                id: editemployee.id,
                fName: editemployee.fName,
                lName: editemployee.lName,
                password: editemployee.password,
                phoneNumber: editemployee.phoneNumber,
                username: editemployee.username,
                adminId: editemployee.adminId
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let editEmployee = {
            id: this.state.id,
            fName: this.state.fName,
            lName: this.state.lName,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            username: this.state.username,
            adminId: this.state.adminId
        };
        WorkerAction.updateWorker(editEmployee, this.state.username).then( res => {
            this.props.history.push('/employee');
        });
    }

    changeWorkerId=(e) => {
        this.setState({id: e.target.value});
    }
    changeWorkerFirstName= (e) => {
        this.setState({fName: e.target.value});
    }
    changeWorkerLastName= (e) => {
        this.setState({lName: e.target.value});
    }
    changeWorkerPhoneNumber= (e) => {
        this.setState({phoneNumber: e.target.value});
    }
    changeWorkerPassword= (e) => {
        this.setState({password: e.target.value});
    }
    changeWorkerUserName= (e) => {
        this.setState({username: e.target.value});
    }

    cancel(){
        this.props.history.push('/employee');
    }

    render() {
        return (
            <React.Fragment>
                <AdminDashboard/>
                <div className="container">
                    <div className="row">
                    <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Update Booking</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>

                                <h6>Employee ID</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control form-control-lg " placeholder="Enter new Employee ID" 
                                            name="id" value= {this.state.id} onChange={this.changeWorkerId} required/>
                                        </div>
                                    </div>
                                </div>

                                <h6>First Name</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control form-control-lg " placeholder="Enter new First Name" 
                                            name="fName" value= {this.state.fName} onChange={this.changeWorkerFirstName} required/>
                                        </div>
                                    </div>
                                </div>
                            
                                <h6>Last Name</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control form-control-lg " placeholder="Enter new Last Name" 
                                            name="lName" value= {this.state.lName} onChange={this.changeWorkerLastName} required/>
                                        </div>
                                    </div>
                                </div>

                                <h6>Phone Number</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="date" className="form-control form-control-lg" placeholder="Enter new Phone Number" 
                                            name="phoneNumber" value= {this.state.phoneNumber} onChange = {this.changeWorkerPhoneNumber} required/>
                                        </div>
                                    </div>
                                </div>

                                <h6>Username</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control form-control-lg " placeholder="Enter new Username" 
                                            name="username" value= {this.state.username} onChange={this.changeWorkerUserName} required/>
                                        </div>
                                    </div>
                                </div>

                                <h6>Password</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control form-control-lg " placeholder="Enter new Password" 
                                            name="password" value= {this.state.password} onChange={this.changeWorkerPassword} required/>
                                        </div>
                                    </div>
                                </div>
                                
                                <button className="btn btn-success" onClick={this.updateEmployee}>save</button>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default EditEmployee;
