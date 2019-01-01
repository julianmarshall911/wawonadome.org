'use es6';

import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-cabin-condensed';

import { Provider } from 'react-redux';
import { store } from './stores/ReduxStore';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import * as serviceWorker from './serviceWorker';

import Routes from './routes/Routes';

require('dotenv').config();

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'Cabin Condensed',
  },
  palette: {
    primary: {
      main: '#194F11',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: '#fff8',
    },
    error: {
      main: '#f00',
    },
    text: {
      disabled: '#aaaaaaaa',
    },
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Routes />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
);

serviceWorker.register();
