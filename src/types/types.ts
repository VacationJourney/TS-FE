import React, {SetStateAction} from 'react'

export type Date = {
	id?: string,
	date: string,
	cost: number,
	events: Event[] ,
	notes?: Note[]
}

type createDateProps = {
	date: string,
	cost: number,
}
export type Event = {
	id?: string,
	title: string,
	startTime: string,
	endTime?: string,
	location?: string,
	contact?: string,
	cost: any,
	description?: string,
	dateId?: string,
	tripId?: string,
	vacation?: string
}

export type Note = {
	id: string,
	date?: string,
	vacation?: string,
	title: string,
	idea?: string,
}

export type ParamsProps = {
	id: string
}

export interface DataProps {
	dates: createDateProps[],
	userId: string,
	budget: any;
}

export interface TripProps {
	id: string,
	dates: Date[],
	budget: number | string,
	cost?: number | string,
	title: string,
}
export interface DateNoteProps {
	[key: string]: Date,
}
export interface ModalRefProps {
  useRef: HTMLDivElement,
  open: () => void,
  close: () => void,
}
export interface OneDayProps {
  selected: string,
  setSelected: React.Dispatch<React.SetStateAction<string>>,
  trip: TripProps,
  date: any,
  start: string,
  end: string,
  lastMonth: () => void,
  nextMonth: () => void
	tripCal: { [key: string]: Date }
}

export interface CalendarProps {
	selected: string,
  setSelected: React.Dispatch<React.SetStateAction<string>>,
  trip: TripProps,
  date: any,
	tripStart: string,
	tripEnd: string,
	totalDays: string[],
	weekDays: string[],
	tripMonth: string,
  start: string,
  end: string,
  lastMonth: () => void,
  nextMonth: () => void
	tripCal: { [key: string]: Date }
}

export interface LogicHubProps {
	trip: TripProps
}

export interface EventDrawerProps {
  event: Event, 
  selectedEvent: string, 
  setSelectedEvent: React.Dispatch<React.SetStateAction<string>>, 
  time: string, 
  tripCal: { [key: string]: Date }, 
  vacationId: string, 
  selected: string
}

