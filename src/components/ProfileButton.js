import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  Button,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
  withStyles,
} from '@material-ui/core';

import { logout } from '../actions/AuthActions';
import { getLogoutPending, getUser } from '../selectors/AuthSelectors';
import {
  getLoggedInUserData,
  getUserDataFetchUninitialized,
  getUserDataFetchPending,
} from '../selectors/DataSelectors';
import { fetchUserData } from '../actions/DataActions';
import { AccountCircle } from '@material-ui/icons';

const styles = theme => ({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    cursor: 'pointer',
    position: 'relative',
    textTransform: 'capitalize',
  },
  icon: {
    marginBottom: '-8px',
    marginLeft: '8px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
  },
  text: {
    color: '#fff',
  },
});

class ProfileButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: undefined,
    };
  }

  componentWillMount() {
    const { userDataFetchUninitialized, fetchUserData, user } = this.props;
    if (userDataFetchUninitialized) {
      fetchUserData(user.email);
    }
  }

  setMenu(anchorEl) {
    this.setState({ anchorEl });
  }

  closeAnd(fn = () => {}) {
    return () => this.setState({ anchorEl: undefined }, fn);
  }

  renderUserMenu() {
    const { logout, history } = this.props;
    return (
      <Menu
        anchorEl={this.state.anchorEl}
        open={!!this.state.anchorEl}
        onClose={this.closeAnd()}>
        {history.location.pathname !== '/members' && (
          <MenuItem onClick={this.closeAnd(() => history.push('/members'))}>
            My page
          </MenuItem>
        )}
        {history.location.pathname !== '/' && (
          <MenuItem onClick={this.closeAnd(() => history.push('/'))}>
            Home page
          </MenuItem>
        )}
        <MenuItem
          onClick={this.closeAnd(() => logout(() => history.push('/')))}>
          Log out
        </MenuItem>
      </Menu>
    );
  }

  render() {
    const { loading, classes, myData, userDataFetchPending } = this.props;
    return (
      <Button
        disabled={loading || userDataFetchPending}
        className={classes.wrapper}
        onClick={({ currentTarget }) => {
          if (!this.state.anchorEl) this.setMenu(currentTarget);
        }}>
        <Typography variant='h6' className={classes.text}>
          Hi {myData && (myData.displayName || '').split(' ')[0]}
          <AccountCircle className={classes.icon} />
        </Typography>
        {(loading || userDataFetchPending) && (
          <CircularProgress
            size={24}
            className={classes.buttonProgress}
            color='secondary'
          />
        )}
        {this.renderUserMenu()}
      </Button>
    );
  }
}

ProfileButton.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: getLogoutPending(state),
  user: getUser(state),
  myData: getLoggedInUserData(state),
  userDataFetchUninitialized: getUserDataFetchUninitialized(state),
  userDataFetchPending: getUserDataFetchPending(state),
});

const mapDispatchToProps = {
  logout,
  fetchUserData,
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(ProfileButton),
  ),
);
