import { Button, Grid, IconButton, Typography } from "@mui/material"
import { Replay } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { supabaseClient } from "../../../data/supabase"
import { Tables } from "../../../database.types"
import moment from "moment"
import { useUser } from "../context/user.context"
import { useAlert } from "../../../layouts/components/AlertGlobal"

const getTokens = async (setTokens: (data: Tables<'tokens_dev'>[]) => void, id: string) => {
    const tokens = await supabaseClient.from('tokens_dev').select("*").eq('create_by', id)
    console.log(tokens, "tokens")
    if (tokens.data) {
        setTokens(tokens.data)
    }
}
export const ListTokens = () => {
    const openAlert = useAlert(state => state.openAlert)
    const session = useUser(state => state.values.session!)
    const [loading, setLoading] = useState(false)
    const [tokens, setTokens] = useState<Tables<'tokens_dev'>[]>([])
    useEffect(() => {
        if (session?.user?.id) {
            getTokens(setTokens, session.user.id)
        }
    }, [session])

    const deleteToken = async (id: number) => {
        const check = confirm("Esta seguro que quiere eliminar el token?")
        if (check) {
            const deleted = await supabaseClient.from('tokens_dev').delete().eq('id', id)
            if (deleted.error) {
                console.log(deleted)
                return openAlert({
                    msg: 'Ocurrio un error al eliminar el token',
                    severity: 'error'
                })
            }
            getTokens(setTokens, session.user.id)
            return openAlert({
                msg: 'El token se elimino correctamente',
                severity: 'success'
            })
        }
    }

    return (
        <Grid>
            <IconButton
                className={loading ? 'rotation' : 'undefined'}
                disabled={loading}
                size='small'
                onClick={() => {
                    console.log('Hola')
                    setLoading(true)
                    getTokens(setTokens, session.user.id)
                        .finally(() => {
                            setLoading(false)
                        })
                }}
            ><Replay fontSize="small" /></IconButton>
            {
                tokens.length === 0 ?
                    <Typography variant='body2' color='text.secondary'>Aun no tienes claves generadas, aqui se listaran la claves que hayas generado</Typography>
                    :
                    <>
                        {
                            tokens.map(e => (
                                <Grid container key={`item-token-${e.id}`} sx={{ my: 1, border: t => `1px solid ${t.palette.text.secondary}50`, p: 1, borderRadius: 1 }}>
                                    <Grid item xs={9} sx={{ mb: 1 }}>
                                        <Typography variant="overline" color='secondary.main'>
                                            {e.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} sx={{ mb: 1 }} justifyContent={'center'} display={'flex'}>
                                        <Button onClick={() => deleteToken(e.id)} size='small' variant="outlined" color='error'>Eliminar</Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption">
                                            Creado por {e.assing_by.toLowerCase()}
                                        </Typography>
                                    </Grid>
                                    <Typography variant="caption">
                                        Fecha de creación {moment(e.created_at).format('YYYY/MM/DD - hh:mm a')}
                                    </Typography>
                                </Grid>
                            ))
                        }
                    </>
            }
        </Grid>
    )
}
