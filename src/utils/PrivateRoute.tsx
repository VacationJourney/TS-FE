import React from 'react'
import { Route, RouteProps } from 'react-router-dom';
import { withAuthenticationRequired  } from "@auth0/auth0-react";
import Loading from '../components/Loading'

interface PrivateRouteProps extends RouteProps {
component?: any;
children?: any

}
const PrivateRoute= ({component, ...args}: PrivateRouteProps) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
    })}
    {...args}
  />
);

export default PrivateRoute;
