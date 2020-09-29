import React, { Component } from 'react';
import DefaultPage from './DefaultPage';
import WorkerHomePage from './Worker/WorkerHomePage';
import CustomerHomePage from './Customer/CustomerHomePage';
import AdminPage from './Admin/AdminHomePage';

class HomePage extends Component 
{
    render() 
    {
        var stored = JSON.parse(localStorage.getItem("user"));
        if(stored)
        {
            if(stored.role === "ROLE_CUSTOMER")
            {
                return(
                    <React.Fragment>
                        <CustomerHomePage/>
                    </React.Fragment>
                )
            }
            else if(stored.role === "ROLE_WORKER")
            {
                return(
                    <React.Fragment>
                        <WorkerHomePage/>
                    </React.Fragment>
                )
            }
            else if(stored.role === "ROLE_ADMIN")
            {
                return(
                    <React.Fragment>
                        <AdminPage/>
                    </React.Fragment>
                )
            }
        }
        else 
        {
            return(
                <React.Fragment>
                    <DefaultPage/>
                </React.Fragment>
            )
        }
    }
}
export default HomePage;