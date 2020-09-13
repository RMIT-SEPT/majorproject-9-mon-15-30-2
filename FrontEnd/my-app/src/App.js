import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CustomerHomePage from './Components/Customer/CustomerHomePage';
import CustomerDashboard from './Components/Customer/CustomerDashBoard';
import Login from './Components/Login_SignUp/Login';
import Register from './Components/Login_SignUp/Register';
import BookingHistory from './Components/BookingHistory';
import CurrentBookings from './Components/CurrentBookings';
import NewBooking from './Components/CreateNewBooking/NewBooking';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import AvailableWorkers from './Components/AvailableWorkers';
import Employees from './Components/Employees';
import DefaultPage from './Components/DefaultPage';
import AccountPage from './Components/Account';
import AdminPage from './Components/Admin/AdminHomePage';
import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
    return (
        <Router>
            <div>
                <Route exact path= "/" component={DefaultPage}/>
                <Route exact path ="/customerdashboard" component={CustomerDashboard}/>
                <Route exact path= "/customerhomepage" component={CustomerHomePage}/>
                <Route exact path= "/login" component={Login} />
                <Route exact path= "/bookinghistory" component={BookingHistory} />
                <Route exact path= "/addemployee" component={AddEmployee} />
                <Route exact path= "/availableworkers" component={AvailableWorkers} />
                <Route exact path= "/currentbookings" component={CurrentBookings} />
                <Route exact path= "/employees" component={Employees} />
                <Route exact path= "/register" component={Register} />
                <Route exact path= "/account" component={AccountPage}/>
                <Route exact path= "/adminhomepage" component={AdminPage}/>
                <Route exact path= "/editemployee/:id" component={EditEmployee}/>
                <Route exact path= "/newbooking" component={NewBooking}/>
            </div>
        </Router>
    );
}

export default App;
