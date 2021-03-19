import React from 'react'
import { useForm } from 'react-hook-form';
import { useStyles } from '../../Styles/OneDayStyle'
import { TextField, Button } from '@material-ui/core'
import {Event} from '../../types/types'

const CreateEventForm = ({ onSubmit }: {onSubmit: (data: Event) => void}) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm();
  return (
    <form className={ classes.createEvent } onSubmit={ handleSubmit(onSubmit) }>
        <TextField
          required
          className={ classes.eventInput }
          label='Title'
          type='text'
          name='title'
          inputRef={ register({ required: true }) }
        />
      <time className={ classes.oneLine }>
        <TextField
          className={ classes.time }
          required
          type='time'
          name='startTime'
          inputRef={ register({ required: true }) }
        />
        <TextField
          className={ classes.time }
          type='time'
          name='endTime'
          inputRef={ register() }
        />
      </time>
      <div className={ classes.oneLine }>
        <TextField
          className={ classes.eventInput }
          type='text'
          label='location'
          name='location'
          inputRef={ register() }
        />
        <span ></span>
        <TextField
          required
          className={ classes.eventInput }
          type='number'
          label='$'
          name='cost'
          inputRef={ register({ required: true }) }
        />
      </div>
        <TextField
          className={ classes.eventInput }
          type='text'
          label='contact'
          name='contact'
          inputRef={ register() }
        />
        <TextField
          className={ classes.eventInput }
          type='text'
          label='description'
          name='description'
          inputRef={ register() }
        />
      <Button type='submit' className={ classes.submit }>
        Create Event
					</Button>
    </form>
  )
}

export default CreateEventForm
