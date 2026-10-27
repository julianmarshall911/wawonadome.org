import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import '@fontsource/zilla-slab/600.css';
import '@fontsource/zilla-slab/700.css';
import '@fontsource/alegreya/400.css';
import '@fontsource/alegreya/400-italic.css';
import '@fontsource/cabin-condensed/500.css';
import '@fontsource/cabin-condensed/600.css';
import './styles/tokens.css';
import './styles/global.css';

import { store } from './store';
import { listenForAuthChanges } from './store/authSlice';
import { router } from './routes/router';

store.dispatch(listenForAuthChanges());

const root = document.getElementById('root');
if (!root) {
  throw new Error('Missing #root element');
}

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
