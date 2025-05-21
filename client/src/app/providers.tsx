// app/providers.tsx
'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ErrorProvider } from '@contexts/errorContext';
import { EnvironmentsProvider } from '@contexts/environmentsContext';
import ErrorBoundary  from '../ErrorBoundary';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4B0082',
    },
    secondary: {
      main: '#39FF14',
    },
  },
});

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
        <ErrorProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ErrorProvider>
    </ThemeProvider>
  );
}
