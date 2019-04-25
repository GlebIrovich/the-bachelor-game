import { createMuiTheme } from '@material-ui/core/styles';

import { DARK_CORAL, EGG_SHELL, TAUPE_GRAY } from './colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: DARK_CORAL,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: TAUPE_GRAY,
      light: EGG_SHELL,
      // contrastText: '#616161',
      // dark: will be calculated from palette.secondary.main,
    },
    // error: will use the default color
  },
  typography: {
    fontFamily: 'Underdog',
  },
});