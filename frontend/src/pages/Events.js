import { useEffect, useState } from 'react';

import EventsList from '../components/EventsList';

function EventsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedEvents, setFetchedEvents] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true);
      const response = await fetch('http://localhost:8080/events');

      if (!response.ok) {
        setError('Fetching events failed.');
      } else {
        const resData = await response.json();
        setFetchedEvents(resData.events);
      }
      setIsLoading(false);
    }

    fetchEvents();
  }, []);
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
      {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
    </>
  );
}

export default EventsPage;

// import { Link } from "react-router-dom";

// const EVENTS = [
//   { id: 'e1', title: 'Event 01' },
//   { id: 'e2', title: 'Event 02' },
//   { id: 'e3', title: 'Event 03' },
// ];

// const EventsPage = () => {
//   return (
//     <>
//         <h1>Events Page</h1>
//         <ul>
//           {EVENTS.map(event => (
//             <li>
//               <Link to={event.id} key={event.id}>{event.title}</Link>
//             </li>
//           ))}
//         </ul>
//     </>
//   );
// };

// export default EventsPage;