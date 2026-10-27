import { createBrowserRouter, Navigate } from 'react-router';

import Layout from './Layout';
import RequireAuth from './RequireAuth';
import HomePage from '../containers/HomePage';

export const routes = [
  {
    element: <Layout />,
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
