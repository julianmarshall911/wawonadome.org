import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';

import PageProgress from '../components/PageProgress';
import { showAlert } from '../store/alertSlice';
import { selectAuthInitialized, selectIsLoggedIn } from '../store/authSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function RequireAuth() {
  const dispatch = useAppDispatch();
  const initialized = useAppSelector(selectAuthInitialized);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const denied = initialized && !isLoggedIn;

  useEffect(() => {
    if (denied) {
      dispatch(showAlert('Log in to access the members section', 'error'));
    }
  }, [denied, dispatch]);

  if (!initialized) {
    return <PageProgress />;
  }
  if (denied) {
    return <Navigate to='/' replace />;
  }
  return <Outlet />;
}
