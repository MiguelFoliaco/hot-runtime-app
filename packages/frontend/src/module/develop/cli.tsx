import { Button, ButtonGroup, CircularProgress, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { LayoutBuilder } from '../../layouts/builders'
import { LeftBar } from '../home/components/LeftBar'
import { useEffect, useMemo, useState } from 'react'
import { useRols } from '../auth/context/rol.context'
import { Refresh } from '@mui/icons-material'
import { Tables } from '../../database.types'
import { ModalActions } from '../auth/components/modalActions'
import { supabaseClient } from '../../data/supabase'
import { api } from '../builder/services/http'
import { PostgrestError, User } from '@supabase/supabase-js'
import { useAlert } from '../../layouts/components/AlertGlobal'


const setRol = async (rol: Tables<"rols">) => {
    await supabaseClient.from('rols').update({
        actions: rol.actions,
    }).eq('id', rol.id)
}

export const CLI = () => {
    const openAlert = useAlert(state => state.openAlert)
    const { rols, fill, actions, loading } = useRols()
    const [showForm, setShowForm] = useState(false)
    const [time, setTime] = useState<null | number | string>(null)
    const [rolSelected, setRolSelected] = useState<Tables<'rols'>>()
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        if (rols.length === 0 && actions.length === 0) {
            fill()
        }
    }, [])

    const _actions = useMemo(() => {
        if (rolSelected) {
            const ids = rolSelected.actions
            return actions.filter(e => ids.includes(e.id))
        }
        return []
    }, [rols, rolSelected, actions])


    return (
        <LayoutBuilder
            listItemsLeft={LeftBar}
        >
            <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Grid sx={{ transition: '200ms', width: showForm ? '50%' : '100%' }}>
                    <Typography sx={{ my: 1 }} variant='overline'>Configuración para el CLI</Typography>
                    <Grid container>
                        <Grid item xs={12} sx={{ my: 1, mb: 2, border: t => `1px solid ${t.palette.text.secondary}50`, borderRadius: '3px', padding: '10px' }}>
                            <Typography variant='body2' color='text.secondary'>Aun no tienes claves generadas, aqui se listaran la claves que hayas generado</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                disabled={loading}
                                endIcon={loading && <CircularProgress size='20px' />}
                                onClick={() => {
                                    setShowForm(!showForm)

                                }} size='small' variant='outlined'>Seleccionar Rol</Button>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid>
                                <ButtonGroup size='small'>
                                    <Button variant={time === '1d' ? 'contained' : 'outlined'} onClick={() => setTime('1d')}>24Hr</Button>
                                    <Button variant={time === '15d' ? 'contained' : 'outlined'} onClick={() => setTime('15d')}>15d</Button>
                                    <Button variant={time === '30d' ? 'contained' : 'outlined'} onClick={() => setTime('30d')}>30d</Button>
                                    <Button variant={time === 0 ? 'contained' : 'outlined'} onClick={() => setTime(0)}>Without Expired</Button>
                                </ButtonGroup>
                            </Grid>
                            <Button
                                color='secondary'
                                disabled={!rolSelected}
                                sx={{ my: 1 }}
                                endIcon={loading && <CircularProgress size='20px' />}
                                onClick={async () => {
                                    const user = await supabaseClient.auth.getUser()
                                    if (!rolSelected) {
                                        openAlert({
                                            msg: 'Por favor seleccione un rol',
                                            severity: 'warning'
                                        })
                                    }
                                    if (time === null) {
                                        openAlert({
                                            msg: 'Por favor seleccione un tiempo de expiración',
                                            severity: 'warning'
                                        })
                                    }
                                    if (user.data.user && rolSelected) {
                                        generateToken({
                                            user: user.data.user,
                                            rol: rolSelected,
                                            timeExpire: 1000
                                        }).finally(e=>{
                                            if(typeof e==="string"){
                                                //mostrar el token
                                            }
                                        })
                                    }
                                }} size='small' variant='outlined'>generar token</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid sx={{ transition: '200ms', width: showForm ? '50%' : '0', p: 2, pt: 5, overflow: 'hidden', }}>
                    {
                        showForm && <>
                            <TextField fullWidth size='small' label='Descripcion del token' />
                            <Grid container sx={{ width: '100%', alignItems: 'center', display: 'flex', my: 2 }}>
                                <FormControl sx={{ mt: 1, width: '90%' }}>
                                    <InputLabel color='secondary' size='small' id='rol-label'>Rol</InputLabel>
                                    <Select
                                        fullWidth
                                        labelId='rol-label'
                                        label='Rol'
                                        color='secondary'
                                        size='small'
                                        value={rolSelected?.id}
                                        onChange={(event) => {
                                            const item = rols.find(e => e.id === event.target.value)
                                            if (item) {
                                                setRolSelected(item)
                                            }
                                        }}
                                    >
                                        {
                                            rols.map(e => (
                                                <MenuItem value={e.id} key={e.title}>{e.title}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <IconButton size='small' sx={{ mt: 1, ml: 1 }} onClick={() => fill()}>
                                    <Refresh className={loading ? 'rotation' : undefined} />
                                </IconButton>
                            </Grid>
                            <Grid sx={{ border: t => `1px solid ${t.palette.text.secondary}50`, p: 1, borderRadius: 1, minHeight: '400px' }}>
                                <Typography variant='overline'>¿Que pudes hacer?</Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Grid className='scroll' sx={{ height: '280px', overflowY: 'scroll' }}>
                                    {
                                        _actions.map(e => (
                                            <Grid key={`key-${e.id}${e.code}`} >
                                                <Typography fontSize={'10px'} fontWeight={'bold'} variant='overline' >{e.code}:</Typography>
                                                <Typography fontSize={'10px'} variant='overline' >{' ' + e.description}:</Typography>
                                            </Grid>
                                        ))
                                    }
                                </Grid>

                                <Button disabled={!rolSelected} size='small' sx={{ mt: 2 }} fullWidth onClick={() => setOpenModal(true)}>Añadir nueva acción</Button>
                            </Grid>
                        </>
                    }
                </Grid>
            </Grid>

            <ModalActions
                hidden={() => setOpenModal(false)}
                rolId={rolSelected?.id || 0}
                setRol={setRol}
                show={openModal}
            />
        </LayoutBuilder>
    )
}


const generateToken = async (payload: { user: User, rol: Tables<'rols'>, timeExpire: number }) => {
    api.method = 'post'
    api.bodyInit = payload
    const response = await api.rest('/generateToken')
    return response as string | PostgrestError
}