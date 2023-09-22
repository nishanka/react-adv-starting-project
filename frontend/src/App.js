import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRootLayout';

import HomePage from './pages/Home';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailPage, { loader as eventDetailLoader } from './pages/EventDetail';
import NewEventPage, { action as newEventAction } from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';

const myRouter = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />},
      { 
        path: 'events', 
        element: <EventsRootLayout />,
        children: [
          { index: true, 
            element: <EventsPage />, 
            loader: eventsLoader, // Register the Loader in our Route Definition
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader, // Register the Loader in our Route Definition
            children: [
              { index: true,
                element: <EventDetailPage />,
              },
              { path: 'edit', 
                element: <EditEventPage />
              }, 
            ]
          },
          { path: 'new', element: <NewEventPage />, action: newEventAction },
        ]
      },
      // { path: 'events/:eventId', element: <EventDetailPage />},
      // { path: 'events/new', element: <NewEventPage />},
      // { path: 'events/:eventId/edit', element: <EditEventPage />},   
    ]
  }
]);

function App() {
  return <RouterProvider router={myRouter} />;
}

export default App;
