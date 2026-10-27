import { useState } from 'react';
import {
  Dialog,
  Form,
  Heading,
  Modal,
  ModalOverlay,
} from 'react-aria-components';
import { useNavigate } from 'react-router';

import Button from './Button';
import Icon from './Icon';
import TextField from './TextField';
import { emailRegex } from '../data/Constants';
import { showAlert } from '../store/alertSlice';
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
import styles from './LoginButton.module.css';

const validateEmail = (email: string) => {
  if (email === '') {
    return 'Enter your email address.';
  }
  if (!emailRegex.test(email.toLowerCase())) {
    return 'Enter a full email address, like pat@wawonadome.org.';
  }
};

const validatePassword = (password: string) => {
  if (password === '') {
    return 'Enter your password.';
  }
};

function LoginDialog() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const open = useAppSelector(selectLoginDialogOpen);
  const pending = useAppSelector(selectLoginPending);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const close = () => dispatch(closeLoginDialog());

  const submit = async () => {
    try {
      await dispatch(login({ email, password })).unwrap();
      await navigate('/members', { replace: true });
    } catch {
      // The error is shown by the alert slice.
    }
  };

  const forgotPassword = () => {
    if (validateEmail(email)) {
      dispatch(
        showAlert(
          'Enter your email address above, then choose Forgot password.',
          'error',
        ),
      );
      return;
    }
    void dispatch(resetPassword(email));
  };

  return (
    <ModalOverlay
      isOpen={open}
      onOpenChange={isOpen => !isOpen && close()}
      isDismissable={!pending}
      isKeyboardDismissDisabled={pending}
      className={styles.overlay}>
      <Modal className={styles.modal}>
        <Dialog className={styles.dialog}>
          <Heading slot='title' className={styles.title}>
            Log in
          </Heading>
          <Form
            onSubmit={event => {
              event.preventDefault();
              if (!pending) {
                void submit();
              }
            }}>
            <div className={styles.body}>
              <TextField
                autoFocus
                name='email'
                type='email'
                label='Email address'
                autoComplete='username'
                value={email}
                onChange={setEmail}
                validate={validateEmail}
              />
              <TextField
                name='password'
                type='password'
                label='Password'
                autoComplete='current-password'
                value={password}
                onChange={setPassword}
                validate={validatePassword}
              />
            </div>
            <div className={styles.actions}>
              <Button
                variant='quiet'
                className={styles.forgot}
                isDisabled={pending}
                onPress={forgotPassword}>
                Forgot password
              </Button>
              <Button variant='secondary' isDisabled={pending} onPress={close}>
                Cancel
              </Button>
              <Button variant='primary' type='submit' isPending={pending}>
                Log in
              </Button>
            </div>
          </Form>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}

export default function LoginButton() {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectAuthInitialized);
  const pending = useAppSelector(selectLoginPending);
  return (
    <>
      <Button
        variant='beam'
        isPending={pending || !initialized}
        onPress={() => dispatch(openLoginDialog())}>
        Log in
        <Icon name='account' size={20} />
      </Button>
      <LoginDialog />
    </>
  );
}
