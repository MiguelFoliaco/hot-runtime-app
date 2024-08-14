import { Alert, CircularProgress, Grid, IconButton, Snackbar, Typography } from "@mui/material"
import { LayoutBuilder } from "../../layouts/builders"
import { LeftBar } from "../home/components/LeftBar"
import { useProject } from "../../utils/hooks/useProjects"
import { useEffect, useState } from "react"
import { Tables } from "../../database.types"
import { supabaseClient } from "../../data/supabase"
import { Close } from "@mui/icons-material"
import { Studio } from "./components/Studio"



const getProjects = async (setProject: (data: Tables<'projects'>) => void, setError: (data: { msg: string, show: boolean }) => void, href: URLSearchParams) => {
    const id = href.get('projectID') || 'NaN'
    console.log("project -->", href.get('projectID'), isNaN(parseInt(id)))
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

export const Workspace = () => {

    const { projectSelected, setProject } = useProject(state => state);
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState({ msg: '', show: false })
    const href = new URLSearchParams(location.search)

    useEffect(() => {
        if (!projectSelected) {
            setLoading(true)
            getProjects(setProject, setShowError, href)
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [])


    return (
        <LayoutBuilder
            listItemsLeft={LeftBar}
        >
            {
                loading ?
                    <CircularProgress sx={{ m: 'auto', top: 0, bottom: 0, left: 0, right: 0, position: 'absolute' }} />
                    :
                    <Grid container height='100%'>
                        <Grid item xs={12}>
                            {
                                projectSelected &&
                                <Studio />
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
        </LayoutBuilder>
    )
}
