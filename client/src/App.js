// main react imports
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// containers
import Main from './containers/Main';

// css/images
// import logo from './logo.svg';
import './App.css';

const App = () => (
  <Router>
    <div className="main-container">
      {/* <Navbar/> */}
      <Switch>
        <Route exact path="/" component={Main} />
        <Route component={Main} />
      </Switch>
    </div>
  </Router>
);
export default App;
