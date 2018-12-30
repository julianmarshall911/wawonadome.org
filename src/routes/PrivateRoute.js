import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import { getIsLoggedIn, getInitialized } from '../selectors/AuthSelectors';
import { displayAlert } from '../actions/AlertActions';

const styles = theme => ({
  progressWrapper: {
    width: '100vh',
    height: '100vh',
    justifyContent: 'middle',
    alignItems: 'middle',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class PrivateRoute extends Component {
  componentWillReceiveProps(newProps) {
    if (!newProps.loading && !newProps.isAuthenticated) {
      newProps.displayAlert({
        message: 'Log in to access the members section',
        variant: 'error',
      });
    }
  }
  render() {
    const {
      component: Component,
      classes,
      loading,
      isAuthenticated,
      displayAlert,
      ...rest
    } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (loading) {
            return (
              <div className={classes.progressWrapper}>
                <CircularProgress
                  color='primary'
                  className={classes.progress}
                />
              </div>
            );
          }
          if (!isAuthenticated) {
            return <Redirect to='/' />;
          }
          return <Component {...props} />;
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: !getInitialized(state),
  isAuthenticated: getIsLoggedIn(state),
});

const mapDispatchToProps = {
  displayAlert,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PrivateRoute),
);
