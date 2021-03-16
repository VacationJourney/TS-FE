import React from 'react';
import {Switch, Route} from 'react-router-dom'


import './App.css';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './views/Dashboard';
import Splash from './views/Splash';

function App() {
  return (
   <Switch>
     <Route exact path='/'>
       <Splash />
     </Route>
     <PrivateRoute path='/vacations'>
       <Dashboard />
     </PrivateRoute>
   </Switch>
  );
}

export default App;
