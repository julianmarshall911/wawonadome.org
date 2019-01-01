'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

export default class ValidatedTextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationMessage: undefined,
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.props.onChange && this.props.onChange(event);
    const value = event.target.value;
    this.state.timeout && clearTimeout(this.state.timeout);
    this.setState({
      timeout: setTimeout(
        () =>
          this.setState({
            validationMessage: this.props.validate(value),
          }),
        250,
      ),
    });
  }

  render() {
    const { validate, onChange, error, label, ...rest } = this.props;
    const { validationMessage } = this.state;
    return (
      <TextField
        label={validationMessage}
        error={!!validationMessage ? true : undefined}
        onChange={this.onChange}
        {...rest}
      />
    );
  }
}

ValidatedTextField.defaultProps = {
  validate: value => {},
};

ValidatedTextField.propTypes = {
  ...TextField.propTypes,
  validate: PropTypes.func,
};
