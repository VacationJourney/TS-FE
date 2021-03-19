import React, { useRef } from 'react'
import dayjs from 'dayjs'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_EVENT, UPDATE_EVENT } from '../../graphQL/mutations/eventM'
import { GET_ONE_TRIP } from '../../graphQL/queries'
import Modal from '../Modal/Index'
import EditEventForm from './EditEventForm'
// Style
import '../../Styles/CSS/EventDrawer.css'
import EditIcon from '@material-ui/icons/Edit';
import { AiFillCloseCircle } from 'react-icons/ai'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Event, ModalRefProps, EventDrawerProps } from '../../types/types'



const EventDrawer = ({ event, selectedEvent, setSelectedEvent, time, tripCal, vacationId, selected }: EventDrawerProps) => {
  const editModal = useRef<ModalRefProps>(null)

  const start = dayjs(selected + 'T' + event.startTime).format(`${time}`)
  const end = event.endTime ? dayjs(selected + 'T' + event.endTime).format(`${time}`) : ''

  // Update an event
  const [updateEvent] = useMutation(UPDATE_EVENT, {
    refetchQueries: mutationResult => [
      { query: GET_ONE_TRIP, variables: { id: vacationId } },
    ],
  });
  // Delete an event
  const [deleteEvent] = useMutation(DELETE_EVENT, {
    refetchQueries: mutationResult => [
      { query: GET_ONE_TRIP, variables: { id: vacationId } },
    ],
  });
  // Update event form function
  const editSubmit = (data: Event) => {
    data = {
      ...data,
      cost: parseInt(data.cost),
      dateId: tripCal[selected].id,
      tripId: vacationId,
      id: event.id
    }
    updateEvent({ variables: data })
    if (editModal.current !== null) {
      editModal.current.close()
    }

  }

  const openModal = () => {
    if (editModal.current !== null) {
      editModal.current.open()
    }
  }

  const deleteActivity = () => {
    deleteEvent({ variables: { id: event.id, dayId: tripCal[selected].id, tripId: vacationId } })
    setSelectedEvent('')
  }
  return (
    <>
      <div className={`${selectedEvent === event.id ? 'eventDrawerOverlay' : ''}`}
        onClick={() => setSelectedEvent('')}
      ></div>
      <div className={`eventDrawer ${selectedEvent === event.id ? 'eventDrawer__open' : ''}`} >
        <EditIcon className='editModalButton' onClick={openModal} />
        <ul className='eventDetails'>
          <li className='detail'>{event.title} <span /> ${event.cost}</li>
          <li className='detail'>{start} - {end} </li>
          <li className='detail'>{event.location}</li>
          <li className='detail'>{event.contact}</li>
          <li className='detail'>{event.description}</li>
        </ul>
        <DeleteForeverIcon
          className='deleteEvent'
          fontSize='large'
          onClick={deleteActivity} />
        <AiFillCloseCircle className='closeEventDetails' onClick={() => setSelectedEvent('')} />
        <Modal ref={editModal}>
          <EditEventForm
            event={event}
            editSubmit={editSubmit}
          />
        </Modal>
      </div>
    </>
  )
}

export default EventDrawer
