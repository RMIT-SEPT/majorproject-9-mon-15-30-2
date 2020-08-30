import React, { Component } from 'react'

class AddEmployee extends Component {
    constructor(){
        super();

        this.state= {
        firstname: "",
        lastname: ""
    }; 
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const newPerson = {
            firstname: this.state.firstname,
            lastname: this.state.lastname
        }

        console.log(newPerson);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Register New Employee</h5>
                        <hr />
                        <form onSubmit={this.onSubmit}>

                            <h6>First Name</h6>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg " placeholder="First Name" name="firstname" 
                                value= {this.state.firstname}
                                onChange = {this.onChange}/>
                            </div>

                            <h6>Last Name</h6>
                            <div className="form-group">
                                <input type="text" className="form-control form-control-lg " placeholder="Last Name" name="lastname"
                                value= {this.state.lastname}
                                onChange = {this.onChange} />
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