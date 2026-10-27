import { Outlet } from 'react-router';

import Alert from '../components/Alert';
import NavBar from '../components/NavBar';

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Alert />
    </>
  );
}
