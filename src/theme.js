import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Cabin Condensed", sans-serif',
  },
  palette: {
    primary: {
      main: '#194F11',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fff',
      contrastText: '#fff8',
    },
    error: {
      main: '#f00',
    },
    text: {
      disabled: '#aaaaaaaa',
    },
  },
});

export default theme;
