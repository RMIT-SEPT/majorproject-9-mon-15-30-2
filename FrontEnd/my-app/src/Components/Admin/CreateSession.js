import React, { Component } from 'react';
import Workers from '../../actions/HandleWorkers';
import HandleSession from '../../actions/HandleSessions';
import AdminDashboard from '../Admin/AdminDashboard';
import Table from 'react-bootstrap/Table';
import { Redirect } from 'react-router-dom';

class CreateSession extends Component
{
    constructor()
    {
        super();
        this.state=
        {
            openinghours:"",
            allavailablesessions:[],
            allworker:[],
            day : "",
            startTime :"",
            endTime :"",
            workerId :"",
            errorMessage:""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleDaySelection = this.handleDaySelection.bind(this);
    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }

    handleDaySelection(e)
    {
        this.setState({[e.target.name]: e.target.value});
        const selectedDay = e.target.value;
        const selectedworker_id = this.state.workerId;
        var stored = JSON.parse(localStorage.getItem("user"));

        HandleSession.getAvailableSessionByWorkerIdAndDay(selectedworker_id, selectedDay).then((res) => 
        {
            this.setState({allavailablesessions: res.data});
        }).catch((err) => 
        {
            console.log(err.response.data.message);
            this.setState({allavailablesessions: null});
        });
        
        HandleSession.getOpeningHoursByAdminAndDay(stored.id, selectedDay).then((res) =>
        {
            this.setState({openinghours: res.data});
        }).catch((err) => 
        {
            this.setState({openinghours: null});
            console.log(err.response.data.message);
        })
        
    }

    onSubmit(e){
        e.preventDefault();
        let message = "Invalid start time or end time";
        try 
        {
            let startTime_hours = this.state.startTime.substring(0,2);
            let startTime_minutes = this.state.startTime.substring(3,5);

            let endTime_hours = this.state.endTime.substring(0,2);
            let endTime_minutes = this.state.endTime.substring(3,5);

            if(!(0 <= startTime_hours <= 23 || 0 <= endTime_hours <= 23
                || 0 <= endTime_minutes <= 59 || 0 <= startTime_minutes <= 59)) 
            {
                alert(message);
            } 
            else 
            {
                const newsession = 
                {
                    day : this.state.day,
                    startTime : this.state.startTime + ":00",
                    endTime : this.state.endTime + ":00",
                    workerId : this.state.workerId
                }
                console.log(newsession);
                HandleSession.createNewSession(newsession).then((res) => 
                {
                    this.props.history.push('/adminhomepage');
                    alert("New session is created successfully");
                }).catch((err) => 
                {
                    if (String(err.response.status) === "401")
                    {
                        localStorage.clear();
                        alert("Session Expired");
                        this.props.history.push('/login');
                    }
                    else
                    {
                        message = err.response.data.message;
                        this.setState({errorMessage: err.response.data.message});
                        alert(message);
                    }
                });
            }
        } 
        catch (err) 
        {
            alert(message);
        }
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_ADMIN") 
        {
            Workers.getWorkerByAdmin(stored.id).then((res) => 
            {
                this.setState({ allworker: res.data});
                console.log(res.data);
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
            if(this.state.error)
            {
                return <h1>Error</h1>
            }
            return (
                <React.Fragment>
                    <AdminDashboard/>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">

                                <h5 className="display-4 text-center pb-5">Create New Session</h5>
                                <form onSubmit={this.onSubmit} >
                                    {/*Hardcode because no admin value*/}
                                    <h5>Service</h5>
                                    <p>Haircut</p>

                                    <h6>Choose Worker</h6>
                                    <div className="form-group">
                                        <select id="inputState" 
                                            className="form-control" 
                                            name="workerId" 
                                            value={this.state.workerId} 
                                            onChange={this.onChange} required>
                                            <option value="unknown" defaultValue>Choose Staff</option>
                                            {
                                                this.state.allworker.map(
                                                    allworker => 
                                                    <option className="workerId" 
                                                            key={allworker.id} 
                                                            value={allworker.id} > {allworker.fName} {allworker.lName}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>

                                    <h6>Day</h6>
                                    <div className="form-group">
                                        <select id="inputState" 
                                                className="form-control" 
                                                name="day" value={this.state.day} 
                                                onChange={this.handleDaySelection} required>
                                            <option value="unknown" defaultValue>Choose Day</option>
                                            
                                            <option className="day" value="1">Sunday</option>
                                            <option className="day"  value="2">Monday</option>
                                            <option className="day"  value="3">Tuesday</option>
                                            <option className="day"  value="4">Wednesday</option>
                                            <option className="day"  value="5">Thursday</option>
                                            <option className="day"  value="6">Friday</option>
                                            <option className="day"  value="7">Saturday</option>
                                        </select>
                                    </div>

                                    {
                                        this.state.openinghours &&
                                        <div>
                                            <h5>Opening Hours</h5>
                                            <p>{this.state.openinghours.startTime} - {this.state.openinghours.endTime}</p>
                                        </div>
                                    }
                                    
                                    {
                                        this.state.allavailablesessions &&
                                        <div>
                                            <h5>Available Sessions</h5>
                                            <Table className="table pb-4" striped bordered hover size="sm">
                                            <thead>
                                                <tr>
                                                    <th className="th">Start Time</th>
                                                    <th className="th">End Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.allavailablesessions.map(
                                                        allavailablesessions => 
                                                        <tr key = {allavailablesessions.id}>
                                                            <td> {allavailablesessions.startTime}</td>   
                                                            <td> {allavailablesessions.endTime}</td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                            </Table>
                                        </div>   
                                    }
                                    
                                    <h6>Start Time </h6>
                                    <div className="form-group">
                                        <input type="text" 
                                            className="form-control form-control-lg" 
                                            placeholder="HH:mm" 
                                            name="startTime" 
                                            value={this.state.startTime} 
                                            onChange={this.onChange} required/>
                                    </div>

                                    <h6>End Time</h6>
                                    <div className="form-group">
                                        <input type="text" 
                                            className="form-control form-control-lg" 
                                            placeholder="HH:mm" 
                                            name="endTime" 
                                            value={this.state.endTime} 
                                            onChange={this.onChange} required/>
                                    </div>

                                    <input type="submit" className="btn btn-primary btn-block mt-4"/>
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
export default CreateSession;