import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1%',
    padding: 5,
  },
  logoAnchor: {
    width: '10%',
    [theme.breakpoints.up("md")]: {
			width: '3%'
		}
  },
  journeyCostLogo: {
    width: '100%',
    transition: '0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    }
  },
  userImage: {
    width: 40,
    borderRadius: '50%',
    marginTop: 3,
  },
  menu: {
    display: 'flex',
    alignItems: 'center'
  },
  menuItem: {
    transition: '0.3s ease-in-out',
    margin: '0 5px',
    '&:hover': {
      color: '#ff66c3',
      transform: 'scale(1.1)'
    }
  },
}))