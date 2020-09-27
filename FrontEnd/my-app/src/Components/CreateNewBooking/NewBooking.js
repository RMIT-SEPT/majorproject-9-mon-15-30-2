import React, { Component } from 'react';
import CreateBooking from '../../actions/HandleBookings';
import Workers from '../../actions/HandleWorkers';
import Services from '../../actions/HandleServices';
import CustomerDashboard from '../Customer/CustomerDashBoard';
import Booking from '../../actions/HandleBookings';
import { Redirect } from 'react-router-dom';

class NewBookings extends Component 
{
    constructor()
    {
        super();
        this.state=
        {
            selectedSession:[],
            allworker: [],
            allservices: [],
            availableSessions:[],
            customer: 
            {
                id: "",
                fName: "",
                lName: "",
                address: "",
                phoneNumber: "",
                email: "",
                hibernateLazyInitializer: {}
            },
            worker: 
            {
                id: "",
                fName: "",
                lName: "",
                admin: 
                {
                    id: "",
                    adminName: "",
                    service: "",
                    hibernateLazyInitializer: {}
                },
                hibernateLazyInitializer: {}
            },
            status: "",
            date: "",
            startTime: "",
            endTime: "",
            service: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleServiceChange = this.handleServiceChange.bind(this);
        this.handleWorkerSelection = this.handleWorkerSelection.bind(this);
    }

    handleServiceChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
        const servicevalue = e.target.value;
        Workers.getWorkerByService(servicevalue).then((res) => 
        {
            if(!res.data.empty)
            {
                console.log(res.data);
                this.setState({ allworker: res.data});
            }
            else
            {
                console.log("Empty");
            }
        });
    }

    handleWorkerSelection(e)
    {
        this.setState({[e.target.name]: e.target.value});
        const worker_id = e.target.value;
        const servicevalue = this.state.service;
        Booking.getAvailableSessionsByWorkerAndService(worker_id, servicevalue).then((res) => 
        {
            if(!res.data.empty)
            {
                console.log(res.data);
                this.setState({ availableSessions: res.data});
            }
            else
            {
                console.log("Empty");
            }
        })
    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e)
    {
        e.preventDefault();
        var stored = JSON.parse(localStorage.getItem("user"));
        const newbooking = 
        {
            customer: 
            {
                id: stored.id,
                fName: "",
                lName: "",
                address: "",
                phoneNumber: "",
                email: "",
                hibernateLazyInitializer: {}
            },
            worker: 
            {
                id: this.state.worker,
                fName: "",
                lName: "",
                admin: 
                {
                    id: "",
                    adminName: "",
                    service: "",
                    hibernateLazyInitializer: {}
                },
                hibernateLazyInitializer: {}
            },
            status: "NEW_BOOKING",
            date: this.state.selectedSession.substring(6,16),
            startTime: this.state.selectedSession.substring(17,25),
            endTime: this.state.selectedSession.substring(26,34),
            service: this.state.service
        }
        console.log(newbooking);
        CreateBooking.createBooking(newbooking).then((res) => 
        {
            alert("Booking successful");
            this.props.history.push("/currentbookings");
        }).catch((err) => 
        {
            this.setState({errorMessage: err.response.data.message});
            alert(err.response.data.message);
            this.props.history.push("/newbooking");
        });
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_CUSTOMER")
        {
            Services.getAllServices().then((res) => 
            {
                this.setState({allservices: res.data});
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
        if (stored && stored.role === "ROLE_CUSTOMER")
        {
            return(
                <React.Fragment>
                    <CustomerDashboard/>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">

                                <h5 className="display-4 text-center pb-5">Create New Booking</h5>
                                <form onSubmit={this.onSubmit}>

                                    <h5>Select Service and Worker</h5>
                                    <hr/>
                                    <h6>Service</h6>
                                    <div className="form-group">
                                        <select id="inputState" 
                                            className="form-control" 
                                            name="service" 
                                            value={this.state.service} 
                                            onChange={this.handleServiceChange} required>
                                            <option value="unknown" defaultValue >Choose Service</option>
                                            {
                                                this.state.allservices.map(
                                                    allservices => 
                                                    <option className="service" 
                                                        key={allservices} 
                                                        value={allservices}>{allservices}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    
                                    <h6>Staff</h6>
                                    <div className="form-group">
                                        <select id="inputState" 
                                            className="form-control" 
                                            name="worker" 
                                            value={this.state.worker} 
                                            onChange={this.handleWorkerSelection}  required>
                                        <option value="unknown" defaultValue>Choose Staff</option>
                                        {
                                            this.state.allworker.map(
                                                allworker => 
                                                <option className="worker" 
                                                    key={allworker.id} 
                                                    value={allworker.id}> {allworker.fName} {allworker.lName}</option>
                                            )
                                        }
                                        </select>
                                    </div>

                                    <h6>Sessions</h6>
                                    <div className="form-group">
                                        <select id="inputState" 
                                            className="form-control" 
                                            name="selectedSession" 
                                            value={this.state.selectedSession} 
                                            onChange={this.onChange} required>
                                            <option value="unknown" defaultValue>Choose Session</option>
                                            {
                                                this.state.availableSessions.map(
                                                    availableSessions => 
                                                    <option className="session" 
                                                        value={availableSessions.id}>Date: {availableSessions.date} {availableSessions.startTime}-{availableSessions.endTime}</option>
                                                )
                                            }
                                        </select>
                                    </div>

                                    <input type="submit" className="btn btn-primary btn-block mt-4" />
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
export default NewBookings;