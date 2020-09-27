import React, { Component } from 'react';
import WorkerAction from '../../actions/HandleWorkers';
import AdminDashboard from './AdminDashboard';


class EditEmployee extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            fName: "",
            lName: "",
            password: "",
            phoneNumber: "",
            username: "",
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
        WorkerAction.getWorkerByID(this.state.id).then((res) => {
            let editEmployee = res.data;
            this.setState({
                id: editEmployee.id,
                fName: editEmployee.fName,
                lName: editEmployee.lName,
                password: editEmployee.password,
                phoneNumber: editEmployee.phoneNumber,
                username: editEmployee.username,
                adminId: editEmployee.adminId
            });
        });
    }

    updateEmployee = (e) => {
        e.preventDefault();
        let editEmployee = {
            id: this.state.id,
            password: this.state.password,
            fName: this.state.fName,
            lName: this.state.lName,
            phoneNumber: this.state.phoneNumber,
            username: this.state.username,
            adminId: "4"
        };
        console.log(editEmployee);
        WorkerAction.updateWorker(editEmployee, this.state.id).then( res => { 
            alert("Update successful");
            this.props.history.push('/employees');
        }).catch((err) => {
            alert("Update unsuccessful");
            this.props.history.push('/employees');
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
        this.props.history.push('/employees');
    }

    render() {
        return (
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
                                            <input readOnly="readonly" className="form-control form-control-lg " placeholder="Enter new Employees ID"
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
                                            <input type="tel" className="form-control form-control-lg" placeholder="Enter new Phone Number"
                                            maxLength={10} minLength={10} pattern="[0-9]*"
                                            name="phoneNumber" value= {this.state.phoneNumber} onChange = {this.changeWorkerPhoneNumber} required/>
                                        </div>
                                    </div>
                                </div>

                                <h6>Username</h6>
                                { this.state.errorMessage &&
                                    <h6 className="text-danger"> { this.state.errorMessage } </h6> }
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" className="form-control form-control-lg " placeholder="Enter new Username"
                                            name="username" value= {this.state.username} onChange={this.changeWorkerUserName} required
                                            max={21} min={3}/>
                                        </div>
                                    </div>
                                </div>

                                <h6>Password</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="password" className="form-control form-control-lg " placeholder="Enter new Password"
                                            name="password" value= {this.state.password} onChange={this.changeWorkerPassword} required/>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-success" type="submit" >save</button>
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
