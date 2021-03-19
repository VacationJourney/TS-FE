import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(() => ({
	updateVacation: {
		maxWidth: '100%',
		height: '100%',
		textAlign: 'center',
	},
	edit: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: '5%',
		alignItems: 'center',
		width: '100%',
		height: '70vh',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
	},
	submit: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		marginTop: '5%',
	},
	footer2: {
		position: 'fixed',
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		bottom: 0,
	},
	backButton: {
		background: 'black',
		color: 'white',
		fontSize: '1rem',
		width: '30%',
	},
}))