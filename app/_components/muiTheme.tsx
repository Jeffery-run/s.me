'use client';

import React, { memo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: 'background-color:rgba(38, 38, 38, 0.8);',
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: 'width:100%;',
      },
    },
  },
});

const muiTheme = memo(({ children } : { children:React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
));

export default muiTheme;
