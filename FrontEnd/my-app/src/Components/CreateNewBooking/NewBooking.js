import React, { Component } from 'react';
import CreateBooking from '../../actions/HandleBookings';
import Workers from '../../actions/HandleWorkers';
import Services from '../../actions/HandleServices';
import CustomerDashboard from '../CustomerDashBoard';



class NewBookings extends Component {

    constructor(){
        super();

        this.state={
            allworker: [],
            allservices: [],
            workerVal:"",
            
            customer: {
                id: "",
                fName: "",
                lName: "",
                address: "",
                phoneNumber: "",
                email: "",
                hibernateLazyInitializer: {}
            },
            worker: {
                id: "",
                fName: "",
                lName: "",
                admin: {
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
    }


    handleServiceChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
        const workerVal = e.target.value;
        const result = workerVal.substring(1, workerVal.length-1);
        console.log("Service value selected: " + result);

        Workers.getWorkerByService(result).then((res) => {
            if(!res.data.empty)
            {
                console.log(res.data);
                this.setState({ allworker: res.data});
                
            }
            else{
                console.log("Empty");
                console.log(res.data);
            }
            
        });
    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value});

        console.log("onChange");
    }

    onSubmit(e){
        e.preventDefault();
        
        const newbookings = {

            customer: {
                id: "3",
                fName: "customer",
                lName: "one",
                address: "Phnom Penh",
                phoneNumber: 1234567,
                email: "customer1@gmail.com",
                hibernateLazyInitializer: {}
            },
            worker: {
                id: this.state.worker,
                fName: "",
                lName: "",
                admin: {
                    id: "",
                    adminName: "",
                    service: "",
                    hibernateLazyInitializer: {}
                },
                hibernateLazyInitializer: {}
            },
            status: "NEW_BOOKING",
            date: this.state.start_date,
            startTime: this.state.start_time + ":00",
            endTime: this.state.end_time + ":00",
            service: this.state.service
        }
        
        console.log(newbookings);
        CreateBooking.createBooking(newbookings).then(res => {
            alert("Booking successful");
            this.props.history.push("/currentbookings");
        });
    }

    componentDidMount(){
        

        Services.getAllServices().then((res) => {
            this.setState({ allservices: res.data});
            console.log(res.data);
        });

    }

    render() {

        return (
            <React.Fragment>
                <CustomerDashboard/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h5 className="display-4 text-center">Create New Booking</h5>
                            <hr />
                            <form onSubmit={this.onSubmit}>

                                <h6>Service</h6>
                                <div className="form-group">
                                    <select id="inputState" className="form-control" name="service" value= {this.state.service} onChange = {this.handleServiceChange}  required>
                                        <option value="unknown" defaultValue>Choose...</option>
                                        {
                                            this.state.allservices.map(
                                                allservices => 
                                                <option key={allservices} value={JSON.stringify(allservices)}>{allservices}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <h6>Worker</h6>
                                <div>
                                    { this.state.allworker.map(allworker => (
                                    <div key={allworker.id} style={{ margin: "10px" }}>
                                        {allworker.fName}
                                    
                                    </div>
                                    ))}
                                </div>
                                <div className="form-group">
                                    <select id="inputState" className="form-control" name="worker" value= {this.state.worker} onChange = {this.onChange}  required>
                                        <option value="unknown" defaultValue>Choose...</option>
                                        {
                                            this.state.allworker.map(
                                                allworker => 
                                                <option key={allworker.id} value={allworker.id}> {allworker.fName}</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <h6>Start Date</h6>
                                <div className="form-group">
                                    <input type="date" className="form-control form-control-lg" placeholder="YYYY-MM-dd" name="start_date"  value= {this.state.start_date} onChange = {this.onChange} required/>
                                </div>

                                <h6>Start Time</h6>
                                <div className="form-group">
                                    <input type="time" className="form-control form-control-lg" placeholder="HH:mm" name="start_time"  value= {this.state.start_time} onChange = {this.onChange} required/>
                                </div>

                                <h6>End Time</h6>
                                <div className="form-group">
                                    <input type="time" className="form-control form-control-lg" placeholder="HH:mm" name="end_time"  value= {this.state.end_time} onChange = {this.onChange} required/>
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
export default NewBookings;