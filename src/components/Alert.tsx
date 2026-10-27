import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import {
  type AlertVariant,
  closeAlert,
  selectAlert,
} from '../store/alertSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const backgroundColors: Record<AlertVariant, string> = {
  error: '#a00',
  success: '#194F11',
};

export default function Alert() {
  const dispatch = useAppDispatch();
  const { open, message, variant } = useAppSelector(selectAlert);
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
