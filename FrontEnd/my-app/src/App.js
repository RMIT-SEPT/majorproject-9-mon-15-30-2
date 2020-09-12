import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CustomerHomePage from './Components/CustomerHomePage';
import Login from './Components/Login_SignUp/Login';
import BookingHistory from './Components/BookingHistory';
import AddEmployee from './Components/AddEmployee';
import AvailableWorkers from './Components/AvailableWorkers';
import CurrentBookings from './Components/CurrentBookings';
import Employee from './Components/Employee';
import Register from './Components/Login_SignUp/Register';
import DefaultPage from './Components/DefaultPage';
import CustomerDashboard from './Components/CustomerDashBoard';
import NewBooking from './Components/CreateNewBooking/NewBooking';
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
                <Route exact path= "/employee" component={Employee} />
                <Route exact path= "/register" component={Register} />
                <Route exact path= "/account" component={AccountPage}/>
                <Route exact path= "/adminhomepage" component={AdminPage}/>

                <Route exact path= "/newbooking" component={NewBooking}/>
            </div>
        </Router>
    );
}

export default App;
