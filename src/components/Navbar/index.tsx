import React from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import Menu from './Menu'
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Hidden } from '@material-ui/core'
import { useStyles } from '../../Styles/NavStyle'
import JCost from '../../assets/J.png'

type NavProps = {
  picture: string,
  client: any
}
const Navbar = ({ picture, client }: NavProps) => {
  const classes = useStyles()
  let { url } = useRouteMatch();
  const history = useHistory();
  const { logout } = useAuth0();

  const exit =  () => {
    client.resetStore();
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <section className={classes.navbar}>
      <Link className={classes.logoAnchor} to={`${url}`}>
        <img src={JCost} className={classes.journeyCostLogo} alt="Journey Co$t Logo" />
      </Link>
      <nav className={classes.menu}>
        <img
          src={picture}
          alt="Profile"
          className={classes.userImage}

        />
        <Hidden smDown>
          <HomeIcon className={classes.menuItem} onClick={() => history.push('/vacations')} fontSize='large'></HomeIcon>
          <ExitToAppIcon className={classes.menuItem} onClick={exit} fontSize='large' />
        </Hidden>
        <Hidden mdUp>
          <Menu exit={exit} />
        </Hidden>
      </nav>
    </section>
  )
}

export default Navbar
