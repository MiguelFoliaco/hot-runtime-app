import { Grid, SxProps, Theme, Typography } from '@mui/material'

export const Console = ({ sx, text }: { sx?: SxProps<Theme>, text: string }) => {
    return (
        <Grid sx={{ p: 1, transition: '200ms', width: '50%', opacity: 1, height: '160px', borderRadius: 3, bgcolor: '#000', ...sx }}  >
            <Typography variant='caption' fontFamily={'monospace'}>{text}</Typography>
        </Grid>
    )
}
