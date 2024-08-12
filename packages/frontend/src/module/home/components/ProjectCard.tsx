import { Chip, Grid, Typography } from "@mui/material"
import { Tables } from "../../../database.types"
import { Android, Apple, Tv } from "@mui/icons-material"
import { useTags } from "../../../utils/hooks/useTags"
import { useMemo } from "react"
import moment from 'moment';
import { useProject } from "../../../utils/hooks/useProjects"
import { useNavigate } from "react-router-dom"

export const ProjectCard = ({ project }: { project: Tables<'projects'> }) => {
    const tags = useTags(state => state.tags)
    const setProject = useProject(state => state.setProject)
    const tag = useMemo(() => tags.find(e => e.id === project.targets_id), [tags, project])
    const linkTo = useNavigate()
    return (
        <Grid container
            onClick={() => {
                setProject(project);
                linkTo(`/workspace?projectID=${project.id}`)
            }}
            sx={{
                backgroundColor: '#1f1f1f', transition: '200ms', cursor: 'pointer', width: '350px', borderRadius: 2, height: 170, p: 1, ':hover': {
                    transform: 'scale(0.95)'
                }
            }}>
            <Grid item xs={12}>
                <Typography variant="overline" >{project.name}</Typography>
                <Grid sx={{ width: '100%', height: '3px', bgcolor: 'success.main' }} />
            </Grid>
            <Grid item xs={6} sx={{ borderRight: '2px dashed #FFFFFF10', height: '65%', mt: 1 }}>
                <Typography variant='caption' sx={{ fontSize: 9, color: '#FFFFFF80', display: 'block', mb: 1 }}>
                    <strong>Description</strong>:   {(project?.description ?? '').length! > 25 ? project?.description?.substring(0, 25)?.concat('...') : project?.description}
                </Typography>
                <Typography variant='caption' sx={{ fontSize: 10, color: '#FFFFFF80', display: 'block', my: 1, mt: 3 }}>Creado el {moment(project.created_at).format('DD - MM - YYYY')}</Typography>
            </Grid>
            <Grid item container xs={6}>
                <Grid item xs={12} sx={{ p: 1, gap: 1, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Android color='success' />
                    <Apple color='info' />
                    <Tv color='error' />

                </Grid>
                <Grid item xs={12} sx={{ p: 1, gap: 1, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>

                    {
                        tag &&
                        <Chip size="small" label={tag.name} sx={{ bgcolor: tag.color, fontSize: 10, ':hover': { opacity: 0.8, cursor: 'pointer' } }} />
                    }
                </Grid>
            </Grid>
        </Grid >
    )
}
