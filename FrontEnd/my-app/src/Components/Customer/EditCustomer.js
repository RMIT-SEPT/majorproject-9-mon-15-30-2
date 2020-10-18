import React, { Component } from 'react';
import CustomerAction from '../../actions/HandleCustomer';
import CustomerDashboard from './CustomerDashBoard';
import { Redirect } from 'react-router-dom';

class EditCustomer extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = 
        {
            id: this.props.match.params.id,
            fName: "",
            lName: "",
            email: "",
            address: "",
            phoneNumber: "",
            username: ""
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_CUSTOMER") 
        {
            this.getCustomerDetail(stored.id, stored.token);
        }
        else
        {
            return <Redirect to="/"/>
        }
    }

    getCustomerDetail(storedId, token)
    {
        return CustomerAction.getProfile(storedId, token).then((res) =>
        {
            let customerDetail = res.data;
            this.setState(
            {
                id: this.state.id,
                fName: customerDetail.fName,
                lName: customerDetail.lName,
                email: customerDetail.email,
                address: customerDetail.address,
                phoneNumber: customerDetail.phoneNumber,
                username: customerDetail.username
            });
        }).catch((err) => 
        {
            if(err.isAxiosError)
            {
                console.log("no connection");
            }
            else if(String(err.response.status) === "401")
            {
                console.log(err.response.status);
                localStorage.clear();
                alert("Session Expired");
                this.props.history.push('/login');
            }
            else
            {
                this.props.history.push('/account');
            }
        });
    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }

    onUpdate = (e) => 
    {
        e.preventDefault();
        var stored = JSON.parse(localStorage.getItem("user"));
        let EditCustomer = 
        {
            fName: this.state.fName,
            lName: this.state.lName,
            email: this.state.email,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            username: this.state.username
        };
        console.log(EditCustomer);
        this.updateCustomer(stored.id, stored.token, EditCustomer);
    }

    updateCustomer(storedId, token, editedDetail)
    {
        CustomerAction.updateProfile(storedId, token, editedDetail).then((res) => 
        { 
            this.props.history.push('/account');
            alert("Customer details are updated successfully");
        }, (err) => 
        {
            if(String(err.response.status) === "401")
            {
                localStorage.clear();
                alert("Session Expired");
                this.props.history.push('/login');
            }
            else
            {
                console.log(err.response);
                
                if (err.response.data.message)
                {
                    console.log(err.response.data.message)
                    this.setState({errorMessage: err.response.data.message});
                }
                else if (err.response.data.phoneNumber)
                {
                    console.log(err.response.data.phoneNumber);
                    this.setState({errorMessage: "Phone Number: "+err.response.data.phoneNumber});
                }
            }
        });
    }

    cancel()
    {
        this.props.history.push('/account');
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
                            <h5 className="display-4 text-center">Update Details</h5>
                            <hr />
                            <form onSubmit={this.onUpdate}>

                                <h6>Customer ID</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input readOnly="readonly" 
                                                className="form-control form-control-lg" 
                                                placeholder="Enter new Customer ID"
                                                name="id" 
                                                value={this.state.id} 
                                                onChange={this.onChange} required/>
                                        </div>
                                    </div>
                                </div>

                                <h6>First Name</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" 
                                                className="form-control form-control-lg" 
                                                placeholder="Enter new First Name" 
                                                name="fName" 
                                                value={this.state.fName} 
                                                onChange={this.onChange} required/>
                                        </div>
                                    </div>
                                </div>
                            
                                <h6>Last Name</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" 
                                                className="form-control form-control-lg" 
                                                placeholder="Enter new Last Name" 
                                                name="lName" 
                                                value={this.state.lName} 
                                                onChange={this.onChange} required/>
                                        </div>
                                    </div>
                                </div>

                                <h6>Email</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="email" 
                                                className="form-control form-control-lg" 
                                                placeholder="Enter new Email" 
                                                name="email" 
                                                value={this.state.email} 
                                                onChange={this.onChange} required/>
                                        </div>
                                    </div>
                                </div>

                                <h6>Address</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" 
                                                className="form-control form-control-lg" 
                                                placeholder="Enter new Address" 
                                                name="address" 
                                                value={this.state.address} 
                                                onChange={this.onChange} required/>
                                        </div>
                                    </div>
                                </div>

                                <h6>Phone Number</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="tel" 
                                                className="form-control form-control-lg" 
                                                placeholder="Enter new Phone Number"
                                                name="phoneNumber" 
                                                maxLength={10} minLength={10} pattern="[0-9]*"
                                                value={this.state.phoneNumber} 
                                                onChange={this.onChange} required/>
                                        </div>
                                    </div>
                                </div>

                                <h6>Username</h6>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input type="text" 
                                                className="form-control form-control-lg" 
                                                placeholder="Enter new Username"
                                                name="username" 
                                                maxLength={24} minLength={3}
                                                value={this.state.username} 
                                                onChange={this.onChange} required/>
                                        </div>
                                    </div>
                                </div>

                                {
                                    this.state.errorMessage &&
                                    <h6 className="alert alert-danger"> {this.state.errorMessage} </h6> 
                                }
                                <button className="btn btn-success" 
                                        type="submit" >Save
                                </button>
                                <button className="btn btn-danger" 
                                        onClick={this.cancel.bind(this)} 
                                        style={{marginLeft: "10px"}}>Cancel
                                </button>
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
export default EditCustomer;