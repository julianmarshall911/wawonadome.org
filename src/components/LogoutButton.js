import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
  withStyles,
} from '@material-ui/core';

import { logout } from '../actions/AuthActions';
import { getLogoutPending, getUser } from '../selectors/AuthSelectors';

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
  },
  photo: {
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

class UserButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: undefined,
    };
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
    const { loading, classes, user } = this.props;
    return (
      <div
        className={classes.wrapper}
        onClick={({ currentTarget }) => {
          if (!this.state.anchorEl) this.setMenu(currentTarget);
        }}>
        <Typography variant='h6' className={classes.text}>
          Hi {(user.displayName || '').split(' ')[0]}
          <img
            src={user.photoURL}
            className={classes.photo}
            alt='User Profile'
          />
        </Typography>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
        <div />
        {this.renderUserMenu()}
      </div>
    );
  }
}

UserButton.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: getLogoutPending(state),
  user: getUser(state),
});

const mapDispatchToProps = {
  logout,
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(UserButton),
  ),
);
