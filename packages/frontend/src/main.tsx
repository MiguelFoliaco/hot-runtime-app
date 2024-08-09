import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createTheme, Grid, ThemeProvider } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    allVariants: {
      fontFamily: 'open sans'
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Grid sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <App />
      </Grid>
    </ThemeProvider>
  </StrictMode>,
)
