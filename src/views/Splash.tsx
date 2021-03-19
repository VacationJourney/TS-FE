import React from 'react';
import Logo from '../components/Splash/Logo'
import Logo2 from '../components/Splash/LogoBottom'

import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography } from '@material-ui/core'
import {useStyles} from '../Styles/SplashStyle'

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
          <Typography variant="h4" className={classes.line} >Afford </Typography>
          <Typography variant="h4" className={classes.line} >the </Typography>
          <Typography variant="h4" className={classes.line} >Adventure</Typography>
        </article>
      </section>
      <section className={classes.splashMiddle}>
        <article>
          <div className={classes.details}>
            <Typography variant="h4" className={classes.detail}>Plan</Typography >
           <Typography variant="h4" className={classes.detail}>Organize</Typography >
           <Typography variant="h4" className={classes.detail}>Budget</Typography >
          </div>
        </article>
      </section>
      <section className={classes.splashBottom}>
        <Logo2 />
        <div className={classes.cta}>
        <aside className={classes.quote}>
          <Typography variant="h4">A <strong>Vacation</strong> is what you <em>take</em></Typography >
          <Typography variant="h4">When you can no longer <em>take</em></Typography >
          <Typography variant="h4">What you've been <em>taking</em>!</Typography >
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
