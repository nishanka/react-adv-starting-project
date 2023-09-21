import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRootLayout';

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
      { 
        path: 'events', 
        element: <EventsRootLayout />,
        children: [
          { index: true, 
            element: <EventsPage />, 
            loader: async () => {
              const response = await fetch('http://localhost:8080/events');

              if (!response.ok) {
                // setError('Fetching events failed.');
              } else {
                const resData = await response.json();
                return resData.events;
                // setFetchedEvents(resData.events);
              }
            }
          },
          { path: ':eventId', element: <EventDetailPage />},
          { path: 'new', element: <NewEventPage />},
          { path: ':eventId/edit', element: <EditEventPage />},   
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
