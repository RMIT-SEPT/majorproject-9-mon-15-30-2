import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import AdminDashboard from './Admin/AdminDashboard';
import WorkerAction from '../actions/HandleWorkers';

class Employees extends Component
{
    constructor(props) 
    {
        super(props)
        this.state = {
            allemployee: []
        }
        this.editWorker = this.editWorker.bind(this);
        this.deleteWorker = this.deleteWorker.bind(this);
    }

    deleteWorker(worker_id){
        WorkerAction.deleteWorker(worker_id).then( res => {
            this.setState({
                allemployee: this.state.allemployee.filter(
                    allemployee => allemployee.id !== worker_id)});
            alert("Delete successful");
            this.props.history.push("/employees");
        });
    }

    editWorker(worker_id){
        this.props.history.push(`/editemployee/${worker_id}`);
    }

    componentDidMount()
    {
        // WorkerAction.getAllWorkers().then((res) => {
        WorkerAction.getWorkerByAdmin(1).then((res) => {
            this.setState({allemployee: res.data});
            console.log(res.data);
        });

    }
    render() {
        if(this.state.allemployee == 0)
        {
            return (
                <React.Fragment>
                    <AdminDashboard/>
                    <div className="container">
                        <Alert className="alert" variant='danger'>
                            No Employee Available
                        </Alert>
                    </div>
                </React.Fragment>
            )
        }
        else
        {
            return(

                <React.Fragment>

                    <AdminDashboard/>

                    <div className="container">
                        <Table className="table" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="th">Username</th>
                                    <th className="th">First Name</th>
                                    <th className="th">Last Name</th>
                                    <th className="th">Phone Number</th>
                                    {
                                    // <th className="th">Service</th>
                                    // <th className="th">Business Name</th>
                                    }
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.allemployee.map(
                                        allemployee => 
                                        <tr key = {allemployee.id}>
                                            <td> {allemployee.username}</td>
                                            <td> {allemployee.fName}</td>
                                            <td> {allemployee.lName}</td>
                                            <td> {allemployee.phoneNumber}</td>
                                            {   
                                            // <td> {allemployee.admin.service}</td>
                                            // <td> {allemployee.admin.adminName}</td>
                                            }
                                            <td>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.editWorker(allemployee.id)} className="btn btn-info">Edit </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteWorker(allemployee.id)} className="btn btn-danger">Delete </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </div>
                </React.Fragment>
                
            )
        }
    }
}
export default Employees;