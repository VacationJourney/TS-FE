import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom';
import {UserContext} from '../context/UserContext'
import PrivateRoute from '../utils/PrivateRoute'
import OneVacation from '../views/OneVacation'
import UpdateVacation from '../views/UpdateVacation'

const Trip = ({userId}: {userId: any}) => {
  let { path } = useRouteMatch();

	return (
		<UserContext.Provider value={userId}>
			<Switch>
				<PrivateRoute exact path={ `${path}` } >
					<OneVacation />
				</PrivateRoute>
				<PrivateRoute path={ `${path}/update` }>
					<UpdateVacation />
				</PrivateRoute>
			</Switch>
      </UserContext.Provider>
	);
}

export default Trip
