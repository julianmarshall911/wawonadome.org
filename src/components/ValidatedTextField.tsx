import { useEffect, useState } from 'react';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

const VALIDATION_DELAY_MS = 250;

type ValidatedTextFieldProps = TextFieldProps & {
  value: string;
  // Returns an error message, or undefined when the value is valid.
  validate?: (value: string) => string | undefined;
};

// A TextField that validates its value shortly after the user stops typing.
export default function ValidatedTextField({
  value,
  validate,
  onChange,
  helperText,
  ...rest
}: ValidatedTextFieldProps) {
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (!dirty || !validate) {
      return;
    }
    const timeout = setTimeout(
      () => setMessage(validate(value)),
      VALIDATION_DELAY_MS,
    );
    return () => clearTimeout(timeout);
  }, [dirty, validate, value]);

  return (
    <TextField
      value={value}
      error={!!message}
      helperText={message ?? helperText}
      onChange={event => {
        setDirty(true);
        onChange?.(event);
      }}
      {...rest}
    />
  );
}
