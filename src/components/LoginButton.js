import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';

import { withStyles } from '@material-ui/core/styles';
import {
  login,
  closeLoginDialog,
  openLoginDialog,
  resetPassword,
} from '../actions/AuthActions';
import {
  getLoginPending,
  getInitialized,
  getDialogIsOpen,
} from '../selectors/AuthSelectors';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Tooltip,
} from '@material-ui/core';
import ValidatedTextField from './ValidatedTextField';
import { emailRegex } from '../data/Constants';

const styles = theme => ({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    position: 'relative',
  },
  icon: {
    marginLeft: '8px',
    width: '32px',
    height: '32px',
  },
  loginTextField: {
    width: '100%',
  },
  spacer: {
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
});

class LoginButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      valid: false,
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  onChangeEmail({ target: { value } }) {
    this.setState({ email: value });
  }

  validateEmail(email) {
    if (email === '') {
      return 'Email required';
    }
    if (!emailRegex.test(email.toLowerCase())) {
      return 'Invalid email';
    }
  }

  onChangePassword({ target: { value } }) {
    this.setState({ password: value });
  }

  validatePassword(password) {
    if (password === '') {
      return 'Password required';
    }
  }

  tooltip({ condition, message, component }) {
    if (!condition) {
      return component;
    }
    return (
      <Tooltip placement='top' title={message}>
        {component}
      </Tooltip>
    );
  }

  renderLoginDialog() {
    const {
      closeLoginDialog,
      dialogOpen,
      classes,
      loading,
      login,
      history,
      resetPassword,
    } = this.props;
    const { email, password } = this.state;
    const valid =
      email &&
      password &&
      !(this.validateEmail(email) || this.validatePassword(email));
    return (
      <Dialog
        maxWidth={'sm'}
        fullWidth
        onClose={loading ? () => {} : closeLoginDialog}
        open={dialogOpen}>
        <DialogTitle>Log in</DialogTitle>
        <DialogContent>
          <ValidatedTextField
            autoFocus
            className={classes.loginTextField}
            placeholder='Email address'
            value={email}
            onChange={this.onChangeEmail}
            validate={this.validateEmail}
          />
        </DialogContent>
        <DialogContent>
          <div className={classes.row}>
            <ValidatedTextField
              className={classes.loginTextField}
              placeholder='Password'
              value={password}
              type='password'
              onChange={this.onChangePassword}
              validate={this.validatePassword}
            />
          </div>
        </DialogContent>
        <DialogActions>
          {this.tooltip({
            condition: this.validateEmail(email),
            message: 'Enter a valid email',
            component: (
              <div disabled={this.validateEmail(email)}>
                <Button
                  disabled={!!this.validateEmail(email)}
                  onClick={() => resetPassword(email)}
                  style={{ flexShrink: 0 }}>
                  Forgot Password
                </Button>
              </div>
            ),
          })}
          <Button onClick={closeLoginDialog} disabled={loading}>
            Cancel
          </Button>
          <div className={classes.wrapper}>
            <Button
              disabled={!valid || loading}
              onClick={() =>
                login({
                  email,
                  password,
                  then: () => {
                    closeLoginDialog();
                    history.replace('/members');
                  },
                })
              }>
              Log in
            </Button>
            {loading && (
              <CircularProgress
                className={classes.buttonProgress}
                size={24}
                color='primary'
              />
            )}
          </div>
        </DialogActions>
      </Dialog>
    );
  }

  render() {
    const { loading, classes, dialogOpen, openLoginDialog } = this.props;
    return (
      <div className={classes.wrapper}>
        <Button disabled={loading} color='secondary' onClick={openLoginDialog}>
          Log in
          <AccountIcon className={classes.icon} />
        </Button>
        {loading && (
          <CircularProgress
            className={classes.buttonProgress}
            size={24}
            color='secondary'
          />
        )}
        {dialogOpen && this.renderLoginDialog()}
      </div>
    );
  }
}

LoginButton.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: getLoginPending(state) || !getInitialized(state),
  dialogOpen: getDialogIsOpen(state),
});

const mapDispatchToProps = {
  login,
  closeLoginDialog,
  openLoginDialog,
  resetPassword,
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(LoginButton),
  ),
);
