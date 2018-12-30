import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';

import logo from '../data/img/logo.svg';

import { getIsLoggedIn, getInitialized } from '../selectors/AuthSelectors';

const styles = {
  grow: {
    flexGrow: 1,
  },
  flexRow: {
    flexGrow: 0,
    display: 'flex',
    flexDirection: 'row',
  },
  loader: {
    marginRight: '8px',
  },
  logo: {
    cursor: 'pointer',
    marginTop: '4px',
    width: '36px',
    height: '36px',
  },
};

class NavBar extends Component {
  render() {
    const { history, classes, isLoggedIn } = this.props;
    return (
      <AppBar position='fixed'>
        <Toolbar>
          <div className={classes.grow}>
            <img
              src={logo}
              alt='logo'
              className={classes.logo}
              onClick={() => history.push('/')}
            />
          </div>
          {isLoggedIn ? <LogoutButton /> : <LoginButton />}
        </Toolbar>
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
  initialized: getInitialized(state),
});

export default withStyles(styles)(
  withRouter(
    connect(
      mapStateToProps,
      null,
    )(NavBar),
  ),
);
