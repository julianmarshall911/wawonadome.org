import { useEffect } from 'react';
import { Menu, MenuItem, MenuTrigger, Popover } from 'react-aria-components';
import { useLocation, useNavigate } from 'react-router';

import Button from './Button';
import Icon from './Icon';
import {
  type AuthUser,
  logout,
  selectLogoutPending,
  selectUser,
} from '../store/authSlice';
import { fetchUserData, selectUserData } from '../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import styles from './ProfileButton.module.css';

interface MenuEntry {
  id: string;
  label: string;
  href?: string;
}

export default function ProfileButton() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // Only rendered while logged in.
  const user = useAppSelector(selectUser) as AuthUser;
  const logoutPending = useAppSelector(selectLogoutPending);
  const { status, data } = useAppSelector(state =>
    selectUserData(state, user.email),
  );

  useEffect(() => {
    void dispatch(fetchUserData(user.email));
  }, [dispatch, user.email]);

  const entries: MenuEntry[] = [
    { id: 'members', label: 'My page', href: '/members' },
    { id: 'home', label: 'Home page', href: '/' },
    { id: 'logout', label: 'Log out' },
  ].filter(entry => entry.href !== pathname);

  const handleAction = (key: React.Key) => {
    if (key === 'logout') {
      // Leave the members page first so it doesn't flash a "log in" error.
      void navigate('/');
      void dispatch(logout());
    }
  };

  const firstName = data?.displayName?.split(' ')[0];

  return (
    <MenuTrigger>
      <Button
        variant='beam'
        className={styles.trigger}
        isPending={logoutPending || status === 'pending'}>
        {firstName ? `Hi ${firstName}` : 'Menu'}
        <Icon name='chevronDown' size={20} />
      </Button>
      <Popover placement='bottom end' offset={6} className={styles.popover}>
        <Menu items={entries} onAction={handleAction} className={styles.menu}>
          {entry => (
            <MenuItem id={entry.id} href={entry.href} className={styles.item}>
              {entry.label}
            </MenuItem>
          )}
        </Menu>
      </Popover>
    </MenuTrigger>
  );
}
