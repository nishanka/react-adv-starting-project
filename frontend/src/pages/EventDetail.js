import { useParams, Link } from 'react-router-dom';

const EventDetailPage = () => {
  const params = useParams();

  return (
    <>
        <h1>Event Detail Page</h1>
        <p>{params.eventId}</p>
        <p><Link to="/events">Back to Events Page</Link></p>
    </>
  );
};

export default EventDetailPage;