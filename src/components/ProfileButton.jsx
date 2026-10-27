import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { logout, selectLogoutPending, selectUser } from '../store/authSlice';
import { fetchUserData, selectUserData } from '../store/dataSlice';

export default function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector(selectUser);
  const logoutPending = useSelector(selectLogoutPending);
  const { status, data } = useSelector(state =>
    selectUserData(state, user.email),
  );
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    dispatch(fetchUserData(user.email));
  }, [dispatch, user.email]);

  const closeMenu = () => setAnchorEl(null);
  const goTo = path => () => {
    closeMenu();
    navigate(path);
  };
  const handleLogout = () => {
    closeMenu();
    // Leave the members page first so it doesn't flash a "log in" error.
    navigate('/');
    dispatch(logout());
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
