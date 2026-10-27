import { useEffect } from 'react';
import { Button as AriaButton } from 'react-aria-components';

import Icon from './Icon';
import { closeAlert, selectAlert } from '../store/alertSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import styles from './Alert.module.css';

const SUCCESS_HIDE_MS = 6000;

// A notice in the bottom-right corner. Successes close themselves; errors
// stay until dismissed.
export default function Alert() {
  const dispatch = useAppDispatch();
  const { open, message, variant } = useAppSelector(selectAlert);

  useEffect(() => {
    if (!open || variant !== 'success') {
      return;
    }
    const timeout = setTimeout(() => dispatch(closeAlert()), SUCCESS_HIDE_MS);
    return () => clearTimeout(timeout);
  }, [dispatch, open, variant, message]);

  return (
    <div className={styles.region}>
      {open && (
        <div
          role={variant === 'error' ? 'alert' : 'status'}
          className={`${styles.notice} ${styles[variant]}`}>
          <Icon name={variant === 'error' ? 'warning' : 'check'} size={22} />
          <span className={styles.message}>{message}</span>
          <AriaButton
            className={styles.dismiss}
            onPress={() => dispatch(closeAlert())}>
            Dismiss
          </AriaButton>
        </div>
      )}
    </div>
  );
}
