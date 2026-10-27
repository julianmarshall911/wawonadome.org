import { useDispatch, useSelector } from 'react-redux';

import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import { closeAlert, selectAlert } from '../store/alertSlice';

const backgroundColors = {
  error: '#a00',
  success: '#194F11',
};

export default function Alert() {
  const dispatch = useDispatch();
  const { open, message, variant } = useSelector(selectAlert);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      onClose={() => dispatch(closeAlert())}>
      <SnackbarContent
        sx={{ backgroundColor: backgroundColors[variant], color: '#fff' }}
        message={message}
      />
    </Snackbar>
  );
}
