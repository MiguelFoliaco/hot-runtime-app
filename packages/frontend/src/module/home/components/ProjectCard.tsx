import { Chip, Grid, Typography } from "@mui/material"
import { Tables } from "../../../database.types"
import { Android, Apple, Tv } from "@mui/icons-material"

export const ProjectCard = ({ project }: { project: Tables<'projects'> }) => {
    return (
        <Grid container sx={{ backgroundColor: '#1f1f1f', width: '350px', borderRadius: 2, height: 170, p: 1 }}>
            <Grid item xs={12}>
                <Typography variant="overline" >Project Name</Typography>
                <Grid sx={{ width: '100%', height: '3px', bgcolor: 'success.main' }} />
            </Grid>
            <Grid item xs={6} sx={{ borderRight: '2px dashed #FFFFFF10', height: '65%', mt: 1 }}>
                <Typography variant='caption' sx={{ fontSize: 9, color: '#FFFFFF80', display: 'block', mb: 1 }}>
                    <strong>Description</strong>:   Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quas corrupti impedit nihil!...
                </Typography>
                <Typography variant='caption' sx={{ fontSize: 10, color: '#FFFFFF80', display: 'block', my: 1 }}>Last update 27/10/2024</Typography>
                <Typography variant='caption' sx={{ fontSize: 10, color: '#FFFFFF80', display: 'block' }}>Created 27/10/2024</Typography>
            </Grid>
            <Grid item container xs={6}>
                <Grid item xs={12} sx={{ p: 1, gap: 1, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Android color='success' />
                    <Apple color='info' />
                    <Tv color='error' />

                </Grid>
                <Grid item xs={12} sx={{ p: 1, gap: 1, display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <Chip size="small" label="Target1" sx={{ fontSize: 10, ':hover': { opacity: 0.8, cursor: 'pointer' } }} />
                    <Chip size="small" label="Target1" sx={{ fontSize: 10, ':hover': { opacity: 0.8, cursor: 'pointer' } }} />
                </Grid>
            </Grid>
        </Grid>
    )
}
