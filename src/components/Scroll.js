'use es6';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
  scroll: {
    color: '#fff',
    opacity: '0.8',
    background: '#000',
    padding: '10px',
    borderRadius: '32px',
    width: 'max-content',
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
  },
  scrollText: {
    marginLeft: '12px',
  },
  arrowDown: {
    marginBottom: -8,
    width: '32px',
    height: '32px',
  },
});

class Scroll extends Component {
  constructor(props) {
    super(props);

    this.scroll = this.scroll.bind(this);
  }

  scroll() {
    window.scrollTo({
      top: this.props.to.current.offsetTop,
      behavior: 'smooth',
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.scroll} onClick={this.scroll}>
        <Typography className={classes.scrollText} color='inherit' variant='h5'>
          See More <ArrowDownIcon className={classes.arrowDown} />
        </Typography>
      </div>
    );
  }
}

Scroll.propTypes = {
  to: PropTypes.object.isRequired,
};

export default withStyles(styles)(Scroll);
