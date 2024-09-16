import { Button, ButtonGroup, CircularProgress, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { LayoutBuilder } from '../../layouts/builders'
import { LeftBar } from '../home/components/LeftBar'
import { useEffect, useMemo, useState } from 'react'
import { useRols } from '../auth/context/rol.context'
import { ContentCopy, Refresh } from '@mui/icons-material'
import { Tables } from '../../database.types'
import { ModalActions } from '../auth/components/modalActions'
import { supabaseClient } from '../../data/supabase'
import { api } from '../builder/services/http'
import { PostgrestError, User } from '@supabase/supabase-js'
import { useAlert } from '../../layouts/components/AlertGlobal'
import { useUser } from '../auth/context/user.context'
import { ListTokens } from '../auth/components/Tokens'


const setRol = async (rol: Tables<"rols">) => {
    await supabaseClient.from('rols').update({
        actions: rol.actions,
    }).eq('id', rol.id)
}

export const CLI = () => {
    const openAlert = useAlert(state => state.openAlert)
    const { values: { session } } = useUser()
    const { rols, fill, actions, loading } = useRols()
    const [showForm, setShowForm] = useState(false)
    const [time, setTime] = useState<null | number | string>(null)
    const [rolSelected, setRolSelected] = useState<Tables<'rols'>>()
    const [openModal, setOpenModal] = useState(false)
    const [tokenGenerate, setTokenGenerate] = useState('')
    const [title, setTitle] = useState('')

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

    const copy = async () => {
        await navigator.clipboard.writeText(tokenGenerate)
        openAlert({
            msg: 'Key copiada con exitio',
            severity: 'success'
        })
    }

    const generateTokenFn = async () => {
        const user = session?.user
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
        if (user && rolSelected) {
            setTokenGenerate('')
            await generateToken({
                user: user,
                rol: rolSelected,
                timeExpire: time ?? undefined,
                title,
            }, session.access_token).then(e => {
                if (e.token) {
                    setTokenGenerate(e.token)
                    openAlert({
                        msg: 'Token generado con exito',
                        severity: 'success'
                    })
                    setTime(null)
                    setShowForm(false)
                    setRolSelected(undefined)
                    setTitle('')
                } else {
                    openAlert({
                        msg: `[Error] ${e.message}`,
                        severity: 'error'
                    })
                }
            })

        }
    }

    return (
        <LayoutBuilder
            listItemsLeft={LeftBar}
        >
            <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Grid sx={{ transition: '200ms', width: showForm ? '50%' : '100%' }}>
                    <Typography sx={{ my: 1 }} variant='overline'>Configuración para el CLI</Typography>
                    <Grid container>
                        <Grid item xs={4} sx={{ my: 1 }}>
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
                                    <Button variant={time === '1 days' ? 'contained' : 'outlined'} onClick={() => setTime('1 days')}>24Hr</Button>
                                    <Button variant={time === '15 days' ? 'contained' : 'outlined'} onClick={() => setTime('15 days')}>15d</Button>
                                    <Button variant={time === '30 days' ? 'contained' : 'outlined'} onClick={() => setTime('30 days')}>30d</Button>
                                    <Button variant={time === 0 ? 'contained' : 'outlined'} onClick={() => setTime(0)}>Without Expired</Button>
                                </ButtonGroup>
                            </Grid>
                            <Button
                                color='secondary'
                                disabled={!rolSelected}
                                sx={{ my: 1 }}
                                endIcon={loading && <CircularProgress size='20px' />}
                                onClick={generateTokenFn} size='small' variant='outlined'>generar token</Button>
                        </Grid>
                        {
                            tokenGenerate &&
                            <Grid item xs={12} sx={{ maxHeight: '100px', my: 1, mb: 1, border: t => `1px solid ${t.palette.text.secondary}50`, borderRadius: '3px', padding: '10px' }}>
                                <Typography sx={{ display: 'flex', alignItems: 'center', color: t => `${t.palette.text.secondary}80` }} variant='body2'>{tokenGenerate.substring(0, 75) + '...'} <ContentCopy onClick={copy} sx={{ ml: 1, color: t => `${t.palette.text.secondary}80`, ':hover': { color: 'primary.main' }, cursor: 'pointer', transition: '200ms', mr: 2 }} />{!showForm && 'Asegure el token ya que no se volvera a mostrar'}</Typography>
                            </Grid>
                        }

                        <Grid item xs={12} sx={{ my: 1, mb: 2, border: t => `1px solid ${t.palette.text.secondary}50`, borderRadius: '3px', padding: '10px' }}>
                            <ListTokens />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid sx={{ transition: '200ms', width: showForm ? '50%' : '0', p: 2, pt: 5, overflow: 'hidden', }}>
                    {
                        showForm && <>
                            <TextField fullWidth size='small' label='Descripcion del token' value={title} onChange={(e) => setTitle(e.target.value)} />
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
                                <IconButton className={loading ? 'rotation' : undefined} size='small' sx={{ mt: 1, ml: 1 }} onClick={() => fill()}>
                                    <Refresh />
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


const generateToken = async (payload: { user: User, rol: Tables<'rols'>, timeExpire: number | string | undefined, title: string }, token: string): Promise<{ token: string } & PostgrestError> => {
    api.method = 'post'
    api.bodyInit = payload
    const response = await api.rest<{ token: string } & PostgrestError>('/generateToken', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}