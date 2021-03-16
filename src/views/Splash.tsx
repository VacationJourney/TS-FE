import React from 'react';
import Logo from '../components/Splash/Logo'
import Logo2 from '../components/Splash/LogoBottom'

import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from '@material-ui/core'
import {useStyles} from '../Styles/Splash'

const Splash: React.FC = () => {
  const classes = useStyles()
  const { loginWithRedirect } = useAuth0();

  return (
    <div className={classes.root}>
      <section className={classes.splashTop}>
        <Button className={classes.login} onClick={() => loginWithRedirect()}>
          <Typography variant="h6">Login</Typography>
        </Button>
        <Logo />
        <article className={classes.tag}>
          <h3 className={classes.h3} >Afford </h3>
          <h3 className={classes.h3} >the </h3>
          <h3 className={classes.h3} >Adventure</h3>
        </article>
      </section>
      <section className={classes.splashMiddle}>
        <article>
          <ul className={classes.details}>
            <li className={classes.li}><h2>Plan</h2></li>
            <li className={classes.li}><h2>Organize</h2></li>
            <li className={classes.li}><h2>Budget</h2></li>
          </ul>
        </article>
      </section>
      <section className={classes.splashBottom}>
        <Logo2 />
        <div className={classes.cta}>
        <aside className={classes.quote}>
          <h2>A <strong>Vacation</strong> is what you <em>take</em></h2>
          <h2>When you can no longer <em>take</em></h2>
          <h2>What you've been <em>taking</em>!</h2>
          <p>Earl Wilson</p>
        </aside>
        <Button className={ classes.register } onClick={ () => loginWithRedirect({ screen_hint: "signup", }) }>
        <Typography variant="h6">Register</Typography>
      </Button>
      </div>
      </section>
    </div>
  )
}

export default Splash
