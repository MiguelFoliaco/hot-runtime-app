import { Button, Grid, Skeleton, Typography } from "@mui/material"
import { useProject } from "../../../utils/hooks/useProjects"
import { useComponents } from "../../../utils/hooks/useComponent"
import { memo, useEffect, useState } from "react"
import { Tables } from "../../../database.types"
import { supabaseClient } from "../../../data/supabase"
import { isEqual } from "lodash"
import { Flows } from "./Flows"
import { EditorJSX } from "./Editor"


let render = 0;
const getComponent = async (setComponents: (data: Tables<'components'>[]) => void, projectId: number) => {
    const request = await supabaseClient.from('components').select().eq("projectId", projectId);
    console.log("Request --->", request)
    if (request.data) {
        setComponents(request.data)
    }
}

const generateVersion = async (id: number, components: Tables<'components'>[]) => {
    const code = components.map(e => e.codeJSX);
    console.log(code.join(`\n`))
}

export const StudioWithOutMemo = () => {
    const project = useProject(state => state.projectSelected!)
    const { components, setComponents, setComponent, componentSelected } = useComponents(state => state)
    const [loadingComponent, setLoadingComponent] = useState(false)
    const [editor, setEditor] = useState(false)

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

    return (
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
                                            onClick={() => {
                                                setComponent(e)
                                            }}
                                            sx={{
                                                transition: '200ms',
                                                cursor: 'pointer',
                                                ':hover': {
                                                    pl: 1
                                                }
                                            }}
                                        >
                                            <Typography variant="overline" color={e.id === componentSelected?.id ? 'primary.main' : 'white'} key={`code-item-${e.id}`}>{e.name}</Typography>
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
                    <Button onClick={() => generateVersion(project.id, components)} size='small'>{'Generar Version'}</Button>
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
    )
}


export const Studio = memo(StudioWithOutMemo, isEqual)