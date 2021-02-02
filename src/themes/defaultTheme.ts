import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

//Color scheme
const primaryMain = '#556cd6';
const primaryDark = '#1C3AC4';
const primaryLight = '#95A4E7';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryMain,
      dark: primaryDark,
      light: primaryLight,
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
  },
  overrides:{
    MuiDivider:{
      root:{
        height:'7px',
        borderRadius: '40%',
        background: `linear-gradient(90deg, 
          #fff, 
          ${primaryMain}, 
          ${primaryDark},
          ${primaryMain}, 
          #fff)`
      }
    },
  }
});

export default responsiveFontSizes(theme);