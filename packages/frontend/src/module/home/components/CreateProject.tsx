import { Button, Grid, Modal, Paper, TextField, Typography } from "@mui/material"

export const CreateProject = () => {
    return (
        <Modal
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            open={true}>
            <Paper sx={{ width: '400px', height: '400px', p: 2 }}>
                <Grid container>
                    <Grid item xs={12} sx={{ mb: 2 }} >
                        <Typography variant="overline">Configura tu primer Proyecto</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ my: 1.3 }} >
                        <TextField fullWidth label='Nombre de projecto' required size='small' />
                    </Grid>
                    <Grid item xs={12} sx={{ my: 1.3 }} >
                        <TextField fullWidth label='Etiquetas' required size='small' />
                    </Grid>
                    <Grid item xs={12} sx={{ my: 1.3 }} >
                        <TextField multiline rows={3} fullWidth label='Descripcion' size='small' />
                    </Grid>
                    <Grid item xs={12} sx={{ my: 1.3 }} >
                        <Button fullWidth >Guardar</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}
