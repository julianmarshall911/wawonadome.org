import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

import PageProgress from '../components/PageProgress';
import { showAlert } from '../store/alertSlice';
import { selectAuthInitialized, selectIsLoggedIn } from '../store/authSlice';

export default function RequireAuth() {
  const dispatch = useDispatch();
  const initialized = useSelector(selectAuthInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);
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
