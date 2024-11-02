import { Alert, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar } from "@mui/material"
import { LayoutBuilder } from "../../layouts/builders"
import { LeftBar } from "../home/components/LeftBar"
import { useProject } from "../../utils/hooks/useProjects"
import { useEffect, useState } from "react"
import { Tables } from "../../database.types"
import { supabaseClient } from "../../data/supabase"
import { Close } from "@mui/icons-material"
import { VersionsStudio } from "./components/Version/studio"
import { api } from "./services/http"
import { useVersion } from "../../utils/hooks/useVersion"
import { getOS } from "../home/services/version"



const getProjects = async (setProject: (data: Tables<'projects'>) => void, setError: (data: { msg: string, show: boolean }) => void, href: URLSearchParams) => {
    const id = href.get('projectID') || 'NaN'
    if (!isNaN(parseInt(id))) {
        const project = await supabaseClient.from('projects').select().eq('id', parseInt(id))
        if (project.data !== null) {
            if (project.data[0]) {
                setProject(project.data[0])
            }
            else {
                setError({ msg: 'El proyecto no fu encontrado', show: true })
            }
        } else {
            setError({ msg: project.error.code, show: true })
        }
    } else {
        setError({ msg: 'El id del proyecto no es valido', show: true })
    }
}

const getVersions = async (setData: (data: Tables<'version-code'>[]) => void, projectId: number, oss: Tables<'OS'>[]) => {
    const promises: Promise<Tables<'version-code'> | null>[] = []
    for await (const item of oss) {
        api.method = 'get'
        const d = api.rest<Tables<'version-code'>>(`/version?projectId=${projectId}&os_id=${item.id}&all=true`)
        if (d) {
            promises.push(d)
        }
    }
    const promisesResolve = await Promise.all(promises)
    setData(promisesResolve.filter(e => e !== null))
}

export const Versions = () => {

    const { projectSelected, setProject, projects } = useProject(state => state);
    const { setVersionProduction, oss, setOSs } = useVersion()
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState({ msg: '', show: false })
    const href = new URLSearchParams(location.search)

    useEffect(() => {
        if (!projectSelected) {
            const fn = async () => {
                setLoading(true)
                await getOS(setOSs)
                await getProjects(setProject, setShowError, href)
                setLoading(false)
            }
            fn()
        }
    }, [])

    useEffect(() => {
        const fn = async () => {
            setLoading(true)
            if (projectSelected) {
                await getVersions(setVersionProduction, projectSelected?.id, oss)
            }
            setLoading(false)
        }
        if (oss.length !== 0 && projectSelected) {
            fn()
        }
    }, [oss, projectSelected])


    return (
        <LayoutBuilder
            listItemsLeft={LeftBar}
        >
            <Grid item xs={12}>
                <FormControl sx={{ width: 300, my: 2 }}>
                    <InputLabel size="small" id="demo-simple-select-label">Proyecto</InputLabel>
                    <Select
                        size="small"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={projectSelected?.id}
                        label="Proyecto"
                        onChange={(event) => {
                            const p = projects.find(e => event.target.value == e.id)
                            if (p) {
                                setProject(p)
                            }
                        }}
                    >
                        {
                            projects.map(e => (
                                <MenuItem value={e.id} key={`project-item-version-${e.id}`}>{e.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                {
                    loading ?
                        <CircularProgress sx={{ m: 'auto', top: 0, bottom: 0, left: 0, right: 0, position: 'absolute' }} />
                        :
                        <Grid container height={'85%'} >
                            <Grid item xs={12}>
                                {
                                    projectSelected &&
                                    <VersionsStudio />
                                }
                            </Grid>
                        </Grid>
                }

                <Snackbar open={showError.show} autoHideDuration={5000} >
                    <Alert severity="error">{showError.msg}
                        <IconButton onClick={() => setShowError({ msg: '', show: false })} color={'error'} size='small' sx={{ ml: 1 }}>
                            <Close fontSize='small' />
                        </IconButton>
                    </Alert>
                </Snackbar>
            </Grid>
        </LayoutBuilder>
    )
}
