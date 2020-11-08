import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
    popularBackdrop:{
      main: 'rgba(255,255,255,0.75)'
    },
    trendingBackdrop:{
      main: 'rgba(255,255,255,0.75)'
    },
  },
});

export default theme;