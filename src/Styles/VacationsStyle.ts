import { makeStyles } from '@material-ui/core';
import Blue from '../assets/Blue.jpg'
export const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${Blue})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
		maxWidth:' 100%',
  },
	root: {
		flexGrow: 1,
	},
  page: {
		maxWidth: '100%',
		maxHeight:'100vh',
    textAlign: 'center',
		padding: '0 5%',
	},
	picker: {
		fontSize: '1.5rem',
		marginTop: '2%',
		borderRadius: '8px',
		border: ' 0 none',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		margin: '1%',
	},
	submit: {
		background: 'rgb(4,54,103, 0.2)',
		fontSize: '1rem',
		margin: '5% 0',
		boxShadow: '0 1px 1px black',
		transition: '0.3s ease-in-out',
		'&:hover': {
			boxShadow: '0 4px 4px 1px black',
			background: 'rgb(4,54,103, 0.6)',
			color: 'white'
		}
	},
	edit: {
		textDecoration: 'none',
		color: 'orange',
		fontSize: '1.5rem',
	},
  // VacationCard
	vLink: {
		textDecoration: 'none',
		color: 'black',
		width: '100%',
	},
	vacationCard: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		transition: '0.3s ease-in-out',
		boxShadow: '0 3px 3px',
		'&:hover': {
			transform: 'scale(1.05)',
			boxShadow: '0 6px 6px 2px',
		}
	},
	deleteButton: {
		position: 'absolute',
		color: 'red',
		left: '0%',
	
	},
	deleteButtonRed: {
    background: 'black',
    color: 'white',
    fontSize: '1rem',
    padding: '3%',
    borderRadius: 4,
    transition: '.3s ease-in-out',
    '&:hover': {
      background: 'red',
      transform: 'scale(1.1)'
    }
  },

}));