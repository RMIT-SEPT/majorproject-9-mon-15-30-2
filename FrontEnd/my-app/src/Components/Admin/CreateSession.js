import React, { Component } from 'react';
import Workers from '../../actions/HandleWorkers';
import HandleSession from '../../actions/HandleSessions';
import AdminDashboard from '../Admin/AdminDashboard';
import Table from 'react-bootstrap/Table';

class CreateSession extends Component {

    constructor(){
        super();

        this.state={
            allavailablesessions:[],
            allopeninghours:[],
            allworker:[],
            day : "",
            startTime :"",
            endTime :"",
            workerId :"",
            errorMessage:""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        
        const newsession = {
        day : this.state.day,
        startTime : this.state.startTime,
        endTime : this.state.endTime,
        workerId : this.state.workerId
        }
        
        console.log(newsession);

        HandleSession.createNewSession(newsession).then (res => {
            this.props.history.push('/adminhomepage');
            alert("New session is created");
        }).catch(err => {
            this.setState({errorMessage: err.message});
            alert(err.message);
        });
       
        
    }

    componentDidMount(){

        Workers.getWorkerByAdmin("1").then((res) => {
            this.setState({ allworker: res.data});
            console.log(res.data);
        });

        HandleSession.getOpeningHoursByAdmin("1").then((res) => {
        if(!res.data.empty)
        {
            console.log(res.data);
            this.setState({allopeninghours: res.data});
        }
        else
        {
            console.log("Empty");
        }
        });

        HandleSession.getAvailableSessionByAdmin_id("1").then((res) => {
        if(!res.data.empty)
        {
            console.log(res.data);
            this.setState({ allavailablesessions: res.data});
        }
        else
        {
            console.log("Empty");
        }
        });
    }

    render() {


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

                                <h5>Service</h5>
                                <div>
                                {
                                    this.state.allopeninghours.map 
                                    (
                                        allopeninghours =>
                                        <p>{allopeninghours.admin_id.service}</p>
                                    )
                                    // <p>{this.state.allopeninghours[0].id}</p>
                                }
                                </div>

                                <h5>Opening Hours</h5>
                                <div>
                                {
                                    
                                    this.state.allopeninghours.map 
                                    (
                                        allopeninghours =>
                                        <p> {allopeninghours.startTime} - {allopeninghours.endTime}</p>
                                    )
                                }
                                </div>

                                <h5>Available Sessions</h5>
                                
                                <Table className="table pb-4" striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th className="th">Day</th>
                                            <th className="th">Start Time</th>
                                            <th className="th">End Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.allavailablesessions.map(
                                                allavailablesessions => 
                                                <tr key = {allavailablesessions.id}>
                                                    <td> {allavailablesessions.day}</td>
                                                    <td> {allavailablesessions.startTime}</td>   
                                                    <td> {allavailablesessions.endTime}</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </Table>
                  

                                <h6>Choose Worker</h6>
                                <div className="form-group">
                                    <select id="inputState" className="form-control" name="workerId" value= {this.state.workerId} onChange = {this.onChange} required>
                                        <option value="unknown" defaultValue>Choose Staff</option>
                                        {
                                            this.state.allworker.map(
                                                allworker => 
                                                <option className="workerId" key={allworker.id} value={allworker.id}> {allworker.fName} {allworker.lName}</option>
                                            )
                                        }
                                    </select>
                                    
                                </div>

                                <h6>Day</h6>
                                <div className="form-group">
                                    <select id="inputState" className="form-control" name="day" value= {this.state.day} onChange = {this.onChange}  required>
                                        <option value="unknown" defaultValue>Choose Day</option>
                                        
                                        <option value="1">Sunday</option>
                                        <option value="2">Monday</option>
                                        <option value="3">Tuesday</option>
                                        <option value="4">Wednesday</option>
                                        <option value="5">Thursday</option>
                                        <option value="6">Friday</option>
                                        <option value="7">Saturday</option>
                                            
                                    </select>
                                </div>



                                <h6>Start Time </h6>
                                <div className="form-group">
                                    <input type="time" className="form-control form-control-lg" placeholder="HH:mm:ss" name="startTime" value={this.state.startTime} onChange={this.onChange} required/>
                                </div>

                                <h6>End Time</h6>
                                <div className="form-group">
                                    <input type="time" className="form-control form-control-lg" placeholder="HH:mm:ss" name="endTime" value={this.state.endTime} onChange={this.onChange} required/>
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
export default CreateSession;