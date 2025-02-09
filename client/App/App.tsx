import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../public/vite.svg'
import './App.css'
import ButtonAppBar from '../pages/header/header'
import { navLinks } from '../models/dashboard'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'

export const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#00A86B',
      }, 
      secondary: {
        main: '#1E1E2E'
      }
    }
  })
  const [count, setCount] = useState(0)
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
    <ButtonAppBar />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </ThemeProvider>
    </>
  )
}

export default App
