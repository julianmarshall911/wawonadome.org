import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';

import {
  type AuthUser,
  logout,
  selectLogoutPending,
  selectUser,
} from '../store/authSlice';
import { fetchUserData, selectUserData } from '../store/dataSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    void dispatch(fetchUserData(user.email));
  }, [dispatch, user.email]);

  const closeMenu = () => setAnchorEl(null);
  const goTo = (path: string) => () => {
    closeMenu();
    void navigate(path);
  };
  const handleLogout = () => {
    closeMenu();
    // Leave the members page first so it doesn't flash a "log in" error.
    void navigate('/');
    void dispatch(logout());
  };

  const firstName = data?.displayName?.split(' ')[0] ?? '';

  return (
    <>
      <Button
        color='secondary'
        loading={logoutPending || status === 'pending'}
        loadingPosition='end'
        endIcon={<AccountCircle sx={{ width: 32, height: 32 }} />}
        aria-haspopup='menu'
        aria-expanded={!!anchorEl}
        onClick={event => setAnchorEl(event.currentTarget)}
        sx={{ textTransform: 'capitalize' }}>
        <Typography variant='h6' component='span' sx={{ color: '#fff' }}>
          Hi {firstName}
        </Typography>
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeMenu}>
        {pathname !== '/members' && (
          <MenuItem onClick={goTo('/members')}>My page</MenuItem>
        )}
        {pathname !== '/' && <MenuItem onClick={goTo('/')}>Home page</MenuItem>}
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </>
  );
}
