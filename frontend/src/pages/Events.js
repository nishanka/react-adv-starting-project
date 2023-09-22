import { useLoaderData, json } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();

  if(data.isError) {
    return <p>{data.message}</p>;
  }

  const events = data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

// This code executes in browser. Not in the Server. This is a Client side code.
// Loader function is not a react component. Therefore you can't use react hooks like "useState" inside this code.
export async function loader () {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.'}
    throw json(
      { message: 'Could not fetch events.'}, 
      { status: 500 }
    );
  } else {
    return response;
  }
};
