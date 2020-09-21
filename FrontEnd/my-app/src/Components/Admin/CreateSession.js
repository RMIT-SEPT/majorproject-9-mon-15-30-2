import React, { Component } from 'react';
import Workers from '../../actions/HandleWorkers';
import HandleSession from '../../actions/HandleSessions';
import AdminDashboard from '../Admin/AdminDashboard';

class CreateSession extends Component {

    constructor(){
        super();

        this.state={
            allopeninghours:[],
            allworker:[],
            day : "",
            startTime :"",
            endTime :"",
            workerId :""
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
                this.setState({allopeninghours: res.data});
                console.log(res.data);
            }
            else
            {
                console.log("Empty");
            }
        });
    }

    render() {

        return (
            <React.Fragment>
                <AdminDashboard/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center pb-5">Create New Session</h5>
                            
                            <form onSubmit={this.onSubmit} >

                                <h5>Select Service and Worker</h5>
                                <hr/>

                                <h6>Choose Worker</h6>
                                <div className="form-group">
                                    <select id="inputState" className="form-control" name="workerId" value= {this.state.workerId} onChange = {this.onChange} required>
                                        <option value="unknown" defaultValue>Choose Staff</option>
                                        {
                                            this.state.allworker.map(
                                                allworker => 
                                                <option className="workerId" key={allworker.id} value={allworker.id}> {allworker.fName}</option>
                                            )
                                        }
                                    </select>
                                    
                                </div>

                                
                                {
                                    /*
                                    <h6>Opening Hours</h6>
                                    <div className="form-group">
                                {
                                    Object.keys(this.state.allopeninghours).map (
                                        allopeninghours => 
                                        <div className="allopeninghours" key={allopeninghours.day}>
                                            {allopeninghours.startTime}
                                        </div>
                                    )
                                }
                                </div>
                                    */
                                }

                                <h6>Day</h6>
                                <div className="form-group">
                                    <select id="inputState" className="form-control" name="day" value= {this.state.day} onChange = {this.onChange}  required>
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