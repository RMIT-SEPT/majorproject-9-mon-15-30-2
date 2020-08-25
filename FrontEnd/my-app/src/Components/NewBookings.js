import React, { Component } from 'react'

class NewBookings extends Component {
    
    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create New Booking</h5>
                        <hr />
                        <form>

                            <h6>Customer</h6>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg " placeholder="Full Name" name="name" required/>
                            </div>

                            <h6>Staff's Name</h6>
                            <div className="form-group">
                                <select id="inputState" class="form-control" required>
                                    <option selected>Choose...</option>
                                    <option>Chhayhy</option>
                                    <option>Mengkheang</option>
                                    <option>Genie</option>
                                    <option>William</option>
                                    <option>Vincent</option>
                                </select>
                            </div>
                          
                            <h6>Service</h6>
                            <div className="form-group">
                                <select id="inputState" class="form-control" required>
                                    <option selected>Choose...</option>
                                    <option>Massage</option>
                                    <option>Haircut</option>
                                    <option>Waxing</option>
                                    <option>Hair Wash</option>
                                </select>
                            </div>

                            <h6>Start Date</h6>
                            <div className="form-group">
                                <input type="date" className="form-control form-control-lg" placeholder="Enter date" required/>
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