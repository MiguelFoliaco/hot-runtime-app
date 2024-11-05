import { Button, Grid, Skeleton, Typography } from "@mui/material"
import { LayoutBuilder } from "../../layouts/builders"
import { LeftBar } from "./components/LeftBar"
import { useUser } from "../auth/context/user.context"
import { ProjectList } from "./components/ProjectList"
import { useProject } from "../../utils/hooks/useProjects"
import { useEffect, useState } from "react"
import { getProjects, getTags } from "./services/projects"
import { CreateProject } from "./components/CreateProject"
import { useTags } from "../../utils/hooks/useTags"
import { useVersion } from "../../utils/hooks/useVersion"
import { getOS } from "./services/version"

export const Home = () => {
    const user = useUser(state => state.values.user)
    const [createProject, setCreateProject] = useState(false);
    const { oss, setOSs } = useVersion(state => state)
    const [isLoading, setIsLoading] = useState(false)
    const { projects, setProjects } = useProject(state => state)
    const { setTags, tags } = useTags(state => state)

    useEffect(() => {
        if (projects.length === 0) {
            setIsLoading(true)
            getProjects({ setProjevt: setProjects })
                .finally(() => {
                    setIsLoading(false)
                })
        }
        if (tags.length === 0) {
            setIsLoading(true)
            getTags({ setTags })
                .finally(() => {
                    setIsLoading(false)
                })
        }
        if (oss.length === 0) {
            getOS(setOSs)
        }
    }, [])
    return (
        <LayoutBuilder
            listItemsLeft={LeftBar}
        >
            <Grid>
                <Grid maxHeight={'min-content'} sx={{ mb: 4, }}>
                    <Typography>Hola {user?.user_metadata?.name || user?.email}</Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        {
                            isLoading ?
                                <Grid sx={{ width: '90vw', height: 500 }}>
                                    <Skeleton width='100%' height='100%' />
                                </Grid>
                                :
                                <>
                                    {
                                        projects.length > 0 ?
                                            <ProjectList />
                                            :
                                            <CreateProject closeModal={() => setCreateProject(false)} />
                                    }
                                    {
                                        createProject && <CreateProject closeModal={() => setCreateProject(false)} />
                                    }
                                </>
                        }
                    </Grid>
                </Grid>
                <Button onClick={() => {
                    setCreateProject(true)
                }} color="secondary" sx={{ position: 'absolute', bottom: 10, right: 10 }}>Crear uno nuevo</Button>
            </Grid>
        </LayoutBuilder >
    )
}
