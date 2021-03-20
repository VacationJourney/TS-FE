import React, { useState } from 'react'
import dayjs from 'dayjs'
import clsx from 'clsx'

import { useMutation } from '@apollo/react-hooks';
import { CREATE_DAY } from '../../graphQL/mutations/vacationM';
import { GET_ONE_TRIP } from '../../graphQL/queries'

import { Paper, Grid, Box, Typography } from '@material-ui/core';

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { FaCalendarPlus } from 'react-icons/fa'
import { useStyles } from '../../Styles/CalendarStyle';
import { CalendarProps } from '../../types/types'

const Index = ({ trip, tripStart, tripEnd, lastMonth, nextMonth, selected, setSelected, tripCal, date, totalDays, weekDays, tripMonth,  }: CalendarProps) => {
  const classes = useStyles()
  const [addDays, setAddDays] = useState(false)


  // Queries & Mutations
  // Create Vacation
  const [createDay] = useMutation(CREATE_DAY, {
    refetchQueries: mutationResult => [
      { query: GET_ONE_TRIP, variables: { id: trip.id } },
    ],
  });
  // Variables to add dates to trip
  const yesterday = dayjs(tripStart).subtract(1, 'day').format('YYYY-M-DD')
  const tomorrow = dayjs(tripEnd).add(1, 'day').format('YYYY-M-DD')

  const addDateToTrip = (date: string) => {
    createDay({ variables: { tripId: trip.id, cost: 0, date: date } });
  }

  const activateAdd = () => {
    setAddDays(!addDays)
  }

  return (
    <Paper className={classes.calendar}>
      <Box className={classes.calTop}>
        <ArrowLeftIcon className={classes.arrows} onClick={lastMonth} />
        <div className={classes.date}>
          <Typography variant='h5'>{date.format('MMMM YYYY')}</Typography>
           <FaCalendarPlus className={classes.addDateIcon} onClick={activateAdd} style={{color: addDays ? '#ff66c3': 'white'}} />
        </div>
        <ArrowRightIcon className={classes.arrows} onClick={nextMonth} />
      </Box>
      <Grid container className={classes.grid}>
        {weekDays.map(day => (
          <Grid className={classes.weekdays} item key={day}>
            {day}
          </Grid>
        ))}
      </Grid>
      <Grid className={classes.datesGrid}>
        {totalDays.map(d => {
          let month = dayjs(d).format('M')
          let trpMth = (tripMonth + 1).toString()
          let date = dayjs(d).format('D')

          return (
            month === trpMth ?

              tripCal[d] !== null ?
                <Grid className={clsx(classes.trip, {
                  [classes.tripDate]: selected === d
                })} item onClick={() => setSelected(d)} key={d}>
                  {date}
                </Grid> :
                addDays ?
                  d === yesterday || d === tomorrow ?
                    <Grid className={classes.addDates} item key={d}
                      onClick={() => addDateToTrip(d)}
                    >
                      <Typography variant='h6'>&#43; {date}</Typography>
                    </Grid>
                    :
                    <Grid className={classes.monthDates} item key={d}>
                      {date}
                    </Grid>
                  :
                  <Grid className={classes.monthDates} item key={d}>
                    {date}
                  </Grid>
              :
              tripCal[d] !== null ?
                // nest onclick fns to move months
                trpMth > month ?
                  <Grid className={classes.beyondDate}
                    onClick={() => { nextMonth(); setSelected(d) }}
                    item key={d}>
                    {date}
                  </Grid>
                  :
                  <Grid className={classes.beyondDate}
                    onClick={() => { lastMonth(); setSelected(d) }}
                    item key={d}>
                    {date}
                  </Grid>
                :
                <Grid className={classes.otherDates} item key={d}>
                  {date}
                </Grid>
          )
        })
        }
      </Grid>
    </Paper>
  )
}

export default Index
