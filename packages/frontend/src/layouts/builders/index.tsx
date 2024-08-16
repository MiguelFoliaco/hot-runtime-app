import { Avatar, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { Fragment, ReactNode, useState } from 'react'
import { useUser } from '../../module/auth/context/user.context'
import { supabaseClient } from '../../data/supabase'
import { redirect } from 'react-router-dom'
import { ArrowForward } from '@mui/icons-material'

export const LayoutBuilder = ({ children, listItemsLeft: ListLeft }: { children: ReactNode, listItemsLeft: (props: { open: boolean, toggle: () => void }) => ReactNode }) => {
    const user = useUser(state => state.values.user)
    const { setSession } = useUser(state => state.actions)
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const open = Boolean(anchorEl)
    const [openMenuLeft, setOpenMenuLeft] = useState(false)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log('Hola mundo')
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null)
    }

    const closeSession = async () => {
        const process = await supabaseClient.auth.signOut({ scope: 'global' });
        setSession(undefined)
        console.log(process)
        handleClose()
        redirect('/')
    }


    return <Fragment>
        <Grid container sx={{ display: 'grid', gridTemplateColumns: 'repeat(25,1fr)', gridTemplateRows: 'repeat(20,5vh )' }}>
            <Grid item xs={12} container bgcolor={'#00000020'} sx={{ width: '100%', display: 'flex', alignItems: 'center', gridRowEnd: 2, gridRowStart: 1, gridColumnStart: 1, gridColumnEnd: 26, p: 0.2, px: 2, justifyContent: 'space-between' }}>
                <Typography variant='overline' >{user?.email}</Typography>
                <Grid>
                    <IconButton
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        size='small'>

                        {
                            user?.user_metadata?.avatar_url ?
                                <Avatar src={user?.user_metadata?.avatar_url} sx={{ color: '#1f1f1f', bgcolor: 'secondary.main', width: '20px', height: '20px', fontSize: '15px', justifySelf: 'flex-end' }} />
                                :
                                <Avatar sx={{ color: '#1f1f1f', bgcolor: 'secondary.main', width: '20px', height: '20px', fontSize: '15px', justifySelf: 'flex-end' }}>
                                    {
                                        user && user.email?.charAt(0)?.toUpperCase()
                                    }
                                </Avatar>
                        }
                    </IconButton>

                </Grid>
            </Grid>
            <Grid container direction={'column'} sx={{
                transition: '200ms !important',
                gridColumnStart: 1,
                gridColumnEnd: openMenuLeft ? 5 : 1,
                gridRowStart: 2,
                gridRowEnd: 21,
                bgcolor: '#FFFFFF10',
                width: '100%',
                overflow: 'hidden',
                height: '100%'
            }}>
                <Grid item xs={11}>
                    {
                        ListLeft &&
                        <ListLeft open={openMenuLeft} toggle={() => setOpenMenuLeft(!openMenuLeft)} />
                    }
                </Grid>
                <Grid item xs={1} sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size='small' onClick={() => setOpenMenuLeft(!openMenuLeft)}>
                        <ArrowForward sx={{ transition: '200ms', transform: `rotate(${openMenuLeft ? '180deg' : '0deg'})` }} />
                    </IconButton>
                    {
                        openMenuLeft &&
                        <Typography>Cerrar</Typography>
                    }
                </Grid>
            </Grid>
            <Grid container sx={{
                gridColumnStart: openMenuLeft ? 5 : 2,
                gridColumnEnd: 26,
                gridRowStart: 2,
                gridRowEnd: 21,
                width: '100%',
                height: '100%',
                p: 2
            }}>
                {children}
            </Grid>
        </Grid>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
            <MenuItem onClick={closeSession}>Logout</MenuItem>
        </Menu>
    </Fragment>
}
