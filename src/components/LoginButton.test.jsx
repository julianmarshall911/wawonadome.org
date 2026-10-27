import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as Firebase from '../data/Firebase';
import LoginButton from './LoginButton';
import { makeStore } from '../store';
import { authStateChanged } from '../store/authSlice';

vi.mock('../data/Firebase', () => ({
  login: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
}));

const renderButton = () => {
  const store = makeStore();
  store.dispatch(authStateChanged(null));
  const router = createMemoryRouter([
    { path: '/', element: <LoginButton /> },
    { path: '/members', element: <p>Members</p> },
  ]);
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
  return { store, router };
};

describe('LoginButton', () => {
  beforeEach(() => vi.resetAllMocks());

  it('validates the email after typing', async () => {
    const user = userEvent.setup();
    renderButton();

    await user.click(screen.getByRole('button', { name: /log in/i }));
    await user.type(screen.getByLabelText('Email address'), 'not-an-email');

    expect(await screen.findByText('Invalid email')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Forgot Password' }),
    ).toBeDisabled();
  });

  it('logs in on Enter and goes to the members page', async () => {
    Firebase.login.mockResolvedValue({
      user: { uid: '1', email: 'pat@example.com' },
    });
    const user = userEvent.setup();
    const { router } = renderButton();

    await user.click(screen.getByRole('button', { name: /log in/i }));
    await user.type(screen.getByLabelText('Email address'), 'pat@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret{Enter}');

    expect(Firebase.login).toHaveBeenCalledWith('pat@example.com', 'secret');
    await waitFor(() =>
      expect(router.state.location.pathname).toBe('/members'),
    );
  });

  it('sends a password reset email', async () => {
    Firebase.sendPasswordResetEmail.mockResolvedValue();
    const user = userEvent.setup();
    renderButton();

    await user.click(screen.getByRole('button', { name: /log in/i }));
    await user.type(screen.getByLabelText('Email address'), 'pat@example.com');
    await user.click(screen.getByRole('button', { name: 'Forgot Password' }));

    expect(Firebase.sendPasswordResetEmail).toHaveBeenCalledWith(
      'pat@example.com',
    );
  });
});
