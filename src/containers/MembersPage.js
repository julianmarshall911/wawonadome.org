import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { getUser } from '../selectors/AuthSelectors';

import banner from '../data/img/member_banner.jpg';
import { Tabs, Tab, AppBar, CircularProgress, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import {
  getLoggedInUserData,
  getGroupUserData,
} from '../selectors/DataSelectors';
import { fetchUserData } from '../actions/DataActions';

import { mapLinkToIcon } from '../data/IconMapper';

const styles = theme => ({
  page: {
    paddingTop: '64px',
  },
  bannerContainer: {},
  banner: { width: '100vw' },
  buttonGrid: {
    margin: '24px',
  },
  buttonIcon: {
    width: '72px',
    height: '72px',
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'middle',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'middle',
  },
  button: {
    width: '128px',
    height: '128px',
  },
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

class MembersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
    };

    this.selectTab = this.selectTab.bind(this);
  }

  componentWillMount() {
    const { myData, groupData, user, fetchUserData } = this.props;
    if (!myData) {
      fetchUserData(user.displayName);
    }
    if (!groupData) {
      fetchUserData('Wassociates');
    }
  }

  selectTab(event, value) {
    this.setState({ tab: value });
  }

  getTabColor(idx) {
    if (idx === this.state.tab) {
      return '#fff';
    }
    return '#fff9';
  }

  getTab(idx, label) {
    return (
      <Tab
        label={<span style={{ color: this.getTabColor(idx) }}>{label}</span>}
      />
    );
  }

  renderLinks(data) {
    const { classes } = this.props;
    if (!data) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress color='primary' className={classes.progress} />
        </div>
      );
    }
    return (
      <Grid
        container
        justify='center'
        className={classes.buttonGrid}
        spacing={8}>
        {Object.keys(data.links).map(key => {
          const Icon = mapLinkToIcon(key);
          return (
            <Grid item container xs={12} sm={6} md={4} lg={3} key={key}>
              <Button
                onClick={() => window.open(data.links[key])}
                className={classes.button}>
                <Grid container direction='column' alignContent='center'>
                  <Grid item>
                    <Icon size={96} className={classes.buttonIcon} />
                  </Grid>
                  <Grid item>{key}</Grid>
                </Grid>
              </Button>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  renderMyLinks() {
    return this.renderLinks(this.props.myData);
  }

  renderGroupLinks() {
    return this.renderLinks(this.props.groupData);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.page}>
        <img src={banner} alt={banner} className={classes.banner} />
        <AppBar position='static'>
          <Tabs
            centered
            value={this.state.tab}
            onChange={this.selectTab}
            indicatorColor='secondary'
            textColor='secondary'>
            {this.getTab(0, 'My Links')}
            {this.getTab(1, 'Group Links')}
          </Tabs>
        </AppBar>
        {this.state.tab === 0 && this.renderMyLinks()}
        {this.state.tab === 1 && this.renderGroupLinks()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  myData: getLoggedInUserData(state),
  groupData: getGroupUserData(state),
});

const mapDispatchToProps = {
  fetchUserData,
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MembersPage),
);
