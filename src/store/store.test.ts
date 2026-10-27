import type { UserCredential } from 'firebase/auth';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as Firebase from '../data/Firebase';
import { type AppStore, makeStore } from '.';
import { selectAlert } from './alertSlice';
import {
  type AuthUser,
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

const user: AuthUser = {
  uid: '1',
  email: 'pat@example.com',
  displayName: 'Pat Doe',
};

describe('store', () => {
  let store: AppStore;

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
    vi.mocked(Firebase.login).mockResolvedValue({
      user: { ...user, getIdToken: () => Promise.resolve('token') },
    } as unknown as UserCredential);
    store.dispatch(authStateChanged(null));

    await store.dispatch(login({ email: user.email, password: 'pw' }));

    expect(selectUser(store.getState())).toEqual(user);
    expect(selectAlert(store.getState())).toMatchObject({
      open: true,
      variant: 'success',
    });
  });

  it('shows the error message when login fails', async () => {
    vi.mocked(Firebase.login).mockRejectedValue(new Error('Wrong password'));

    await store.dispatch(login({ email: user.email, password: 'pw' }));

    expect(selectAlert(store.getState())).toMatchObject({
      open: true,
      message: 'Wrong password',
      variant: 'error',
    });
  });

  it('fetches user data once and clears it on logout', async () => {
    const data = { email: user.email, links: { Map: 'https://x' } };
    vi.mocked(Firebase.getUserData).mockResolvedValue(data);
    store.dispatch(authStateChanged(user));

    await Promise.all([
      store.dispatch(fetchUserData(user.email)),
      store.dispatch(fetchUserData(user.email)),
    ]);

    expect(Firebase.getUserData).toHaveBeenCalledTimes(1);
    expect(selectUserData(store.getState(), user.email)).toEqual({
      status: 'complete',
      data,
    });

    await store.dispatch(logout());

    expect(selectUser(store.getState())).toBeNull();
    expect(selectUserData(store.getState(), user.email).status).toBe('idle');
  });

  it('completes the fetch when a member has no data', async () => {
    vi.mocked(Firebase.getUserData).mockResolvedValue(null);

    await store.dispatch(fetchUserData(user.email));

    expect(selectUserData(store.getState(), user.email)).toEqual({
      status: 'complete',
      data: null,
    });
  });
});
