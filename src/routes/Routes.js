import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import HomePage from '../containers/HomePage';
import MembersPage from '../containers/MembersPage';
import NavBar from '../components/NavBar';
import Alert from '../components/Alert';

const HomepageRedirect = () => <Redirect to={{ pathname: '/' }} />;

const Routes = () => (
  <Router>
    <div>
      <NavBar />
      <Switch>
        <Route path='/' exact component={HomePage} />
        <PrivateRoute path='/members' component={MembersPage} />
        <Route component={HomepageRedirect} />
      </Switch>
      <Alert />
    </div>
  </Router>
);

export default Routes;
