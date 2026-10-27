import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { UserCredential } from 'firebase/auth';
import { Provider } from 'react-redux';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as Firebase from '../data/Firebase';
import LoginButton from './LoginButton';
import { makeStore } from '../store';
import { selectAlert } from '../store/alertSlice';
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

const openDialog = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole('button', { name: /log in/i }));
  return screen.findByRole('dialog', { name: 'Log in' });
};

describe('LoginButton', () => {
  beforeEach(() => vi.resetAllMocks());

  it('shows field errors on submit instead of logging in', async () => {
    const user = userEvent.setup();
    renderButton();
    await openDialog(user);

    await user.type(screen.getByLabelText('Email address'), 'pat@wawona');
    await user.type(screen.getByLabelText('Password'), '{Enter}');

    expect(
      await screen.findByText(
        'Enter a full email address, like pat@wawonadome.org.',
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('Enter your password.')).toBeInTheDocument();
    expect(Firebase.login).not.toHaveBeenCalled();
  });

  it('logs in on Enter and goes to the members page', async () => {
    vi.mocked(Firebase.login).mockResolvedValue({
      user: { uid: '1', email: 'pat@example.com', displayName: null },
    } as UserCredential);
    const user = userEvent.setup();
    const { router } = renderButton();
    await openDialog(user);

    await user.type(screen.getByLabelText('Email address'), 'pat@example.com');
    await user.type(screen.getByLabelText('Password'), 'secret{Enter}');

    expect(Firebase.login).toHaveBeenCalledWith('pat@example.com', 'secret');
    await waitFor(() =>
      expect(router.state.location.pathname).toBe('/members'),
    );
  });

  it('sends a password reset email', async () => {
    vi.mocked(Firebase.sendPasswordResetEmail).mockResolvedValue();
    const user = userEvent.setup();
    renderButton();
    await openDialog(user);

    await user.type(screen.getByLabelText('Email address'), 'pat@example.com');
    await user.click(screen.getByRole('button', { name: 'Forgot password' }));

    expect(Firebase.sendPasswordResetEmail).toHaveBeenCalledWith(
      'pat@example.com',
    );
  });

  it('asks for an email before sending a reset', async () => {
    const user = userEvent.setup();
    const { store } = renderButton();
    await openDialog(user);

    await user.click(screen.getByRole('button', { name: 'Forgot password' }));

    expect(Firebase.sendPasswordResetEmail).not.toHaveBeenCalled();
    expect(selectAlert(store.getState())).toMatchObject({
      open: true,
      variant: 'error',
    });
  });
});
