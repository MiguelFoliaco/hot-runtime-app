import { Grid, Skeleton, Typography } from "@mui/material"
import { LayoutBuilder } from "../../layouts/builders"
import { LeftBar } from "./components/LeftBar"
import { useUser } from "../auth/context/user.context"
import { ProjectList } from "./components/ProjectList"
import { useProject } from "../../utils/hooks/useProjects"
import { useEffect, useState } from "react"
import { getProjects, getTags } from "./services/projects"
import { CreateProject } from "./components/CreateProject"
import { useTags } from "../../utils/hooks/useTags"

export const Home = () => {
    const user = useUser(state => state.values.user)
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
    }, [])
    return (
        <LayoutBuilder
            listItemsLeft={LeftBar}
        >
            <Grid>
                <Grid maxHeight={'min-content'} sx={{ mb: 4 }}>
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
                                            <CreateProject />
                                    }
                                </>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </LayoutBuilder >
    )
}
