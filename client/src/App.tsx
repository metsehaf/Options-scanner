
import './scss/App.scss'
import LandingPage from './app/landing/page';
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import React from 'react';
import { ErrorProvider } from './contexts/errorContext';
import { EnvironmentsProvider } from './contexts/environmentsContext';
import ErrorBoundary  from './ErrorBoundary';

export const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#4B0082',
      },
      secondary: {
        main: '#39FF14'
      }
    }
  })

  return (
    <>
      <EnvironmentsProvider>
        <ErrorProvider>
          <ErrorBoundary>
          <ThemeProvider theme={theme}>
            <LandingPage />
          </ThemeProvider>
          </ErrorBoundary>
        </ErrorProvider>
      </EnvironmentsProvider>
    </>
  )
}

export default App
