import React from 'react';
import { Switch, Route } from 'react-router-dom'

// import './App.css';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './routes/Dashboard';
import Splash from './views/Splash';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path='/'>
          <Splash />
        </Route>
        <PrivateRoute path='/vacations'>
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
