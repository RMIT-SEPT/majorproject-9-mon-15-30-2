import React, {Component} from 'react';
import HandleSession from '../../actions/HandleSessions';
import AdminDashboard from './AdminDashboard';
import { Redirect } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

class EditSession extends Component 
{
    constructor(props)
    {
        super(props)
        this.state = 
        {
            allavailablesessions: [],
            openinghours: "",
            id: this.props.match.params.id,
            startTime: "",
            endTime:"",
            day:"",
            workerId: "",
            workerfName: "",
            workerlName: "",
            service:""
        }
        this.onChange = this.onChange.bind(this);
        this.updateSession = this.updateSession.bind(this);
        this.cancel = this.cancel.bind(this);
        this.dayselectionChange = this.dayselectionChange.bind(this);
    }

    updateSession(e)
    {
        e.preventDefault();
        var stored = JSON.parse(localStorage.getItem("user"));
        let editsession = 
        {
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            day: this.state.day,
            workerId: this.state.workerId
        };
        HandleSession.updateSession(this.state.id, editsession, stored.token).then((res) => 
        {
            alert("Session updated successfully");
            this.props.history.push('/managessessions');
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
                alert(err.response.data.message);
                console.log(err.response.data.message);
            }
        });

        
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if(stored && stored.role === "ROLE_ADMIN")
        {
            HandleSession.getSessionBySessionIdAndAdminId(this.state.id, stored.id, stored.token).then((res) => 
            {
                let editsession = res.data;
                this.setState({
                    id: editsession.id,
                    startTime: editsession.startTime,
                    endTime: editsession.endTime,
                    day: editsession.day,
                    workerId: editsession.worker.id,
                    workerfName: editsession.worker.fName,
                    workerlName: editsession.worker.lName,
                    service: editsession.service
                });

                HandleSession.getAvailableSessionByWorkerIdAndDay(this.state.workerId, this.state.day, stored.token).then((res) => 
                {
                    this.setState({allavailablesessions: res.data});
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
                        this.setState({allavailablesessions: null});
                    }
                });

                HandleSession.getOpeningHoursByAdminAndDay(stored.id, this.state.day, stored.token).then((res) =>
                {
                    this.setState({openinghours: res.data});

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
                        this.setState({openinghours: null});
                        console.log(err.response.data.message);
                    }
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
                    this.props.history.push('/managessessions');
                }
            });
        }
        else
        {
            return <Redirect to="/"/>
        }
    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }

    dayselectionChange(e)
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        this.setState({[e.target.name]: e.target.value});
        const selectedDay = e.target.value;
        HandleSession.getAvailableSessionByWorkerIdAndDay(this.state.workerId, selectedDay, stored.token).then((res) => 
        {
            this.setState({allavailablesessions: res.data});
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
                this.setState({allavailablesessions: null});
            }
        });

        HandleSession.getOpeningHoursByAdminAndDay(stored.id, selectedDay, stored.token).then((res) =>
        {
            this.setState({openinghours: res.data});

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
                this.setState({openinghours: null});
                console.log(err.response.data.message);
            }
        });
    }

    cancel()
    {
        this.props.history.push('/managessessions');
    }

    render()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if(stored && stored.role === "ROLE_ADMIN")
        {
            return(
                <React.Fragment>
                    <AdminDashboard/>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <h5 className="display-4 text-center">Edit Session</h5>
                                <hr />
                                <form onSubmit={this.updateSession}>
                                    <div className="row">
                                        <div className="col">
                                            <h6>Worker's Name</h6>
                                            <label>{this.state.workerfName} {this.state.workerlName}</label>
                                        </div>
                                        <div className="col">
                                            <h6>Service</h6>
                                        <label>{this.state.service}</label>
                                        </div>
                                    </div>
                                    
                                    <h6>Day</h6>
                                    <div className="form-group">
                                    <select id="inputState" className="form-control" name="day" value={this.state.day}  onChange={this.dayselectionChange} required>
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
                                        this.state.allavailablesessions.length > 0 &&
                                        <div>
                                            <h5>Unavailable Sessions</h5>
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
                                    
                                    {
                                        this.state.openinghours && 
                                        <div>
                                            <h5>Opening Hours</h5>
                                            <p>{this.state.openinghours.startTime} - {this.state.openinghours.endTime}</p>
                                        </div>
                                    }

                                    <h6>Start Time</h6>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder={this.state.startTime} name="startTime" value={this.state.startTime} onChange={this.onChange} required/>
                                    </div>

                                    <h6>End Time</h6>
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder={this.state.endTime} name="endTime" value={this.state.endTime} onChange={this.onChange} required/>
                                    </div>

                                    <div className="row">
                                        <div className="col">
                                            <button className="btn btn-success btn-lg btn-block" type="submit">Save</button>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-secondary btn-lg btn-block" onClick={this.cancel}>Cancel</button>
                                        </div>
                                    
                                    </div>

                                    
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
}
export default EditSession;