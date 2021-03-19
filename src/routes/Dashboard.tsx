import React, { useState, useEffect } from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import NavBar from '../components/Navbar/index'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { AUTHORIZE_USER } from '../graphQL/mutations/userM'
import { GET_VACATIONS } from '../graphQL/queries'

import PrivateRoute from '../utils/PrivateRoute'
import Loading from '../components/Loading'

import Vacations from '../views/Vacations';
import Trip from '../routes/Trip'
import { useStyles } from '../Styles/VacationsStyle'

const Dashboard = () => {
  const classes = useStyles()
  let { path } = useRouteMatch();
  const { user } = useAuth0()
  const { nickname, email, picture } = user
  const [userId, setUserId] = useState('')
  // GraphQL
  // Upsert User
  const [ authorizeUser] = useMutation(AUTHORIZE_USER);

  	// Read Vacation
	const { client, data, loading, error } = useQuery(GET_VACATIONS, { variables: { id: userId } });
  
  useEffect(() => {
    authorizeUser({
      variables: {
        username: nickname,
        email
      }
    }).then(res => {
      setUserId(res.data.authorizeUser.id)
    })
  }, [authorizeUser, email, nickname])

  return (
    <div className={classes.container}>
      <NavBar picture={picture} client={client}/>
      <Switch>
        <PrivateRoute exact path={path} >
          <Vacations userId={userId} tripInfo={data} loading={loading} error={error}/>
        </PrivateRoute>
        <PrivateRoute path={`${path}/:id`}>
          <Trip userId={ userId }/>
        </PrivateRoute>
      </Switch>
    </div>
  )
}

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <Loading />,
})
