import { makeStyles } from '@material-ui/core'
import Flight from '../assets/flight.jpg'

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column'
  },
  splashTop: {
    height: '100vh',
    width: '100%',
    backgroundImage: `url(${Flight})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  login: {
    background: 'black',
    border: '2px solid black',
    color: 'white',
    padding: '.5% 1%',
    transition: '.3s ease-in-out',
    marginTop: 10,
    '&:hover': {
      color: 'black',
    },
  },
  tag: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20
  },
  line: {
    margin: 5,
    color: 'white',
    
    textShadow: '1px 3px 3px pink',
    [theme.breakpoints.up("lg")]: {
      
      color: 'black',
    }
  },
  splashMiddle: {
    position: 'relative',
    height: '100vh',
    background: 'black',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center'
  },
  details: {
    margin: '3% 0 5%',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    listStyle: 'none',
    color: '#FFFDFD',
    transition: '.06s ease-in-out',
  },
  detail: {
    margin: '1%',
    width: '90%',
    padding: '.5% 0',
    border: '1px solid pink',
    [theme.breakpoints.up("md")]: {
      width: '30%',
    },
    '&:hover': {
      borderColor: '#1e90ff',
      transform: 'scale(1.05)'
    }
  },

  splashBottom: {
    position: 'relative',
    height: '100vh',
    padding: '2%',
    background: 'black',
  },
  cta: {
    position: 'absolute',
    bottom: '3%',
    left: '50%',
    transform: 'translate(-50%, -20%)',
    width: '100%',
  },
  quote: {
    color: "#ff66c3",
    marginBottom: '10%',
  },
  register: {
    background: 'white',
    border: '1px solid #1e90ff',
    color: 'black',
    padding: '1% 2%',
    transition: '.3s ease-in-out',
    '&:hover': {
      color: 'pink',
    },
    [theme.breakpoints.up("md")]:{
      padding: '0.5% 1% ',
    }
  }

}))