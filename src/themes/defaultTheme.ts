import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

//Color scheme
const primaryMain = '#556cd6';
const primaryDark = '#1C3AC4';
const primaryLight = '#c5c9eb';

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
    MuiCssBaseline:{
      '@global':{
        html:{height:'100vh'},
        body:{height:'100%'},
      }
    },
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