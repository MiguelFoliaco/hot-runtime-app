import { Button, FormControlLabel, Grid, Checkbox, MenuItem, Modal, Select, Skeleton, TextField, Typography, FormLabel, CircularProgress } from "@mui/material"
import { useProject } from "../../../utils/hooks/useProjects"
import { useComponents } from "../../../utils/hooks/useComponent"
import { memo, useEffect, useState } from "react"
import { Tables } from "../../../database.types"
import { supabaseClient } from "../../../data/supabase"
import { isEqual } from "lodash"
import { EditorJSX } from "./Editor"
import { PhoneAndroid } from "@mui/icons-material"
import { useVersion } from "../../../utils/hooks/useVersion"
import { useUser } from "../../auth/context/user.context"
import { getOS } from "../../home/services/version"
import { api } from "../services/http"
import moment from "moment"
import { DateTimePicker } from "@mui/x-date-pickers"
import { useAlert } from "../../../layouts/components/AlertGlobal"
import { Console } from "./Console"
import { useNavigate } from "react-router-dom"
import { Form } from "./Forms"


let render = 0;


const getComponent = async (setComponents: (data: Tables<'components'>[]) => void, projectId: number) => {
    const request = await supabaseClient.from('components').select().eq("projectid", projectId);
    console.log("Request --->", request)
    if (request.data) {
        setComponents(request.data)
    }
}



