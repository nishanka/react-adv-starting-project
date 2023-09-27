import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const {events} = useLoaderData(); // Use object destructuring to get the events

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );

  /*
  if(data.isError) {
    return <p>{data.message}</p>;
  }

  const events = data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );  */
}

export default EventsPage;

async function loadEvents () {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.'}
    throw json(
      { message: 'Could not fetch events.'}, 
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
};

// This code executes in browser. Not in the Server. This is a Client side code.
// Loader function is not a react component. Therefore you can't use react hooks like "useState" inside this code.
export function loader () {
  return defer({
    events: loadEvents()
  });
};
