import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';

import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import dayjs from 'dayjs';
// graphql 
import { CREATE_VACATION } from '../graphQL/mutations/vacationM';
import { GET_VACATIONS } from '../graphQL/queries'
// imported component
import VacationCard from '../components/VacationCard';

// styles
import { Input, TextField, Button, InputAdornment } from '@material-ui/core';
import { useStyles } from '../Styles/VacationsStyle'
import { DataProps } from '../types/types'


const Vacations = ({ userId, tripInfo, loading, error }: { userId: string, tripInfo: any, loading: boolean, error: any }) => {
	const classes = useStyles();
	const { register, handleSubmit, reset } = useForm();
	const [value, onChange] = useState([new Date(), new Date()]);

	// Queries & Mutations
	// Create Vacation
	const [createVacation] = useMutation(CREATE_VACATION, {
		refetchQueries: mutationResult => [{ query: GET_VACATIONS, variables: { id: userId } }],
	});
	// // Read Vacation
	// const { data, loading, error } = useQuery(GET_VACATIONS, { variables: { id: userId } });

	// : { budget: number, userId: string}
	const onSubmit = (data: DataProps) => {
		const dates = [];
		// establish Date variables
		var from = new Date(value[0]);
		var to = new Date(value[1]);
		// // loop for every day
		for (from; from <= to; from.setDate(from.getDate() + 1)) {
			var day = {
				date: dayjs(from).format('YYYY-M-DD'),
				cost: 0
			}
			dates.push(day);
		}

		data = {
			...data,
			userId,
			budget: parseInt(data.budget),
			dates
		};

		createVacation({ variables: data });
		reset();
	};

	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;

	return (
		<section className={classes.page} >
			<DateRangePicker
				onChange={onChange}
				value={value}
				className={classes.picker}
			/>
			<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
				<TextField
					required
					type='text'
					placeholder='destination'
					name='title'
					inputRef={register({ required: true })}
				/>
				<Input
					id="standard-number"
					placeholder="budget"
					type="number"
					name="budget"
					startAdornment={<InputAdornment position="start">$</InputAdornment>}
					inputRef={register({ required: true })}
				/>
				<Button type='submit' className={classes.submit}>
					Create
					</Button>
			</form>
			{tripInfo && <VacationCard userId={userId} data={tripInfo} />}
		</section>
	);
};


export default Vacations;