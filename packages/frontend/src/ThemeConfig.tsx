import { Grid, ThemeProvider } from '@mui/material'
import App from './App'
import { ThemeMap, useThemeClient } from './utils/hooks/useTheme'
import { useEffect } from 'react'

export const ThemeConfig = () => {

    const { themeList, themeSelected, setTheme } = useThemeClient(state => state)

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (theme) {
            setTheme(theme as ThemeMap)
        }
    }, [])
    return (
        <ThemeProvider theme={{...themeList[themeSelected]}}>
            <Grid sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
                <App />
            </Grid>
        </ThemeProvider>
    )
}
