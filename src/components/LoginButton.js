import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Button from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import AccountIcon from '@material-ui/icons/AccountCircleOutlined';

import { withStyles } from '@material-ui/core/styles';
import { login } from '../actions/AuthActions';
import { getLoginPending, getInitialized } from '../selectors/AuthSelectors';

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
});

class LoginButton extends Component {
  render() {
    const { loading, login, classes, history } = this.props;
    return (
      <div className={classes.wrapper}>
        <Button
          disabled={loading}
          color='secondary'
          onClick={() => login(() => history.push('/members'))}>
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
      </div>
    );
  }
}

LoginButton.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: getLoginPending(state) || !getInitialized(state),
});

const mapDispatchToProps = {
  login,
};

export default withRouter(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(LoginButton),
  ),
);
