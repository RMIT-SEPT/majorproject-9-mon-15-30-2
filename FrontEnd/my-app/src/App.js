import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from "./Components/Login";

function App() {
  return (
      <div className="App">
          <div className="container d-flex align-items-center flex-column">
              <Login />
          </div>
      </div>
  );
}

export default App;
