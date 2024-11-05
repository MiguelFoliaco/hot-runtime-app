import { Grid, IconButton, Typography } from "@mui/material"
import { ProjectCard } from "./ProjectCard"
import { useProject } from "../../../utils/hooks/useProjects"
import { Cached } from "@mui/icons-material"
import { supabaseClient } from "../../../data/supabase"
import { useState } from "react"

export const ProjectList = () => {
    const projects = useProject(state => state.projects)
    const setProjects = useProject(state => state.setProjects)
    const [isLoading, setIsLoading] = useState(false)

    const reload = async () => {
        clearTimeout(id)
        // eslint-disable-next-line no-var
        var id: NodeJS.Timeout | undefined = undefined
        setIsLoading(true)
        const data = await supabaseClient.from('projects').select();
        if (data.data) {
            setProjects(data.data)
        }
        id = setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }
    return (
        <Grid sx={{ gap: 2, display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Grid sx={{ height: 'min-content', p: 0.5, px: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }} >
                <Typography variant="overline">
                    Proyectos
                </Typography>
                <IconButton
                    disabled={isLoading}
                    onClick={reload}
                >
                    <Cached className={isLoading ? "rotation" : undefined} />
                </IconButton>
            </Grid>
            <Grid
                display='grid'
                className="scroll"
                xs={12}
                gap={1}
                sx={{
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px,400px))',
                    width: '90vw',
                    margin: 'auto',
                    overflowY: 'scroll',
                }}>
                {
                    projects.map(e => (
                        <Grid key={e.id}>
                            <ProjectCard project={e} />
                        </Grid>
                    ))
                }
            </Grid>
        </Grid>
    )
}
