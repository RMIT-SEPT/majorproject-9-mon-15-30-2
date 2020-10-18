import React, { Component } from 'react';
import CustomerAction from '../../actions/HandleCustomer';
import CustomerDashboard from './CustomerDashBoard';
import { Redirect } from 'react-router-dom';

class UpdatePassword extends Component 
{
    constructor(props) 
    {
        super(props)
        this.state = 
        {
            id: this.props.match.params.id,
            username: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount()
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.role === "ROLE_CUSTOMER" ) 
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
                username: customerDetail.username
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
                this.props.history.push('/account');
            }
        });
    }

    onChange(e)
    {
        this.setState({[e.target.name]: e.target.value});
    }

    onSave = (e) => 
    {
        e.preventDefault();
        var stored = JSON.parse(localStorage.getItem("user"));
        let updatedDetail =
        {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
            confirmPassword: this.state.confirmPassword
        };
        console.log(updatedDetail);
        this.UpdatePassword(stored.id, stored.token, updatedDetail);
    }

    UpdatePassword(storedId, token, newPassword)
    {
        return CustomerAction.updatePassword(storedId, token, newPassword).then((res) => 
        { 
            this.props.history.push('/account');
            alert("Password updated successfully");
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
                if (err.response.data.oldPassword)
                {
                    console.log(err.response.data.oldPassword);
                    this.setState({errorMessage: "Old Password: "+err.response.data.oldPassword});
                }
                else if (err.response.data.newPassword)
                {
                    console.log(err.response.data.newPassword);
                    this.setState({errorMessage: "New Password: "+err.response.data.newPassword});
                }
                else if (err.response.data.confirmPassword)
                {
                    console.log(err.response.data.confirmPassword);
                    this.setState({errorMessage: "Confirm Password: "+err.response.data.confirmPassword});
                }
                else
                {
                    console.log(err.response.data.message);
                    this.setState({errorMessage: err.response.data.message});
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
            return (
                <React.Fragment>
                    <CustomerDashboard/>
                    {this.renderChangePassword()}
                </React.Fragment>
            )
        }
        else 
        {
            return <Redirect to="/"/>
        }
    }

    renderChangePassword()
    {
        return(
            <div className="container">
                <div className="row">
                <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Update Password</h5>
                        <hr />
                        <form onSubmit={this.onSave}>

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
                            
                            <h6>Username</h6>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col">
                                        <input readOnly="readonly" 
                                            className="form-control form-control-lg" 
                                            placeholder="Enter Username"
                                            name="username" 
                                            max={21} min={3}
                                            value={this.state.username} 
                                            onChange={this.onChange} required/>
                                    </div>
                                </div>
                            </div>

                            <h6>Old Password</h6>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col">
                                        <input type="password" 
                                            className="form-control form-control-lg" 
                                            placeholder="Enter old Password" 
                                            name="oldPassword" 
                                            maxLength={24} minLength={6}
                                            value={this.state.oldPassword} 
                                            onChange={this.onChange} required/>
                                    </div>
                                </div>
                            </div>
                        
                            <h6>New Password</h6>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col">
                                        <input type="password" 
                                            className="form-control form-control-lg" 
                                            placeholder="Enter new Password" 
                                            name="newPassword" 
                                            maxLength={24} minLength={6}
                                            value={this.state.newPassword} 
                                            onChange={this.onChange} required/>
                                    </div>
                                </div>
                            </div>

                            <h6>Confirm Password</h6>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col">
                                        <input type="password" 
                                            className="form-control form-control-lg" 
                                            placeholder="Enter confirm Password" 
                                            name="confirmPassword" 
                                            maxLength={24} minLength={6}
                                            value={this.state.confirmPassword} 
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
        )
    }
}
export default UpdatePassword;