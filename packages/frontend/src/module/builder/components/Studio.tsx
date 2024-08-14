import { Button, FormControlLabel, Grid, Checkbox, MenuItem, Modal, Select, Skeleton, TextField, Typography } from "@mui/material"
import { useProject } from "../../../utils/hooks/useProjects"
import { useComponents } from "../../../utils/hooks/useComponent"
import { memo, useCallback, useEffect, useState } from "react"
import { Tables } from "../../../database.types"
import { supabaseClient } from "../../../data/supabase"
import { isEqual } from "lodash"
import { Flows } from "./Flows"
import { EditorJSX } from "./Editor"
import { PhoneAndroid } from "@mui/icons-material"
import { useVersion } from "../../../utils/hooks/useVersion"
import { useUser } from "../../auth/context/user.context"
import { getOS } from "../../home/services/version"
import { api } from "../services/http"
import { PostgrestResponse } from "@supabase/supabase-js"


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
    const user = useUser(state => state.values.user!)
    const session = useUser(state => state.values.session!)
    const { oss, setOSs } = useVersion(state => state)
    const [osSelected, setOsSelected] = useState(0)
    const { components, setComponents, setComponent, componentSelected } = useComponents(state => state)
    const [loadingComponent, setLoadingComponent] = useState(false)
    const [editor, setEditor] = useState(false)
    const [openModalVersion, setOpenModalVersion] = useState(false)
    const [version, setVersion] = useState<Tables<'version-code'>>({
        available_production: false,
        available_test: true,
        code_build: '',
        code_jsx: '',
        created_at: new Date().toISOString(),
        os_id: 0,
        projectid: project.id,
        publicateBy: user.id,
        name: '',
        id: 0
    })
    const [name, setName] = useState('')
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
        try {
            const code = components.map(e => e.codeJSX);
            const v: Tables<'version-code'> = {
                ...version,
                code_jsx: code.join('\n'),
                os_id: osSelected,
                name
            }
            console.log(v)
            api.method = 'post'
            api.bodyInit = v
            const versionRequest = await api.rest<PostgrestResponse<null>>('/generate-code', {
                headers: {
                    Authorization: `Bearer ${session.access_token}`
                }
            });
            console.log(versionRequest, "Version response")
            setOpenModalVersion(false)
            setVersion({
                available_production: false,
                available_test: true,
                code_build: '',
                code_jsx: '',
                created_at: new Date().toISOString(),
                os_id: 0,
                projectid: project.id,
                publicateBy: user.id,
                name: '',
                id: 0
            })
            setName('')
        }
        catch (err) {
            console.log(err)
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
                <Grid container sx={{ width: '45vw', height: '40vh', bgcolor: '#1f1f1f', p: 1 }}>
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
                        <Button fullWidth onClick={() => generateVersion()}>Guardar</Button>
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
                        <Button onClick={() => setOpenModalVersion(true)} size='small'>{'Generar Version'}</Button>
                        <Button onClick={() => setEditor(!editor)} size='small'>{editor ? 'Flow' : 'Escribir codigo'}</Button>
                    </Grid>
                    <Grid item xs={12} sx={{ p: 1 }}>
                        {
                            editor ?
                                <EditorJSX />
                                :
                                <Flows />
                        }
                    </Grid>
                    <Grid item xs={12} sx={{ p: 1, display: 'flex', gap: 2 }}>
                        <Grid sx={{ transition: '200ms', width: editor ? '0%' : '50%', opacity: editor ? 0 : 1, height: '160px', borderRadius: 3, bgcolor: '#1f1f1f' }}>

                        </Grid>
                        <Grid sx={{ transition: '200ms', width: editor ? '100%' : '50%', height: '160px', borderRadius: 3, bgcolor: '#1f1f1f' }}>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}


export const Studio = memo(StudioWithOutMemo, isEqual)