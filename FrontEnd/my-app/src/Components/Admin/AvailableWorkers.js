import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import AdminDashboard from './AdminDashboard';
import { Redirect } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import HandleWorkers from '../../actions/HandleWorkers';
import HandleSessions from '../../actions/HandleSessions';

class AvailableWorkers extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            allworkersbyadminid: [],
            allsessionsbyworker: []
        }
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if(stored && stored.role === "ROLE_ADMIN")
        {
            HandleWorkers.getWorkersByAdmin(stored.id).then((res) =>
            {
                this.setState({allworkersbyadminid: res.data});
                console.log(res.data);
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
            if(this.state.allworkersbyadminid.length <= 0 )
            {
                return (
                    <React.Fragment>
                        <AdminDashboard/>
                        <div className="container">
                            <Alert variant='danger'>
                                No Available Workers At The Moment
                            </Alert>
                        </div>
                    </React.Fragment>
                )
            }
            else
            {
                return (
                    <React.Fragment>
                        <AdminDashboard/>
                        <div className="container">
                            <h3>Available Workers</h3>
                            <Table className="table" striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th className="th">Booking ID</th>
                                            <th className="th">Service</th>
                                            <th className="th">Worker</th>
                                            <th className="th">Date</th>
                                            <th className="th">Start Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        
                                        this.state.allworkersbyadminid.map(
                                            
                                            allworkersbyadminid => 
                                            <tr key = {allworkersbyadminid.id}>
                                                <td> {allworkersbyadminid.id}</td>
                                                <td> {allworkersbyadminid.phoneNumber}</td>
                                                <td> {allworkersbyadminid.fName}</td>
                                                <td> {allworkersbyadminid.lName}</td>   
                                                <td> {allworkersbyadminid.username}</td>
                                                
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
export default AvailableWorkers;