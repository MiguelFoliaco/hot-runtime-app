import { Button, CircularProgress, Grid, IconButton, Menu, MenuItem, Select, Tooltip, Typography } from "@mui/material"
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
import { getProjects } from "../home/services/projects"
import { FileObject } from '@supabase/storage-js';
import { supabaseClient } from "../../data/supabase"
import { statusProccess } from "../../utils/getStatusProccess"
import { PROCESS_TYPE } from "../../types/proccess_enums"
import { Tables } from "../../database.types"
import { Console } from "../builder/components/Console"
import { config } from "../../configs/constants"
import { useVersion } from "../../utils/hooks/useVersion"
import { getOS } from "../home/services/version"


export const APKs = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [statusProcessApk, setStatusProcessApk] = useState<Partial<Tables<'process'>>>({ status: 'on' })
    const { projects, setProjects, setProject, projectSelected } = useProject()
    const { oss, setOSs } = useVersion()
    const { builds, fillBuilds } = useAPKs()
    const [isLoadindDownload, setIsLoadindDownload] = useState(false)
    const [openConsole, setOpenConsole] = useState(false)
    const [payloads, setPayloads] = useState<PayloadBuild[]>([])
    const [build, setBuild] = useState<FileObject>()
    const { openAlert } = useAlert()
    const { values: { session } } = useUser()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    useEffect(() => {
        if (oss.length === 0) {
            getOS(setOSs)
        }
        statusProccess(PROCESS_TYPE.APK_GENERATE, setStatusProcessApk)
        if (projects.length === 0) {
            getProjects({ setProjevt: setProjects })
        }
        socket.on('send-status-apk', (data: PayloadBuild) => {
            console.log("STATUS APK", data)
            setPayloads(state => state.concat(data))
            if (data?.workflow_job?.status === 'completed') {
                statusProccess(PROCESS_TYPE.APK_GENERATE, setStatusProcessApk)
            }
        })
        return () => {
            socket.off('send-status-apk')
        }
    }, [])

    const generateAPK = async (osId: number) => {
        setAnchorEl(null);
        const check = confirm("¿Desea generar una version de desarrollo?");
        if (statusProcessApk?.status === 'on') {
            return openAlert({ msg: 'Hay una generación en curso, por favor espere a que este termine para empezar uno nuevo', severity: 'warning' })
        }
        if (!projectSelected) {
            return openAlert({ msg: 'Por favor seleccione un proyecto', severity: 'warning' })
        }
        setOpenConsole(true)
        api.method = 'post'
        const data = await api.rest<{ error: boolean, msg: string }>(`/github/generate-apk?workflows_id=${config.workflowGenerateApkId}&project_id=${projectSelected?.id}&os_id=${osId}&dev=${check ? 'true' : 'false'}`, {
            headers: {
                authorization: `Bearer ${session?.access_token}`
            }
        })
        console.log("Data ", data)
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
            statusProccess(PROCESS_TYPE.APK_GENERATE, setStatusProcessApk)

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
            setIsLoadindDownload(true)
            const file = await supabaseClient.storage.from('apks').download(`debugs/${projectSelected.name}/${e.name}`)
            if (file.data) {
                const url = window.URL.createObjectURL(file.data)
                window.open(url, '_blank')
                openAlert({
                    msg: 'Se esta descargando el archivo...',
                    severity: 'info'
                })
            }
            setIsLoadindDownload(false)
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
        else {
            openAlert({
                msg: 'Por favor seleccione un proyecto',
                severity: 'info'
            })
        }
    }

    // const [values, setValue] = useState<{ por: number, color: AlertColor }>({ por: 0.05, color: 'success' })

    // useEffect(() => {
    //     let id: NodeJS.Timeout
    //     console.log(values)
    //     if (values.por >= 1) {
    //         setValue({ por: 0, color: 'success' })
    //     } else {
    //         id = setInterval(() => {
    //             setValue(state => {
    //                 if (state.por > 1) {
    //                     clearInterval(id)
    //                     return { pos: 0, color: 'success' }
    //                 }
    //                 if (state.por <= 0.5) {
    //                     return { color: 'success', por: state.por + 0.05 }
    //                 }
    //                 if (state.por > 0.5 && state.por <= 0.7) {
    //                     return { color: 'warning', por: state.por + 0.05 }
    //                 }
    //                 else {
    //                     return { color: 'error', por: state.por + 0.05 }
    //                 }

    //             })
    //         }, 500)

    //     }

    //     return () => {
    //         console.log('clear')
    //         clearInterval(id)
    //     }
    // }, [])//! Demostración

    const openListOs = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    return (
        <LayoutBuilder
            listItemsLeft={LeftBar}
        >
            <Grid container sx={{ position: 'relative' }}>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={() => {
                        setAnchorEl(null)
                    }}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {
                        oss.map(e => (
                            <MenuItem key={`menu-item-${e.id}-os`} onClick={() => generateAPK(e.id)}>{e.name}</MenuItem>
                        ))
                    }
                </Menu>
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
                <Grid container item xs={12}>
                    <Grid xs={4}>
                        <Select size='small' sx={{ width: '100%' }} onChange={(e) => getFiles(e.target.value.toString())} value={projectSelected?.id ?? 0}>
                            <MenuItem value={0}>
                                Seleccione un proyecto
                            </MenuItem>
                            {
                                projects.map(e => (
                                    <MenuItem value={e.id} key={`item-menu-${e.id}`}>{e.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                </Grid>
                {
                    builds.length === 0 && openConsole === false ?
                        <Grid item xs={12} sx={{ flexDirection: 'column', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography>Aun no nada aquí</Typography>
                            <Button
                                disabled={statusProcessApk?.status === 'on'}
                                onClick={openListOs}
                                sx={{ mt: 1 }} color='secondary'
                                endIcon={<Android />}
                            >Compilar una version</Button>
                        </Grid>
                        :
                        <Fragment>
                            <Grid item xs={build ? 8 : 12} sx={{ flexDirection: 'column', height: '80%', transition: '200ms' }}>
                                {
                                    builds.map(e => (
                                        <Grid container key={`build-list-item-${e.id}`} sx={{ bgcolor: 'background.paper', border: t => `1px solid ${t.palette.text.secondary}30`, p: 0.5, px: 1, mb: 2, borderRadius: 1 }}>
                                            <Grid item xs={10} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                                {/* <Android fontSize="small" htmlColor={getColor(JSON.parse(e.payload_str).status)} /> */}
                                                <Typography fontSize={'15px'} sx={{ color: 'text.secondary', mx: 2 }}>File Name: {e.name}</Typography>
                                                <Typography fontSize={'15px'} sx={{ color: 'text.secondary', ml: 2, display: 'inline-block' }}>Size: {((e.metadata?.size) / 1000000).toFixed(1)}mb</Typography>
                                                <Typography fontSize={'15px'} sx={{ color: 'text.secondary', ml: 2, display: 'inline-block' }}>Id: {e.owner}</Typography>
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
                                                    <ContentCopy htmlColor="text.secondary" />
                                                </IconButton>
                                                <Typography fontSize={'15px'} sx={{ color: 'text.secondary', mx: 2, display: 'inline-block' }}>Creado el: {moment(e.created_at).format('YYYY-MM-DD HH:mm:ss a')}</Typography>
                                            </Grid>
                                            <Grid item xs={1}>
                                                {
                                                    // JSON.parse(e)?.status === 'finished' &&
                                                    <IconButton disabled={isLoadindDownload} onClick={() => downloadFile(e)}>
                                                        {
                                                            isLoadindDownload ? <Replay className="rotation" />
                                                                :
                                                                <Download color='secondary' />
                                                        }
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
                                    disabled={statusProcessApk?.status === 'on'}
                                    onClick={openListOs}
                                    sx={{ position: 'absolute', bottom: 10, right: 10 }} color='secondary'
                                    endIcon={(statusProcessApk?.status === 'on') ? <CircularProgress size='20px' /> : <Android />}
                                >Compilar una version</Button>
                            </Grid>
                            <Grid item xs={build ? 4 : 0} className="scroll" sx={{ opacity: build ? 1 : 0, transition: '200ms', height: '55vh', width: build ? undefined : '0px', overflowX: 'scroll', overflowY: 'scroll', }}>
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

                {
                    openConsole &&
                    <Grid sx={{ position: 'absolute', bottom: 10, width: '50%' }}>
                        <Console sx={{ height: '200px', overflowY: 'scroll' }}>
                            {
                                payloads.map((e, i) => (
                                    <div key={`log-key-${i}`}>
                                        {e?.workflow_job?.run_id || e?.workflow_run?.id && <Typography variant="overline">Run id [<Typography variant='overline' color='secondary'>{e?.workflow_job?.run_id || e?.workflow_run?.id}</Typography>]</Typography>}
                                        <br />
                                        {e?.workflow_job?.name && <Typography variant="overline">Workflow Name [<Typography variant='overline' color='secondary'>{e?.workflow_job?.name}</Typography>]</Typography>}
                                        <br />
                                        {(e?.workflow_job?.status || e?.workflow?.state) && <Typography variant="overline">Workflow State <Typography variant='overline' color='secondary'>{e?.workflow_job?.status}</Typography></Typography>}
                                        {
                                            e?.workflow_job?.status || e?.workflow?.state &&
                                            <img style={{ marginLeft: 10, marginTop: 5 }} src={`https://img.shields.io/badge/${e?.workflow_job?.status || e?.workflow?.state}-${status[(e?.workflow_job?.status || e?.workflow?.state) as keyof typeof status] || 'gray'}`} alt='img-badget' />
                                        }
                                    </div>
                                ))
                            }
                        </Console>
                    </Grid>
                }
            </Grid>
        </LayoutBuilder>
    )
}

const status = {
    'active': 'green',
    'completed': 'green',
    'queued': 'blue',
    'error': 'red'
}