import React, { useState, useEffect } from 'react'
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import LogicHub from './LogicHub'

import { useQuery } from '@apollo/react-hooks';
// GraphQL
import { GET_ONE_TRIP } from '../graphQL/queries';
import { Typography } from '@material-ui/core';
import { useStyles } from '../Styles/OneVacationStyle'
import EditIcon from '@material-ui/icons/Edit';
import {ParamsProps} from '../types/types'

const OneVacation = () => {
	const classes = useStyles();
	let { url } = useRouteMatch();
	let params = useParams<ParamsProps>();
	let vacationId = params.id;

	const [balance, setBalance] = useState(0)

	// GraphQL Hooks
	const { data, loading, error } = useQuery(GET_ONE_TRIP, {
		variables: { id: vacationId },
	});
	
	useEffect(() => {
		if (data && data.vacation) {
			setBalance(data.vacation.budget + data.vacation.cost)
		}
	}, [data])

	if (loading) return <span>Loading...</span>;
	if (error) return <p>ERROR</p>;
	return (
		<section className={classes.oneVacay}>
			<article className={classes.top}>
				<Typography variant='h3'>{data.vacation.title}
				</Typography>
				<Link className={classes.editLink} to={`${url}/update`}>
					<EditIcon style={{ fontSize: 18 }} />
				</Link>
			</article>
			<LogicHub trip={data.vacation} />
			<footer className={classes.footer}>
				<span className={classes.budget}>
					<Typography variant="h6">Budget</Typography>
					<Typography variant="h5">${data.vacation && data.vacation.budget}</Typography>
				</span>
				<span className={classes.cost}>
					<Typography variant="h6">Cost</Typography>
					<Typography variant="h5">${data.vacation && data.vacation.cost}</Typography>
				</span>
				<span style={balance >= 0 ? { background: 'black' } : { background: 'red' }} className={classes.balance}>
					<Typography variant="h6">Balance</Typography>
					<Typography variant="h5">${balance}</Typography>
				</span>
			</footer>
		</section>
	)
}

export default OneVacation
