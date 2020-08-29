import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import HomePage from './Components/HomePage';
import Login from './Components/Login/Login';
import NavigationBar from './Components/NavigationBar';
import NewBookings from './Components/NewBookings';
import BookingHistory from './Components/BookingHistory';
import AddEmployee from './Components/AddEmployee';
import AvailableWorkers from './Components/AvailableWorkers';
import CurrentBookings from './Components/CurrentBookings';
import Employee from './Components/Employee';
import Register from './Components/Login/Register'

import {BrowserRouter as Router, Route} from "react-router-dom";
// import {Provider} from "react-redux";
// import store from './store';

function App() {
    return (

    
        <Router>
            <div>
                <NavigationBar/>
                
                <Route exact path="/homepage" component={HomePage} />
                <Route exact path= "/login" component={Login} />
                <Route exact path= "/newbookings" component={NewBookings} />
                <Route exact path= "/bookinghistory" component={BookingHistory} />
                <Route exact path= "/addemployee" component={AddEmployee} />
                <Route exact path= "/availableworkers" component={AvailableWorkers} />
                <Route exact path= "/currentbookings" component={CurrentBookings} />
                <Route exact path= "/employee" component={Employee} />
                <Route exact path="/register" component={Register} />

            </div>
        </Router>
        
    );
}

export default App;
