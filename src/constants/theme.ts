import { createMuiTheme } from '@material-ui/core/styles';

import { IVORY_WHITE, PRIMARY_LIGHT } from './colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: IVORY_WHITE,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: PRIMARY_LIGHT,
      // dark: will be calculated from palette.secondary.main,
    },
    // error: will use the default color
  },
  typography: {
    fontFamily: 'Montserrat Alternates',
  },
});