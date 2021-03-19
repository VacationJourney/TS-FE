import React, { useRef, createRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_NOTE, DELETE_NOTE } from '../../graphQL/mutations/noteM'
import { GET_ONE_TRIP } from '../../graphQL/queries'
import Modal from '../Modal/Index'
import { Typography, Grid, Box, Button, ListItemText } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useStyles } from '../../Styles/NotesStyle'
import {Date, Note, TripProps} from '../../types/types'

const NoteCard = ({ trip, date }: {trip: TripProps, date: Date}) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [index, setIndex] = useState(0)
  const notesLength = date.notes ? date.notes.length : 0
  const deleteNoteRef = useRef<any[]>([])
  if (deleteNoteRef.current.length !== notesLength) {
    deleteNoteRef.current = [...new Array(notesLength)].map((_, i) => deleteNoteRef.current[i] || createRef())
  }
  const updateNoteRef = useRef<any[]>([])
  if (updateNoteRef.current.length !== notesLength) {
    updateNoteRef.current = [...new Array(notesLength)].map((_, i) => updateNoteRef.current[i] || createRef())
  }

  // GraphQL logic
  const [deleteNote] = useMutation(DELETE_NOTE, {
    refetchQueries: mutationResult => [{ query: GET_ONE_TRIP, variables: { id: trip.id } }]
  })

  const [updateNote] = useMutation(UPDATE_NOTE, {
    refetchQueries: mutationResult => [{ query: GET_ONE_TRIP, variables: { id: trip.id } }]
  })

  const noteDelete = (note: Note, i: number) => {
    deleteNote({ variables: { id: note.id } })
    deleteNoteRef.current[i].current.close()
  }

  const onSubmit = (data: Note) => {
    updateNote({ variables: data })
    updateNoteRef.current[index].current.close()
  };
  return (
    <Grid container spacing={ 1 }>
      { date.notes && date.notes.map((note, i) => (
        <Grid item key={ note.id } md={ 12 } lg={ 6 } xl={ 3 }>
          <Box className={ classes.noteBox }>
            <Box className={ classes.noteTop }>
              <DeleteIcon className={ classes.deleteNote } onClick={ () => deleteNoteRef.current[i].current.open() } />
              <Typography variant='h4'>{ note.title }</Typography>
              <EditIcon className={classes.editNoteBtn} onClick={ () => updateNoteRef.current[i].current.open() } />
            </Box>
            <Box className={ classes.noteIdea }>{ note.idea }</Box>
          </Box>
          <Modal ref={ deleteNoteRef.current[i] }>
            <Typography variant='h6'>
              Confirm deleting note?
      				</Typography>
            <Button
              className={ classes.deleteButtonRed }
              onClick={ () => noteDelete(note, i) }>
              <DeleteIcon />
              <ListItemText primary={ note.title } />
            </Button>
          </Modal>
          <Modal ref={ updateNoteRef.current[i] }>
            <form className={ classes.updateForm } 
            onSubmit={handleSubmit(onSubmit) }>
              <input type="hidden" value={note.id} name="id" ref={ register }/>
              <input type="text" className={classes.updateInput} placeholder="title" defaultValue={ note.title } name="title" ref={ register({ required: true }) } />
              <textarea name="idea" className={classes.updateInput} defaultValue={ note.idea } placeholder="idea" ref={ register } />
              <input className={classes.updateNoteBtn} onClick={() => setIndex(i)} type="submit" />
            </form>
          </Modal>
        </Grid>
      )) }

    </Grid>
  )
}

export default NoteCard
