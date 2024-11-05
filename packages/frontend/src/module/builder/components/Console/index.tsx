import { Maximize, Minimize } from '@mui/icons-material'
import { Grid, SxProps, Theme, Tooltip, Typography } from '@mui/material'
import { ReactNode } from 'react'

export const Console = ({ sx, text, children, onClose, onOpen, open }: { sx?: SxProps<Theme>, text?: string, children?: ReactNode, onClose: () => void, onOpen: () => void, open: boolean }) => {
    return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        <Grid sx={{ height: !open ? '20px' : undefined, overflow: 'hidden', transition: '200ms', position: 'relative', width: sx?.width || '100%', opacity: 1, borderRadius: 3, padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.126)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center' }}>
            {
                !open &&
                <Tooltip
                    title='Maximizar consola'
                >
                    <Maximize
                        onClick={() => {
                            onOpen()
                        }}
                        color='secondary' sx={{
                            cursor: 'pointer', position: 'fixed', top: 5, right: 20, ':hover': {
                                transform: 'scale(0.9)',
                                transition: '200ms'
                            }
                        }} />
                </Tooltip>
            }
            {
                open &&
                <Grid className='scroll' sx={{ p: 1, height: '160px', bgcolor: '#000', borderRadius: 3, ...sx }}  >
                    <Tooltip
                        title='Minimizar consola'
                    >
                        <Minimize
                            onClick={() => {
                                onClose()
                            }}
                            color='secondary' sx={{
                                cursor: 'pointer', position: 'fixed', top: 5, right: 20, ':hover': {
                                    transform: 'scale(0.9)',
                                    transition: '200ms'
                                }
                            }} />
                    </Tooltip>
                    {
                        children ||
                        <Typography variant='caption' fontFamily={'monospace'}>{text}</Typography>
                    }
                </Grid>
            }
        </Grid >
    )
}
