import { useParams, useRouteLoaderData } from "react-router-dom";

import EventForm from '../components/EventForm';

const EditEventPage = () => {
  const params = useParams();
  const data = useRouteLoaderData('event-detail');  // const event = data.event;

  return (
    <>
        <EventForm method="patch" event={data.event} />
        <p>Edit {params.eventId} content.</p>
    </>
  );
};

export default EditEventPage;