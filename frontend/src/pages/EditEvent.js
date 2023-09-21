import { useParams } from "react-router-dom";

const EditEventPage = () => {
  const params = useParams();

  return (
    <>
        <h1>Edit Event Page</h1>
        <p>Edit {params.eventId} content.</p>
    </>
  );
};

export default EditEventPage;