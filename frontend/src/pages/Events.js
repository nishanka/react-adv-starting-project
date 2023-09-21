const EVENTS = [
  { id: 'e1', title: 'Event 01' },
  { id: 'e2', title: 'Event 02' },
  { id: 'e3', title: 'Event 03' },
];

const EventsPage = () => {
  return (
    <>
        <h1>Events Page</h1>
        <ul>
          {EVENTS.map(event => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
    </>
  );
};

export default EventsPage;