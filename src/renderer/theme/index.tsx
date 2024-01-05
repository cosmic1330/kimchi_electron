import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import components from './components';
import { lightPalette } from './pattern';
import typography from './typography';
import { ThemeConfigProps } from './types';
import custom from './custom';

export default function MuiTheme({ children }: ThemeConfigProps) {
  const theme = useMemo(
    () => ({
      custom,
      components,
      typography,
      palette: lightPalette,
    }),
    [],
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(theme)}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
