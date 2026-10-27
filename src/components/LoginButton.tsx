import { useState } from 'react';
import { useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import AccountIcon from '@mui/icons-material/AccountCircleOutlined';

import ValidatedTextField from './ValidatedTextField';
import { emailRegex } from '../data/Constants';
import {
  closeLoginDialog,
  login,
  openLoginDialog,
  resetPassword,
  selectAuthInitialized,
  selectLoginDialogOpen,
  selectLoginPending,
} from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const validateEmail = (email: string) => {
  if (email === '') {
    return 'Email required';
  }
  if (!emailRegex.test(email.toLowerCase())) {
    return 'Invalid email';
  }
};

const validatePassword = (password: string) => {
  if (password === '') {
    return 'Password required';
  }
};

function LoginDialog() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const pending = useAppSelector(selectLoginPending);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailError = validateEmail(email);
  const valid = !emailError && !validatePassword(password);
  const close = () => dispatch(closeLoginDialog());

  const submit = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
      await navigate('/members', { replace: true });
    } catch {
      // The error is shown by the alert slice.
    }
  };

  return (
    <Dialog maxWidth='sm' fullWidth open onClose={pending ? undefined : close}>
      <form
        noValidate
        onSubmit={event => {
          event.preventDefault();
          if (valid && !pending) {
            void submit();
          }
        }}>
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>
          <ValidatedTextField
            autoFocus
            fullWidth
            margin='dense'
            label='Email address'
            type='email'
            autoComplete='username'
            value={email}
            onChange={event => setEmail(event.target.value)}
            validate={validateEmail}
          />
          <ValidatedTextField
            fullWidth
            margin='dense'
            label='Password'
            type='password'
            autoComplete='current-password'
            value={password}
            onChange={event => setPassword(event.target.value)}
            validate={validatePassword}
          />
        </DialogContent>
        <DialogActions>
          <Tooltip
            placement='top'
            title={emailError ? 'Enter a valid email' : ''}>
            <span>
              <Button
                disabled={!!emailError || pending}
                onClick={() => void dispatch(resetPassword(email))}>
                Forgot Password
              </Button>
            </span>
          </Tooltip>
          <Button onClick={close} disabled={pending}>
            Cancel
          </Button>
          <Button type='submit' disabled={!valid} loading={pending}>
            Log in
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default function LoginButton() {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectAuthInitialized);
  const pending = useAppSelector(selectLoginPending);
  const dialogOpen = useAppSelector(selectLoginDialogOpen);
  return (
    <Box>
      <Button
        color='secondary'
        loading={pending || !initialized}
        loadingPosition='end'
        onClick={() => dispatch(openLoginDialog())}
        endIcon={<AccountIcon sx={{ width: 32, height: 32 }} />}>
        Log in
      </Button>
      {dialogOpen && <LoginDialog />}
    </Box>
  );
}
