import React, { Component } from 'react'

class AddEmployee extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Register New Employee</h5>
                        <hr />
                        <form>

                            <h6>First Name</h6>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg " placeholder="First Name" name="firstname" />
                            </div>

                            <h6>Last Name</h6>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg " placeholder="Last Name" name="lastname" />
                            </div>
                            
                            <input type="submit" className="btn btn-primary btn-block mt-4" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default AddEmployee;