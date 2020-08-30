import React, { Component } from 'react'

class NewBookings extends Component {
    
    constructor(){
        super();

        this.state={
            firstname: "",
            lastname: "",
            workername:"",
            service:"",
            start_date:""
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
        const newbookings = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            workername: this.state.workername,
            service: this.state.service,
            start_date: this.state.start_date
        }
        console.log(newbookings);
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create New Booking</h5>
                        <hr />
                        <form onSubmit={this.onSubmit}>

                            <h6>Customer</h6>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control form-control-lg " placeholder="First Name" name="firstname" value= {this.state.firstname} onChange = {this.onChange} required/>
                                    </div>
                                    <div className="col">
                                        <input type="text" className="form-control form-control-lg " placeholder="Last Name" name="lastname" value= {this.state.lastname} onChange = {this.onChange} required/>
                                    </div>
                                </div>
                            </div>

                            <h6>Staff's Name</h6>
                            <div className="form-group">
                                <select id="inputState" class="form-control" name="workername" value= {this.state.workername} onChange = {this.onChange} required>
                                    <option value="unknown" selected>Choose...</option>
                                    <option value="chhayhy">Chhayhy</option>
                                    <option value="mengkheang">Mengkheang</option>
                                    <option value="genie">Genie</option>
                                    <option value="william">William</option>
                                    <option value="vincent">Vincent</option>
                                </select>
                            </div>
                          
                            <h6>Service</h6>
                            <div className="form-group">
                                <select id="inputState" class="form-control" name="service" value= {this.state.service} onChange = {this.onChange} required>
                                    <option value="unknown" selected>Choose...</option>
                                    <option value="massage">Massage</option>
                                    <option value="haircut">Haircut</option>
                                    <option value="waxing">Waxing</option>
                                    <option value="hairwash">Hair Wash</option>
                                </select>
                            </div>

                            <h6>Start Date</h6>
                            <div className="form-group">
                                <input type="date" className="form-control form-control-lg" placeholder="Enter date" name="start_date"  value= {this.state.start_date} onChange = {this.onChange} required/>
                            </div>

                            <h6>Duration</h6>
                            <div className="form-check" required>
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                <label className="form-check-label" for="defaultCheck1">
                                    9:00am - 9:30am
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck2"/>
                                <label className="form-check-label" for="defaultCheck2">
                                    9:30am - 10:00am
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck2"/>
                                <label className="form-check-label" for="defaultCheck2">
                                    10:00am - 10:30am
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                <label className="form-check-label" for="defaultCheck1">
                                    10:30am - 11:00am
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck2"/>
                                <label className="form-check-label" for="defaultCheck2">
                                    11:00am - 11:30am
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck2"/>
                                <label className="form-check-label" for="defaultCheck2">
                                    11:30am - 12:00am
                                </label>
                            </div>

                            <input type="submit" className="btn btn-primary btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewBookings;