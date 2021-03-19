import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
// graphql 
import { useQuery, useMutation } from '@apollo/react-hooks';
import { UPDATE_VACATION } from '../graphQL/mutations/vacationM';
import { GET_ONE_TRIP } from '../graphQL/queries'

// styles
import { Input, Button, TextField, Typography, InputAdornment } from '@material-ui/core';
import { useStyles } from '../Styles/UpdateStyle'
import { ParamsProps } from '../types/types'

const UpdateVacation = () => {
	const history = useHistory();
	const classes = useStyles();
	const { register, handleSubmit } = useForm();
	let params = useParams<ParamsProps>();
	let tripId = params.id;

	// GraphQL Logic
	const { data, loading, error } = useQuery(GET_ONE_TRIP, {
		variables: { id: tripId },
	});
	const [updateVacation] = useMutation(UPDATE_VACATION, {
		refetchQueries: mutationResult => [{ query: GET_ONE_TRIP, variables: { id: tripId } }]
	});

	// Date Formatting
	var lastDate = (data.vacation.dates.length) - 1;
	var begins = dayjs(data.vacation.dates[0].date).format('MMM DD');
	var end = dayjs(data.vacation.dates[lastDate].date).format('MMM DD')

	// Functions
	const onSubmit = (data: { budget: any, id: string }) => {
		data = {
			...data,
			budget: parseInt(data.budget),
			id: tripId
		};
		updateVacation({ variables: data });
		history.push(`/vacations/${tripId}`);
	};

	const goBack = () => {
		history.push(`/vacations/${tripId}`);
	};

	// UI Error handling
	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;

	return (
		<div className={classes.updateVacation}>
			<Typography variant='h3'>{data.vacation.title}</Typography>
			<Typography variant='h6'>{begins + ' - ' + end}</Typography>
			<section className={classes.edit} >
				<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
					<TextField
						type='text'
						placeholder='title'
						defaultValue={data.vacation.title}
						name='title'
						inputRef={register}
					/>
					<Input
						id="standard-number"
						placeholder="Budget"
						type="number"
						name="budget"
						defaultValue={data.vacation.budget}
						startAdornment={<InputAdornment position="start">$</InputAdornment>}
						inputRef={register()}
					/>

					<Button className={classes.submit} type='submit' >Edit</Button>
				</form>
			</section>
			<footer className={classes.footer2}>
				<Button className={classes.backButton} onClick={goBack}>
					Back
				</Button>
			</footer>
		</div>
	);
};

export default UpdateVacation;
