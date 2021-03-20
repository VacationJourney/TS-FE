import React, { useRef, createRef } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_VACATION } from '../graphQL/mutations/vacationM';
import { GET_VACATIONS } from '../graphQL/queries'
import { Grid, Card, Typography, Button } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from './Modal/Index'
import { useStyles } from '../Styles/VacationsStyle'

interface CardProps {
	userId: string,
	data: {
		vacations: []
	}
}

const VacationCard = ({ data, userId }: CardProps) => {
	const classes = useStyles();
	let { url } = useRouteMatch();
	const tripsLength = data.vacations.length
	const deleteTripRef = useRef<any[]>([])

	// create array of refs 
	if (deleteTripRef.current.length !== tripsLength) {
		deleteTripRef.current = [...new Array(tripsLength)].map((_: any, i: number) => deleteTripRef.current[i] || createRef())
	}
	// GraphQL
	const [deleteVacation] = useMutation(DELETE_VACATION, {
		refetchQueries: mutationResult => [{ query: GET_VACATIONS, variables: { id: userId } }],
	});
	
	const deleteTrip = (trip: { id: string }, i: number) => {
		deleteVacation({ variables: { id: trip.id } })
		deleteTripRef.current[i].current.close()
	}

	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				{data.vacations.map((trip: { id: string, title: string }, i: number) => (
						<Grid item key={i} xs={12} sm={6} md={3} lg={3}>
							<Card className={classes.vacationCard}>
								<Link className={classes.vLink} to={`${url}/${trip.id}`}>
									<Typography variant='h4'>
										{trip.title}
									</Typography>
								</Link>
								<Button className={classes.deleteButton}
									onClick={() => deleteTripRef.current[i].current.open()}>
									<DeleteIcon />
								</Button>
							</Card>
						<Modal  ref={deleteTripRef.current[i]}>
							<Typography variant='h6'>
								Confirm deleting trip?
      				</Typography>
							<Button
								className={classes.deleteButtonRed}
								onClick={() => deleteTrip(trip, i)}>
								<DeleteIcon />
								<ListItemText primary={trip.title} />
							</Button>
						</Modal>
						</Grid>
				))}
			</Grid>
		</div>
	);
};

export default VacationCard;