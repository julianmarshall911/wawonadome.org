import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

const VALIDATION_DELAY_MS = 250;

// A TextField that validates its value shortly after the user stops typing.
// `validate` returns an error message, or undefined when the value is valid.
export default function ValidatedTextField({
  value,
  validate,
  onChange,
  helperText,
  ...rest
}) {
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState();

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
