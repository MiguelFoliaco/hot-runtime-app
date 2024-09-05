import { Grid, Typography } from "@mui/material"
import { themeNames, useThemeClient } from "../../../utils/hooks/useTheme"

export const ThemeConfigModule = () => {
    const { themeList, setTheme, themeSelected } = useThemeClient();

    return (
        <Grid sx={{ height: '80vh' }}>
            <Grid item xs={12} sx={{ mb: 1 }}>
                <Typography>Temas</Typography>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', gap: 1 }}>
                {
                    themeNames.map((e, i) => (
                        <Grid onClick={() => setTheme(e)} key={`theme-key-${e}-${i}`} sx={{ cursor: 'pointer', transition: '200ms', ':hover': { transform: 'scale(0.95)' }, transform: themeSelected === e ? 'scale(0.9)' : undefined, opacity: themeSelected === e ? 0.6 : 1 }} >
                            <Typography variant="overline">{e}</Typography>
                            <Grid sx={{ border: t => `1px solid ${t.palette.text.secondary}50`, mt: 0.6 }}>
                                <Grid sx={{ width: '100px', height: '30px', bgcolor: themeList[e].palette.primary.main, display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                                <Grid sx={{ width: '100px', height: '30px', bgcolor: themeList[e].palette.secondary.main, display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                                <Grid sx={{ width: '100px', height: '30px', bgcolor: themeList[e].palette.background.default, display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>
        </Grid >
    )
}
