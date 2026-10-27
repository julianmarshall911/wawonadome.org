import { Link } from 'react-router';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import logo from '../data/img/logo.svg';
import { selectIsLoggedIn } from '../store/authSlice';
import { useAppSelector } from '../store/hooks';

export default function NavBar() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <AppBar position='fixed'>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link to='/' style={{ display: 'inline-flex' }}>
            <img src={logo} alt='Wassociates home' width={36} height={36} />
          </Link>
        </Box>
        {isLoggedIn ? <ProfileButton /> : <LoginButton />}
      </Toolbar>
    </AppBar>
  );
}
