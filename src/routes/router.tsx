import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';

import Layout from './Layout';
import RequireAuth from './RequireAuth';
import RouteError from './RouteError';
import HomePage from '../containers/HomePage';

export const routes: RouteObject[] = [
  {
    element: <Layout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <HomePage /> },
      {
        element: <RequireAuth />,
        children: [
          {
            path: 'members',
            lazy: async () => ({
              Component: (await import('../containers/MembersPage')).default,
            }),
          },
        ],
      },
      { path: '*', element: <Navigate to='/' replace /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
