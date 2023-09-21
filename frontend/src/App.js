import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/Root';

import HomePage from './pages/Home';
import EventsPage from './pages/Events';
import EventDetailPage from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';

const myRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />},
      { path: 'events', element: <EventsPage />},
      { path: 'events/:eventId', element: <EventDetailPage />},
      { path: 'events/new', element: <NewEventPage />},
      { path: 'events/:eventId/edit', element: <EditEventPage />},   
    ]
  }
]);

function App() {
  return <RouterProvider router={myRouter}></RouterProvider>;
}

export default App;
