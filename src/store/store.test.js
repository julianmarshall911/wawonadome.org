import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as Firebase from '../data/Firebase';
import { makeStore } from '.';
import { selectAlert } from './alertSlice';
import {
  authStateChanged,
  login,
  logout,
  selectIsLoggedIn,
  selectUser,
} from './authSlice';
import { fetchUserData, selectUserData } from './dataSlice';

vi.mock('../data/Firebase', () => ({
  onAuthChanged: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  getUserData: vi.fn(),
}));

const user = { uid: '1', email: 'pat@example.com', displayName: 'Pat Doe' };

describe('store', () => {
  let store;

  beforeEach(() => {
    vi.resetAllMocks();
    store = makeStore();
  });

  it('is logged out until auth initializes', () => {
    expect(selectIsLoggedIn(store.getState())).toBe(false);
    store.dispatch(authStateChanged(user));
    expect(selectIsLoggedIn(store.getState())).toBe(true);
  });

  it('stores a serializable user and shows an alert on login', async () => {
    Firebase.login.mockResolvedValue({ user: { ...user, extra: () => {} } });
    store.dispatch(authStateChanged(null));

    await store.dispatch(login({ email: user.email, password: 'pw' }));

    expect(selectUser(store.getState())).toEqual(user);
    expect(selectAlert(store.getState())).toMatchObject({
      open: true,
      variant: 'success',
    });
  });

  it('shows the error message when login fails', async () => {
    Firebase.login.mockRejectedValue(new Error('Wrong password'));

    await store.dispatch(login({ email: user.email, password: 'pw' }));

    expect(selectAlert(store.getState())).toMatchObject({
      open: true,
      message: 'Wrong password',
      variant: 'error',
    });
  });

  it('fetches user data once and clears it on logout', async () => {
    Firebase.getUserData.mockResolvedValue({ links: { Map: 'https://x' } });
    store.dispatch(authStateChanged(user));

    await Promise.all([
      store.dispatch(fetchUserData(user.email)),
      store.dispatch(fetchUserData(user.email)),
    ]);

    expect(Firebase.getUserData).toHaveBeenCalledTimes(1);
    expect(selectUserData(store.getState(), user.email)).toEqual({
      status: 'complete',
      data: { links: { Map: 'https://x' } },
    });

    await store.dispatch(logout());

    expect(selectUser(store.getState())).toBeNull();
    expect(selectUserData(store.getState(), user.email).status).toBe('idle');
  });

  it('completes the fetch when a member has no data', async () => {
    Firebase.getUserData.mockResolvedValue(null);

    await store.dispatch(fetchUserData(user.email));

    expect(selectUserData(store.getState(), user.email)).toEqual({
      status: 'complete',
      data: null,
    });
  });
});
