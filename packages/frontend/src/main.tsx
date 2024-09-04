import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeConfig } from './ThemeConfig.tsx'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeConfig />
  </StrictMode>,
)
