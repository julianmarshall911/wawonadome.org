import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import '@fontsource/cabin-condensed/400.css';
import '@fontsource/cabin-condensed/500.css';
import '@fontsource/cabin-condensed/700.css';

import { store } from './store';
import { listenForAuthChanges } from './store/authSlice';
import { router } from './routes/router';
import theme from './theme';

store.dispatch(listenForAuthChanges());

const root = document.getElementById('root');
if (!root) {
  throw new Error('Missing #root element');
}

createRoot(root).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
