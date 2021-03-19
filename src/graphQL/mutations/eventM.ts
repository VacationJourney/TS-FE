import gql from 'graphql-tag';

export const CREATE_EVENT = gql`
	mutation CreateEvent(
		$title: String!
		$startTime: String
		$endTime: String
		$location: String
		$contact: String
		$cost: Int
		$description: String
		$dateId: ID!
		$tripId: ID
		$vacation: ID
	) {
		createEvent(
			data: {
				title: $title
				date: {connect: {id: $dateId}}
				startTime: $startTime
				endTime: $endTime
				location: $location
				contact: $contact
				cost: $cost
				description: $description
				tripId: $tripId
				trip: {connect: {id: $vacation}}
			}
		) {
			id
			title
			startTime
			endTime
			location
			contact
			cost
			description
		}
	}
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent(
		$id: ID
		$title: String
		$startTime: String
		$endTime: String
		$location: String
		$contact: String
		$cost: Int
		$description: String
		$tripId: ID
		$dateId: ID
	) {
		updateEvent(
			data: {
				title: $title
				startTime: $startTime
				endTime: $endTime
				location: $location
				contact: $contact
				cost: $cost
				description: $description
				dateId: $dateId
				tripId: $tripId
			}
			where: { id: $id }
		) {
			id
			title
			startTime
			endTime
			location
			contact
			cost
			description
		}
	}

`;

export const DELETE_EVENT = gql`
	mutation DeleteEvent($id: ID!, $dayId: ID!, $tripId: ID!) {
		deleteEvent(id: $id, dayId: $dayId, tripId: $tripId) {
			id
			title
		}
	}
`;