
import './scss/App.scss'
import LandingPage from './pages/landing/landing';
import ButtonAppBar from './pages/header/header'
import OptikonFooter from './pages/footer/footer'
import { navLinks } from './models/dashboard'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import React from 'react';

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
  const headerContent: navLinks[] = [
    {
      title: "Markets",
      url: '/markets'
    },
    { title: "Scanner", url: "/scanner" },
    { title: "Watchlist", url: "/watchlist" },
    { title: "Chart", url: "/chart" },
    { title: "Support", url: "/support" }];

  return (
    <>
    <ThemeProvider theme={theme}>
      <LandingPage />
    </ThemeProvider>
    </>
  )
}

export default App
