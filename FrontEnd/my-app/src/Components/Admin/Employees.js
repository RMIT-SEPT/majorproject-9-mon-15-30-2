import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import AdminDashboard from './AdminDashboard';
import WorkerAction from '../../actions/HandleWorkers';
import { Redirect } from 'react-router-dom';

class Employees extends Component
{
    constructor(props) 
    {
        super(props)
        this.state = 
        {
            allemployee: []
        }
        this.editWorker = this.editWorker.bind(this);
        this.deleteWorker = this.deleteWorker.bind(this);
    }

    deleteWorker(worker_id)
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        WorkerAction.deleteWorker(worker_id, stored.id, stored.token).then((res) =>
        { 
            this.setState(
            {
                allemployee: this.state.allemployee.filter(
                    allemployee => allemployee.id !== worker_id)
            });
            alert("Employee is deleted successfully");
            this.props.history.push('/employees');
        }, (err) => 
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
                console.log(err.response.data.message);
                this.setState({errorMessage: err.response.data.message});
            }
        });
    }

    editWorker(worker_id)
    {
        this.props.history.push(`/editemployee/${worker_id}`);
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_ADMIN") 
        {
            console.log(stored.token);
            WorkerAction.getWorkersByAdmin(stored.id).then((res) =>
            {
                this.setState({allemployee: res.data});
                // console.log(res.data);
            },(err) =>
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
                    console.log(err.response.data.message);
                }
            });
        }
        else
        {
            return <Redirect to="/"/>
        }
    }

    render() 
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_ADMIN")
        {
            if(this.state.allemployee <= 0)
            {
                return(
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
                                        <th> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.allemployee.map(
                                        allemployee => 
                                        <tr key = {allemployee.id}>
                                            <td className="username"> {allemployee.username}</td>
                                            <td className="fName"> {allemployee.fName}</td>
                                            <td className="lName"> {allemployee.lName}</td>
                                            <td className="phoneNumber"> {allemployee.phoneNumber}</td>
                                            <td>
                                                <button style={{marginLeft: "10px"}} 
                                                    onClick={() => this.editWorker(allemployee.id)} 
                                                    className="btn btn-info">Edit </button>
                                                <button style={{marginLeft: "10px"}} 
                                                    onClick={() => this.deleteWorker(allemployee.id)} 
                                                    className="btn btn-danger">Delete </button>
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
        else 
        {
            return <Redirect to="/"/>
        }
    }
}
export default Employees;