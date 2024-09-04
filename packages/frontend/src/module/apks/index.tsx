import { Button, Grid, IconButton, MenuItem, Select, Tooltip, Typography } from "@mui/material"
import { LayoutBuilder } from "../../layouts/builders"
import { LeftBar } from "../home/components/LeftBar"
import { Android, ContentCopy, Download, RemoveRedEye, Replay } from "@mui/icons-material"
import { Fragment, useEffect, useState } from "react"
import { socket } from "../../services/socket.io"
import { api } from "../builder/services/http"
import { useAlert } from "../../layouts/components/AlertGlobal"
import { useUser } from "../auth/context/user.context"
import { useAPKs } from "./context/useAPKs"
import moment from "moment"
import { PayloadBuild } from "./types/Payload"
import { useProject } from "../../utils/hooks/useProjects"
import { Tables } from "../../database.types"
import { getProjects } from "../home/services/projects"
import { FileObject } from '@supabase/storage-js';
import { supabaseClient } from "../../data/supabase"
import { useNavigate } from "react-router-dom"



export const APKs = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { projects, setProjects, setProject, projectSelected } = useProject()
    const { builds, fillBuilds } = useAPKs()
    const [build, setBuild] = useState<FileObject>()
    const { openAlert } = useAlert()
    const { values: { session } } = useUser()
    const linkTo = useNavigate()


    useEffect(() => {
        if (projects.length === 0) {
            getProjects({ setProjevt: setProjects })
        }
        socket.on('send-status-apk', (data: PayloadBuild) => {
            console.log(data)
            if (data.status === 'finished') {
                openAlert({
                    msg: 'La apk se ha generado exitosamente',
                    severity: 'info'
                })
            }
            if (data.status === 'errored') {
                openAlert({
                    msg: 'Ha ocurrido un error en general la apk',
                    severity: 'error'
                })
            }
        })
        return () => {
            socket.off('send-status-apk')
        }
    }, [])

    const generateAPK = async () => {
        api.method = 'get'
        const data = await api.rest<{ error: boolean, msg: string }>(`/expo/generate-apk?workflows_id=115439875`, {
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

    const getColor = (status: PayloadBuild['status']) => {
        switch (status) {
            case 'canceled':
                return '#e8dfdf'
            case 'errored':
                return '#ff5f5f'
            case 'finished':
                return '#a6ff94'
        }
    }

    const selectedItem = (e: FileObject) => {
        if (build?.id === e?.id) {
            setBuild(undefined)
        }
        else {
            setBuild(e)
        }
    }

    const downloadFile = async (e: FileObject) => {
        if (projectSelected) {
            const file = await supabaseClient.storage.from('apks').download(`debugs/${projectSelected.name}/${e.name}`)
            if (file.data) {
                const url = window.URL.createObjectURL(file.data)
                window.open(url, '_blank')
                openAlert({
                    msg: 'Se esta descargando el archivo...',
                    severity: 'info'
                })
            }
        }
    }
    const getFiles = (value: string) => {
        const project = projects.find(e => e?.id === parseInt(value))
        if (project) {
            setProject(project)
            setIsLoading(true)
            fillBuilds(project.name)
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }
    return (
        <LayoutBuilder
            listItemsLeft={LeftBar}
        >
            <Grid container sx={{ position: 'relative', }}>
                <Grid item xs={12} sx={{
                    height: '50px',
                    width: '100%',
                    py: 1,
                    borderBottom: '1px solid #FFFFFF20'
                }}>
                    <Typography variant="overline">
                        Listado de compilaciónes
                    </Typography>
                    <IconButton
                        disabled={isLoading}
                        onClick={() => {
                            if (projectSelected?.name) {
                                setIsLoading(true)
                                fillBuilds(projectSelected?.name)
                                    .finally(() => {
                                        setIsLoading(false)
                                    })
                            }
                        }}>
                        <Replay className={isLoading ? "rotation" : undefined} />
                    </IconButton>
                </Grid>
                <Grid item xs={12} sx={{ p: 1 }}>
                    <Select size='small' sx={{ width: '30%' }} onChange={(e) => getFiles(e.target.value.toString())} value={projectSelected?.id ?? 0}>
                        <MenuItem value={0}>
                            Seleccione un projecto
                        </MenuItem>
                        {
                            projects.map(e => (
                                <MenuItem value={e.id} key={`item-menu-${e.id}`}>{e.name}</MenuItem>
                            ))
                        }
                    </Select>
                </Grid>
                {
                    builds.length === 0 ?
                        <Grid item xs={12} sx={{ flexDirection: 'column', height: '90%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography>Aun no nada aquí</Typography>
                            <Button
                                onClick={generateAPK}
                                sx={{ mt: 1 }} color='secondary'
                                endIcon={<Android />}
                            >Compilar una version</Button>
                        </Grid>
                        :
                        <Fragment>
                            <Grid item xs={build ? 8 : 12} sx={{ flexDirection: 'column', height: '90%', transition: '200ms' }}>
                                {
                                    builds.map(e => (
                                        <Grid container key={`build-list-item-${e.id}`} sx={{ bgcolor: '#090909', border: '1px solid #1f1f1f', p: 0.5, px: 1, mb: 2, borderRadius: 1 }}>
                                            <Grid item xs={10} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                {/* <Android fontSize="small" htmlColor={getColor(JSON.parse(e.payload_str).status)} /> */}
                                                <Typography fontSize={'15px'} sx={{ color: '#d5d5d5', mx: 2 }}>File Name: {e.name}</Typography>
                                                <Typography fontSize={'15px'} sx={{ color: '#d5d5d5', ml: 2, display: 'inline-block' }}>Hash: {e.owner}</Typography>
                                                <IconButton
                                                    onClick={async () => {
                                                        try {
                                                            await navigator.clipboard.writeText(e.id)
                                                            openAlert({
                                                                msg: 'El texto se copio correctamente',
                                                                severity: 'success'
                                                            })
                                                        }
                                                        catch (err) {
                                                            console.log(err)
                                                            openAlert({
                                                                msg: 'Ocurrio un error al copiar el id del bucket',
                                                                severity: 'error'
                                                            })
                                                        }
                                                    }}
                                                >
                                                    <ContentCopy htmlColor="#d5d5d5" />
                                                </IconButton>
                                                <Typography fontSize={'15px'} sx={{ color: '#d5d5d5', mx: 2, display: 'inline-block' }}>Creado el: {moment(e.created_at).format('YYYY-MM-DD HH:mm:ss a')}</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                {
                                                    // JSON.parse(e)?.status === 'finished' &&
                                                    <IconButton onClick={() => downloadFile(e)}>
                                                        <Download color='secondary' />
                                                    </IconButton>
                                                }
                                            </Grid>
                                            <Grid item xs={1}>
                                                <div onClick={() => selectedItem(e)}>
                                                    <Tooltip title='Mostar detalles'>
                                                        <IconButton >
                                                            <RemoveRedEye color={e?.id === build?.id ? 'error' : 'info'} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                                <Button
                                    onClick={generateAPK}
                                    sx={{ position: 'absolute', bottom: 10, right: 10 }} color='secondary'
                                    endIcon={<Android />}
                                >Compilar una version</Button>
                            </Grid>
                            <Grid item xs={build ? 4 : 0} className="scroll" sx={{ opacity: build ? 1 : 0, transition: '200ms', height: '500px', width: build ? undefined : '0px', overflowX: 'scroll', overflowY: 'scroll', }}>
                                <Typography variant="overline">
                                    <pre>
                                        {
                                            JSON.stringify(build ?? {}, null, 3)
                                        }
                                    </pre>
                                </Typography>
                            </Grid>
                        </Fragment>
                }
            </Grid>
        </LayoutBuilder>
    )
}
