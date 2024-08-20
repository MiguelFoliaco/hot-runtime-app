import { Button, Grid, Typography } from "@mui/material"
import { LayoutBuilder } from "../../layouts/builders"
import { LeftBar } from "../home/components/LeftBar"
import { Android } from "@mui/icons-material"
import { useEffect } from "react"
import { socket } from "../../services/socket.io"
import { api } from "../builder/services/http"
import { useAlert } from "../../layouts/components/AlertGlobal"
import { useUser } from "../auth/context/user.context"

let render = 0

export const APKs = () => {

    const { openAlert } = useAlert()
    const { values: { session } } = useUser()


    useEffect(() => {
        socket.on('send-status-apk', (data) => {
            render = +1
            console.log(data)
        })
        console.log(render)
        return () => {
            socket.off('send-status-apk')
        }
    }, [])

    const generateAPK = async () => {
        api.method = 'get'
        const data = await api.rest<{ error: boolean, msg: string }>(`/expo/generate-apk?workflows_id=112947587`, {
            headers: {
                Authorization: `Bearer ${session?.access_token}`
            }
        })
        if (data?.error) {
            openAlert({
                msg: data.msg || "Ocurrio un error",
                severity: "error"
            })
        } else if (data?.error === false) {
            openAlert({
                msg: "Te avisaremos cuando todo este listo :)",
                severity: "success"
            })
        }
    }

    return (
        <LayoutBuilder
            listItemsLeft={LeftBar}
        >
            <Grid container sx={{ position: 'relative', }}>
                {/* {
                    isProcess &&
                    <Grid sx={{ position: 'absolute', top: 40, right: 10, px: 1, py: 1, width: '200px', height: 'min-content', borderRadius: '5px', justifyContent: 'space-between', bgcolor: (t) => `${t.palette.secondary.dark}80`, display: 'flex' }}>
                        <Typography color='#eee'>Generando APK</Typography>
                        <CircularProgress size='20px' sx={{ ml: 1 }} color='secondary' />
                    </Grid>
                } */}
                <Grid item xs={12} sx={{
                    height: '30px',
                    width: '100%',
                    borderBottom: '1px solid #FFFFFF20'
                }}>
                    <Typography variant="overline">
                        Listado de compilaciónes
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ flexDirection: 'column', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography>Aun no nada aquí</Typography>
                    <Button
                        onClick={generateAPK}
                        sx={{ mt: 1 }} color='secondary'
                        endIcon={<Android />}
                    >Compilar una version</Button>
                </Grid>
            </Grid>
        </LayoutBuilder>
    )
}
