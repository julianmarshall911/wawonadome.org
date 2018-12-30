'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import { getIsOpen, getMessage, getVariant } from '../selectors/AlertSelectors';
import { closeAlert } from '../actions/AlertActions';
import { withStyles, SnackbarContent } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  error: {
    backgroundColor: '#a00',
  },
  success: {
    backgroundColor: '#194F11',
  },
});

class Alert extends Component {
  render() {
    const {
      message,
      open,
      closeAlert,
      classes,
      className,
      variant,
    } = this.props;
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={closeAlert}>
        <SnackbarContent
          className={classNames(classes[variant], className)}
          message={message}
        />
      </Snackbar>
    );
  }
}

Alert.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'error']),
};

const mapStateToProps = state => ({
  open: getIsOpen(state),
  message: getMessage(state),
  variant: getVariant(state),
});

const mapDispatchToProps = {
  closeAlert,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Alert),
);
