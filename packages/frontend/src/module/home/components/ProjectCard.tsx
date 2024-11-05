import { Chip, Grid, IconButton, Tooltip, Typography } from "@mui/material"
import { Tables } from "../../../database.types"
import { Android, Apple, ContentCopy, Tv } from "@mui/icons-material"
import { useTags } from "../../../utils/hooks/useTags"
import { useMemo } from "react"
import moment from 'moment';
import { useProject } from "../../../utils/hooks/useProjects"
import { useNavigate } from "react-router-dom"
import { useAlert } from './../../../layouts/components/AlertGlobal';

export const ProjectCard = ({ project }: { project: Tables<'projects'> }) => {
    const tags = useTags(state => state.tags)

    const setProject = useProject(state => state.setProject)
    const { openAlert } = useAlert()
    const tag = useMemo(() => tags.find(e => e.id === project.targets_id), [tags, project])
    const linkTo = useNavigate()

    const copy = async () => {
        const url = `http://192.168.1.12:3000/api/version?projectId=${project.id}&os_id=seleccione_uno`
        await navigator.clipboard.writeText(url)
        openAlert({
            msg: 'La url se a copiado exitosamente',
            severity: 'info'
        })
    }

    return (
        <Grid container
            sx={{
                bgcolor: 'background.paper',
                boxShadow: t => `3px 3px 6px ${t.palette.text.primary}10`,
                border: t => `1px solid ${t.palette.text.disabled}`,
                transition: '200ms', cursor: 'pointer', width: '350px', borderRadius: 2, height: 170, p: 1, ':hover': {
                    transform: 'scale(0.95)'
                }
            }}>
            <Grid item xs={12}>
                <Grid container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="overline"
                        sx={{ ':hover': { color: 'secondary.main' } }}
                        onClick={() => {
                            setProject(project);
                            linkTo(`/workspace?projectID=${project.id}`)
                        }}
                    >{project.name}</Typography>
                    <div onClick={copy}>
                        <Tooltip title='Copiar url de conexión'>
                            <IconButton size="small">
                                <ContentCopy fontSize="small" color='primary' />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Grid>
                <Grid sx={{ width: '100%', height: '3px', bgcolor: 'secondary.main' }} />
            </Grid>
            <Grid item xs={6} sx={{ borderRight: t => `2px dashed ${t.palette.text.primary}10`, height: '65%', mt: 1, }}>
                <Typography variant='caption' sx={{ fontSize: 9, display: 'block', mb: 1 }}>
                    <strong>Description</strong>:   {(project?.description ?? '').length > 25 ? project?.description?.substring(0, 25)?.concat('...') : project?.description}
                </Typography>
                <Typography variant='caption' sx={{ fontSize: 10, display: 'block', my: 1, mt: 3 }}>Creado el {moment(project.created_at).format('DD - MM - YYYY')}</Typography>
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

