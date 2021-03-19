import React, { useRef, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import dayjs from 'dayjs'
import useDate from '../../hooks/useDate'
import Modal from '../Modal/Index'
import { useMutation } from '@apollo/react-hooks'
import { UserContext } from '../../context/UserContext'

import { CREATE_EVENT } from '../../graphQL/mutations/eventM'
import { DELETE_DAY, DELETE_VACATION } from '../../graphQL/mutations/vacationM'
import { GET_ONE_TRIP, GET_VACATIONS } from '../../graphQL/queries'
import CreateEventForm from './CreateEventForm'
import EventDrawer from './EventDrawer'
import { Paper, Typography, Card, Button, ListItemText } from '@material-ui/core'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useStyles } from '../../Styles/OneDayStyle'

import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { MdFormatListBulleted } from 'react-icons/md'
import { OneDayProps, Event, ModalRefProps } from '../../types/types'

const OneDay = ({ selected, setSelected, trip, date, start, end, lastMonth, nextMonth, tripCal }: OneDayProps) => {
  const classes = useStyles()
  const { userId } = useContext(UserContext)
  const history = useHistory()
  const modal = useRef<ModalRefProps>(null)
  const deleteDateModal = useRef<ModalRefProps>(null)
  const [selectedEvent, setSelectedEvent] = useState('')
  const [showHours, setShowHours] = useState('list')
  const [time, setTime] = useState('h:mma')

  const handleTime = (event: React.MouseEvent<HTMLElement>, newTime: string) => {
    setTime(newTime);
  };
  const handleHours = (event: React.MouseEvent<HTMLElement>, newDisplay: string) => {
    setShowHours(newDisplay);
  };

  // de-Structure from useDateHook
  const { firstDateOfMonth, lastDateOfMonth } = useDate(date)

  // vars to navigate dates

  const pastDate: string = dayjs(selected).subtract(1, 'day').format('YYYY-M-DD')
  const futureDate: string = dayjs(selected).add(1, 'day').format('YYYY-M-DD')
  // TripDates Array
  const tripDates: string[] = []
  trip.dates.forEach(d => tripDates.push(d.date))

  // fns to navigate dates jumping thru months
  const lastDate = () => {
    if (!tripDates.includes(pastDate)) {
      setSelected(start)
    } else if (tripDates.includes(pastDate)) {
      if (dayjs(pastDate).format('D') === dayjs(lastDateOfMonth).format('D')) {
        lastMonth()
        setSelected(pastDate)
      } else {
        setSelected(pastDate)
      }
    }
  }
  const nextDate = () => {
    if (!tripDates.includes(futureDate)) {
      setSelected(end)
    } else if (tripDates.includes(futureDate)) {
      if (dayjs(futureDate).format('D') === dayjs(firstDateOfMonth).format('D')) {
        nextMonth()
        setSelected(futureDate)
      } else {
        setSelected(futureDate)
      }
    }
  }

  // GraphQL 
  // Create an event
  const [createEvent] = useMutation(CREATE_EVENT, {
    refetchQueries: mutationResult => [
      { query: GET_ONE_TRIP, variables: { id: trip.id } },
    ],
  });

  // Delete a day
  const [deleteDay] = useMutation(DELETE_DAY, {
    refetchQueries: mutationResult => [
      { query: GET_ONE_TRIP, variables: { id: trip.id } },
    ],
  });

  const [deleteVacation] = useMutation(DELETE_VACATION, {
    refetchQueries: mutationResult => [{ query: GET_VACATIONS, variables: { id: userId } }],
  });
  const deleteTrip = () => {
    deleteVacation({ variables: { id: trip.id } })
    history.push('/vacations')
  }

  // Create event form function
  const onSubmit = (data: Event) => {
    data = {
      ...data,
      cost: parseInt(data.cost),
      dateId: tripCal[selected].id,
      tripId: trip.id,
      vacation: trip.id,
    }

    createEvent({ variables: data });
    if (modal.current !== null) {
      modal.current.close()
    }
  }

  // Delete day function
  const deleteDate = () => {
    deleteDay({ variables: { id: tripCal[selected].id, tripId: trip.id } })
    if (selected === start) {
      setSelected(futureDate)
    } else if (selected === end) {
      setSelected(pastDate)
    }
    if (deleteDateModal.current !== null) {
      deleteDateModal.current.close()
    }
  }

  var day = []; // time array
  var counter = 0; // start time

  for (var i = 0; counter < 24 * 60; i++) {
    var hh = Math.floor(counter / 60); // getting hours of day 0 - 24
    var mm = (counter % 60); // getting minutes of the hour 
    day[i] = ("0" + (hh)).slice(-2) + ':' + ("0" + mm).slice(-2);
    counter += 1;
  }

  const activity: { [key: string]: any } = {}
  day.forEach(time => activity[time] = null)
  day.forEach(time => {
    tripCal[selected] && tripCal[selected].events.forEach(e => {
      if (e.startTime === time) {
        return activity[time] = e
      }
    })
  })

  const openDeleteDateModal = () => {
    if (deleteDateModal.current !== null) {
      deleteDateModal.current.open()
    }
  }

  const openModal = () => {
    if (modal.current !== null) {
      modal.current.open()
    }
  }

  return (
    <Paper className={classes.date}>
      <section className={classes.dateTop}>
        <ArrowLeftIcon className={classes.arrows}
          onClick={lastDate}
        />
        <Typography variant='h5'>{dayjs(selected).format('MMM D')}</Typography>
        <ArrowRightIcon className={classes.arrows}
          onClick={nextDate}
        />
      </section >
      <section className={classes.eventsTopBox}>
        <div className={classes.eventsTopBoxLeft}>
          <span className={classes.dayCost}>
            <Typography variant="subtitle2">Day Cost</Typography>
            <Typography variant="subtitle1"><b>${tripCal[selected] && tripCal[selected].cost}</b></Typography>
          </span>
          <DeleteIcon
            style={selected === start || selected === end ? { display: 'flex' } : { display: 'none' }}
            className={classes.deleteButton} onClick={openDeleteDateModal}
          />
        </div>

        <div className={classes.eventsTopBoxRight}>
          <ToggleButtonGroup
            value={showHours}
            exclusive
            onChange={handleHours}
            aria-label="text alignment"
          >
            <ToggleButton value="list" aria-label="left aligned" style={{ padding: 8 }}>
              <MdFormatListBulleted style={{ fontSize: '1.4rem' }} />
            </ToggleButton>
            <ToggleButton value="hours" aria-label="left aligned" style={{ padding: 8 }}>
              <AccessTimeIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <ToggleButtonGroup
            value={time}
            exclusive
            onChange={handleTime}
            aria-label="text alignment"
          >
            <ToggleButton value="h:mma" aria-label="left aligned" style={{ padding: 8 }}>
              12
            </ToggleButton>
            <ToggleButton value="H:mm" aria-label="left aligned" style={{ padding: 8 }}>
              24
            </ToggleButton>
          </ToggleButtonGroup>
          <AddBoxIcon className={classes.addEventButton} fontSize="large" onClick={openModal} />
        </div>
      </section>
      <Modal ref={deleteDateModal}>
        <Typography variant='h6'>
          {tripDates.length > 1 ? 'Confirm deleting date?' : 'Confirm deleting trip?'}

        </Typography>
        <Button
          className={classes.deleteButtonRed} onClick={tripDates.length > 1 ? deleteDate : deleteTrip}>
          <DeleteIcon />
          <ListItemText primary={tripDates.length > 1 ? dayjs(selected).format('MMM D') : trip.title} />
        </Button>
      </Modal>
      <Modal ref={modal}>
        <CreateEventForm
          onSubmit={onSubmit}
        />
      </Modal>
      <section className={classes.eventsBox}>
        {day.map(mm => {
          let e = activity[mm]
          let minute = dayjs(selected + 'T' + mm).format(`${time}`)
          let regex = /:00$/;
          return (
            <>
              {showHours === 'hours' ?
                regex.test(mm) ?
                  e !== null ?
                    <div key={minute} >
                      <time>{minute}</time>
                      <summary key={e.id}>
                        <Card className={classes.event} >
                          {e.title}
                          <ArrowLeftIcon className='drawerButton' onClick={() => setSelectedEvent(e.id)} />
                        </Card>
                        <EventDrawer
                          selectedEvent={selectedEvent}
                          setSelectedEvent={setSelectedEvent}
                          time={time}
                          event={e}
                          tripCal={tripCal}
                          vacationId={trip.id}
                          selected={selected}
                        />
                      </summary >
                    </div>
                    :
                    <div key={minute} className={classes.hour}>{minute}</div>
                  :
                  e !== null ?
                    <summary key={e.id}>
                      <Card className={classes.event} >
                        {e.title}
                        <ArrowLeftIcon className='drawerButton' onClick={() => setSelectedEvent(e.id)} />
                      </Card>
                      <EventDrawer
                        selectedEvent={selectedEvent}
                        setSelectedEvent={setSelectedEvent}
                        time={time}
                        event={e}
                        tripCal={tripCal}
                        vacationId={trip.id}
                        selected={selected}
                      />
                    </summary >
                    :
                    <div key={minute}></div>
                :
                e !== null ?
                  <summary key={e.id}>
                    <Card className={classes.eventLong} >
                      <time>{dayjs(selected + ' T ' + e.startTime).format(`${time}`)}-{e.endTime ? dayjs(selected + ' T ' + e.endTime).format(`${time}`) : ''}</time>
                      <div className={classes.eventRight}>
                        {e.title}
                        <ArrowLeftIcon className='drawerButton' onClick={() => setSelectedEvent(e.id)} />
                      </div>
                    </Card>
                    <EventDrawer
                      selectedEvent={selectedEvent}
                      setSelectedEvent={setSelectedEvent}
                      time={time}
                      event={e}
                      tripCal={tripCal}
                      vacationId={trip.id}
                      selected={selected}
                    />
                  </summary >
                  :
                  <div key={minute}></div>
              }
            </>
          )
        })}
      </section>
    </Paper>
  )

}
export default OneDay

