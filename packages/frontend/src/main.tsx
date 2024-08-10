import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Grid, ThemeProvider } from '@mui/material'
import { themePrimary } from './themes/primary.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={themePrimary}>
      <Grid sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <App />
      </Grid>
    </ThemeProvider>
  </StrictMode>,
)
