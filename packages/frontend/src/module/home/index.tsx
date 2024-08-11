import { Grid, Skeleton, Typography } from "@mui/material"
import { LayoutBuilder } from "../../layouts/builders"
import { LeftBar } from "./components/LeftBar"
import { useUser } from "../auth/context/user.context"
import { ProjectList } from "./components/ProjectList"
import { useProject } from "../../utils/hooks/useProjects"
import { useEffect, useState } from "react"
import { getProjects } from "./services/projects"
import { CreateProject } from "./components/CreateProject"

export const Home = () => {
    const user = useUser(state => state.values.user)
    const [isLoading, setIsLoading] = useState(false)
    const { projects, setProjects } = useProject(state => state)

    useEffect(() => {
        if (projects.length === 0) {
            setIsLoading(true)
            getProjects({ setProjevt: setProjects })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }, [])
    return (
        <LayoutBuilder
            listItemsLeft={LeftBar}
        >
            <Typography>Hola {user?.user_metadata?.name || user?.email}</Typography>
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
        </LayoutBuilder >
    )
}
