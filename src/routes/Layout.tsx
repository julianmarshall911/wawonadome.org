import { RouterProvider as AriaRouterProvider } from 'react-aria-components';
import { Outlet, useHref, useNavigate } from 'react-router';

import Alert from '../components/Alert';
import CabinBar from '../components/CabinBar';

export default function Layout() {
  const navigate = useNavigate();
  return (
    // Lets React Aria links and menu items navigate client-side.
    <AriaRouterProvider
      navigate={(to, options) => void navigate(to, options)}
      useHref={useHref}>
      <CabinBar />
      <Outlet />
      <Alert />
    </AriaRouterProvider>
  );
}
