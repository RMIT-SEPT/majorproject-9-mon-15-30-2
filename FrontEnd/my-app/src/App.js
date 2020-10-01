import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/HomePage';
import Login from './Components/Login_SignUp/Login';
import Register from './Components/Login_SignUp/Register';
import AccountPage from './Components/Account';
import BookingHistory from './Components/Customer/BookingHistory';
import CurrentBookings from './Components/Customer/CurrentBookings';
import NewBooking from './Components/CreateNewBooking/NewBooking';
import AddEmployee from './Components/Admin/AddEmployee';
import EditEmployee from './Components/Admin/EditEmployee';
import Employees from './Components/Admin/Employees';
import AvailableWorkers from './Components/Admin/AvailableWorkers';
import CreateSession from './Components/Admin/CreateSession';
import DefaultPage from './Components/DefaultPage';
import ViewAllBookings from './Components/Admin/ViewAllBookings';
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() 
{
    return(
        <Router>
            <div>
                <Route exact path= "/" component={DefaultPage}/>
                <Route exact path= "/homepage" component={HomePage}/>
                <Route exact path= "/login" component={Login}/>
                <Route exact path= "/register" component={Register}/>
                <Route exact path= "/account" component={AccountPage}/>
                <Route exact path= "/bookinghistory" component={BookingHistory}/>
                <Route exact path= "/currentbookings" component={CurrentBookings}/>
                <Route exact path= "/newbooking" component={NewBooking}/>
                <Route exact path= "/addemployee" component={AddEmployee}/>
                <Route exact path= "/editemployee/:id" component={EditEmployee}/>
                <Route exact path= "/employees" component={Employees}/>
                <Route exact path= "/availableworkers" component={AvailableWorkers}/>
                <Route exact path= "/createsession" component={CreateSession}/>
                <Route exact path= "/viewallbookings" component={ViewAllBookings}/>
            </div>
        </Router>
    );
}

export default App;
