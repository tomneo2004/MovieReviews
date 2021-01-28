import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
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
      main: 'rgba(235,235,235,0.6)'
    },
    trendingBackdrop:{
      main: 'rgba(235,235,235,0.6)'
    },
  },
});

export default responsiveFontSizes(theme);