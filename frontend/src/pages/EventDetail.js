import { useRouteLoaderData, json, redirect } from 'react-router-dom';

import EventItem from '../components/EventItem';

const EventDetailPage = () => {
  const data = useRouteLoaderData('event-detail');

  return (
    <EventItem event={data.event} />
  );
};

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.eventId;

  const response = await fetch('http://localhost:8080/events/' + id);

  if(!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected event.'},
      { status: 500 }
    )
  } else {
    return response;
  }
}

export async function action({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method, //method: 'DELETE', // Accessing this from 'EventItem.js' -> submit(null, { method: 'delete' });
  });

  if(!response.ok) {
    throw json(
      { message: 'Could not delete event.'},
      { status: 500 }
    );
  }

  return redirect('/events');

}