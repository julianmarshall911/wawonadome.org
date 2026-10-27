import {
  FieldError,
  Input,
  Label,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';

import styles from './TextField.module.css';

interface TextFieldProps extends Omit<AriaTextFieldProps, 'className'> {
  label: string;
  placeholder?: string;
}

// A labelled text input. Validation errors show after the form is submitted
// and then update as the person types (React Aria's native behavior).
export default function TextField({
  label,
  placeholder,
  ...rest
}: TextFieldProps) {
  return (
    <AriaTextField {...rest} className={styles.field}>
      <Label className={styles.label}>{label}</Label>
      <Input className={styles.input} placeholder={placeholder} />
      <FieldError className={styles.error} />
    </AriaTextField>
  );
}
