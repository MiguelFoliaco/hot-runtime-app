import { Grid, SxProps, Theme, Typography } from '@mui/material'
import { ReactNode } from 'react'

export const Console = ({ sx, text, children }: { sx?: SxProps<Theme>, text?: string, children?: ReactNode }) => {
    return (
        <Grid sx={{ p: 1, transition: '200ms', width: '100%', opacity: 1, height: '160px', borderRadius: 3, bgcolor: '#000', ...sx }}  >
            {
                children ||
                <Typography variant='caption' fontFamily={'monospace'}>{text}</Typography>
            }
        </Grid>
    )
}