export const StudioWithOutMemo = () => {
    const project = useProject(state => state.projectSelected!)
    const showAlert = useAlert(state => state.openAlert)
    const user = useUser(state => state.values.user!)
    const session = useUser(state => state.values.session!)
    const { oss, setOSs } = useVersion(state => state)
    const [osSelected, setOsSelected] = useState(0)
    const { components, setComponents, setComponent, componentSelected } = useComponents(state => state)
    const [loadingComponent, setLoadingComponent] = useState(false)
    const [editor, setEditor] = useState(false)
    const [loadgenerateCode, setLoadgenerateCode] = useState(false)
    const [openModalVersion, setOpenModalVersion] = useState(false)
    const [infoCompilation, setInfoCompilation] = useState('')
    const [version, setVersion] = useState<Tables<'version-code'>>({
        available_production: false,
        available_test: true,
        code_build: '',
        code_jsx: '',
        created_at: new Date().toISOString(),
        programing_date: moment().toISOString(),
        os_id: 0,
        projectid: project.id,
        publicate_by_email: user.email || '',
        publicateBy: user.id,
        name: '',
        id: 0
    })
    const [programing_date, setPrograming_date] = useState(moment(version.programing_date))
    const [name, setName] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        console.log('cambia?')
        if (project?.id !== undefined && render <= 2) {
            setLoadingComponent(true)
            getComponent(setComponents, project.id)
                .finally(() => {
                    setLoadingComponent(false)
                    render += 1;
                })
        }
    }, [project.id, setComponents])

    useEffect(() => {
        if (oss.length === 0) {
            getOS(setOSs)
                .finally(() => {
                    setOsSelected(oss[0].id)
                })
        }
    }, [])

    const generateVersion = async () => {
        if (osSelected === 0) {
            return showAlert({
                msg: 'El campo OS es obligatorio',
                severity: 'warning',
                show: true,
            })
        }
        if (name.trim().length == 0) {
            return showAlert({
                msg: 'El campo nombre es obligatorio y no puede estar vacio',
                severity: 'warning',
                show: true,
            })
        }
        try {
            const code = components.map(e => e.codeJSX);
            const v: Tables<'version-code'> = {
                ...version,
                code_jsx: code.join('\n'),
                os_id: osSelected,
                programing_date: programing_date.toISOString(),
                name,
            }

            console.log(v)
            api.method = 'post'
            api.bodyInit = v
            setLoadgenerateCode(true)
            const generate = await api.rest<{ error: null | boolean | string, statusText: string }>('/generate-code', {
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            });
            setOpenModalVersion(false)
            setVersion({
                available_production: false,
                available_test: true,
                code_build: '',
                code_jsx: '',
                created_at: new Date().toISOString(),
                programing_date: moment().toISOString(),
                publicate_by_email: user.email || '',
                os_id: 0,
                projectid: project.id,
                publicateBy: user.id,
                name: '',
                id: 0
            })
            setName('')
            setLoadgenerateCode(false)
            if (generate) {
                if (generate.statusText.toLocaleLowerCase() === 'created') {
                    showAlert({
                        msg: 'Se creo la version correctamente',
                        severity: 'success',
                        show: true
                    })
                    setInfoCompilation('')
                }
                if (generate.statusText.toLocaleLowerCase() === "error en compilación") {
                    showAlert({
                        msg: String(generate.error),
                        severity: 'error',
                    })
                    setInfoCompilation(String(generate.error))
                }
            }
            else {
                showAlert({
                    msg: "Ocurrio un error al realizar el proceso, por favor intentelo mas tarde",
                    severity: 'error',
                })
                setInfoCompilation("Ocurrio un error al realizar el proceso, por favor intentelo mas tarde")
            }

        }
        catch (err) {
            showAlert({
                msg: "Ocurrio un error al realizar el proceso, por favor intentelo mas tarde",
                severity: 'error',
            })
            console.log("Error generate", err)
        }
    }

    return (
        <>
            <Modal
                open={openModalVersion}
                onClose={() => setOpenModalVersion(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Grid container sx={{ width: '45vw', height: 'min-content', p: 2, bgcolor: '#1f1f1f', borderRadius: 1 }}>
                    <Grid item xs={12}>
                        <Typography>Generar una nueva versión</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth size='small' placeholder="Nombre de la version" />
                    </Grid>
                    <Grid item xs={4}>
                        <Select
                            size='small'
                            onChange={(e) => {
                                console.log(e.target.value)
                                setOsSelected(parseInt(e.target.value.toString()))
                            }}
                            value={osSelected}
                            placeholder='OS'
                            fullWidth
                        >
                            <MenuItem value={'0'} selected>Sel. OS</MenuItem>
                            {
                                oss.map(e => (
                                    <MenuItem value={e.id.toString()} key={`Os_id-${e.id}`}>{e.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={12} sx={{ my: 2 }}>
                        <FormLabel>Fecha y Hora de programación</FormLabel>
                        <DateTimePicker
                            sx={{ width: '100%' }}
                            slotProps={{
                                textField: {
                                    size: 'small'
                                }
                            }}
                            value={programing_date}
                            onChange={(e) => {
                                if (e) {
                                    setPrograming_date(e)
                                }
                            }}
                        />
                        {/* <TextField
                            fullWidth
                            InputProps={{
                                endAdornment: <DateRange />
                            }}
                            size='small'
                            type="datetime-local"
                            value={moment(version.programing_date).toString()}
                            onChange={(e) => setVersion({ ...version, programing_date: e.target.value })}
                        /> */}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            labelPlacement="start"
                            label='Disponible para produccion'
                            control={<Checkbox checked={version.available_production} onChange={() => setVersion({ ...version, available_production: !version.available_production })} sx={{ ml: 1 }} />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            labelPlacement="start"
                            label='Disponible para test'
                            control={<Checkbox checked={version.available_test} onChange={() => setVersion({ ...version, available_test: !version.available_test })} sx={{ ml: 1 }} />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            endIcon={loadgenerateCode && <CircularProgress size={'20px'} />}
                            disabled={loadgenerateCode}
                            fullWidth onClick={() => generateVersion()}>Guardar</Button>
                    </Grid>
                </Grid>
            </Modal>
            <Grid container sx={{ height: '92vh', }} spacing={1}>
                <Grid item xs={2} sx={{ width: '100%', bgcolor: '#1f1f1f', borderRadius: 1, p: 1 }}>
                    {
                        loadingComponent ?
                            <Skeleton variant="rectangular" height='90%' width={'90%'} sx={{ m: 'auto', mt: '15%', borderRadius: 1 }} />
                            :
                            <>
                                <Typography variant='overline' sx={{ mb: 2 }}>Componentes</Typography>

                                <Grid
                                    sx={{
                                        my: 2, transition: '200ms', borderTop: '1px dashed #FFFFFF30', borderBottom: '1px dashed #FFFFFF30', py: 1,
                                    }}>
                                    {
                                        components.map(e => (
                                            <Grid
                                                key={`component-item-list${e.id}`}
                                                onClick={() => {
                                                    setComponent(e)
                                                }}
                                                sx={{
                                                    transition: '200ms',
                                                    display: 'flex',
                                                    cursor: 'pointer',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    ':hover': {
                                                        pl: 1
                                                    }
                                                }}
                                            >
                                                <Typography variant="overline" color={e.id === componentSelected?.id ? 'primary.main' : 'white'} key={`code-item-${e.id}`}>{e.name}</Typography>
                                                {
                                                    e.main_component == true && <PhoneAndroid color='success' fontSize="small" />
                                                }
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                                <Button size='small' fullWidth>Crear</Button>
                            </>
                    }
                </Grid>
                <Grid item container xs={10}>
                    <Grid item xs={12} sx={{ p: 1, justifyContent: 'space-between', display: 'flex' }}>
                        <Typography variant='overline'>{project?.name}</Typography>
                        <Button onClick={() => navigate(`/workspace/versions?projectID=${project.id}`)} size='small'>{'Listado de versiones'}</Button>
                        <Button onClick={() => setOpenModalVersion(true)} size='small'>{'Generar Version'}</Button>
                        <Button onClick={() => setEditor(!editor)} size='small'>{editor ? 'Formulario' : 'Escribir codigo'}</Button>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 1 }}>
                        {
                            editor ?
                                <EditorJSX />
                                :
                                <Form setInfoCompilation={setInfoCompilation} />
                        }
                    </Grid>
                    <Grid item xs={12} sx={{ p: 1, display: 'flex', gap: 2 }}>
                        <Console text={infoCompilation} />
                        <Grid sx={{ transition: '200ms', width: '50%', height: '160px', borderRadius: 3, bgcolor: '#1f1f1f' }}>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}


export const Studio = memo(StudioWithOutMemo, isEqual)