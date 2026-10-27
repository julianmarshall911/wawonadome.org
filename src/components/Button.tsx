import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from 'react-aria-components';

import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'quiet' | 'beam';

interface ButtonProps extends Omit<AriaButtonProps, 'className' | 'children'> {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = 'quiet',
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <AriaButton
      {...rest}
      className={[styles.button, styles[variant], className]
        .filter(Boolean)
        .join(' ')}>
      {children}
      {rest.isPending && <span className={styles.spinner} aria-hidden='true' />}
    </AriaButton>
  );
}
