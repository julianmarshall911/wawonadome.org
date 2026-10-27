import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import RequireAuth from './RequireAuth';
import { makeStore } from '../store';
import { selectAlert } from '../store/alertSlice';
import { authStateChanged } from '../store/authSlice';

vi.mock('../data/Firebase', () => ({}));

const renderAt = (path, store) => {
  const router = createMemoryRouter(
    [
      { path: '/', element: <p>Home</p> },
      {
        element: <RequireAuth />,
        children: [{ path: '/members', element: <p>Members</p> }],
      },
    ],
    { initialEntries: [path] },
  );
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
};

describe('RequireAuth', () => {
  it('shows a spinner while auth is initializing', () => {
    renderAt('/members', makeStore());
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('redirects home with an alert when logged out', async () => {
    const store = makeStore();
    store.dispatch(authStateChanged(null));

    renderAt('/members', store);

    expect(await screen.findByText('Home')).toBeInTheDocument();
    expect(selectAlert(store.getState())).toMatchObject({
      open: true,
      variant: 'error',
    });
  });

  it('renders the page when logged in', async () => {
    const store = makeStore();
    store.dispatch(authStateChanged({ uid: '1', email: 'pat@example.com' }));

    renderAt('/members', store);

    expect(await screen.findByText('Members')).toBeInTheDocument();
  });
});
