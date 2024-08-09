import { Grid, Typography } from '@mui/material'
import { ReactNode } from 'react'

export const LayoutBuilder = ({ children, listItemsLeft }: { children: ReactNode, listItemsLeft?: ReactNode }) => {
    return (
        <Grid container sx={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gridTemplateRows: 'repeat(20,5vh )' }}>
            <Grid bgcolor={'primary.main'} sx={{ gridRowEnd: 1, gridRowStart: 1, gridColumnStart: 1, gridColumnEnd: 13, p: 0.5, pl: 1 }}>
                <Typography variant='overline' >Builder</Typography>
            </Grid>
            <Grid container sx={{
                gridColumnStart: 1,
                gridColumnEnd: 3,
                gridRowStart: 2,
                gridRowEnd: 21,
                bgcolor: '#FFFFFF10',
                width: '100%',
                height: '100%'
            }}>
                {listItemsLeft}
            </Grid>
            <Grid container sx={{
                gridColumnStart: 3,
                gridColumnEnd: 12,
                gridRowStart: 2,
                gridRowEnd: 21,
                width: '100%',
                height: '100%'
            }}>
                {children}
            </Grid>
        </Grid>
    )
}
