import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33a095',
      main: '#00897B',
      dark: '#005f56',
      contrastText: '#fff',
    },
    secondary: {
      light: '#791a20',
      main: '#ad262e',
      dark: '#bd5157',
      contrastText: '#fff',
    },
  },
  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        background: '#4db6ac',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
});

export default theme