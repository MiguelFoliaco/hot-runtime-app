//import { Check } from "@mui/icons-material";
import { Button, CircularProgress, Grid, Modal, Paper, TextField, Typography } from "@mui/material"
//import { blue, green, purple, red, yellow } from "@mui/material/colors";
import { supabaseClient } from "../../../data/supabase";
import { useUser } from "../../auth/context/user.context";
import { useState } from "react";
import { useProject } from "../../../utils/hooks/useProjects";


//const colors = [red[800], blue[900], green[700], purple[900], yellow[900]]

export const CreateProject = ({ closeModal }: { closeModal?: () => void }) => {

    const { values: { user } } = useUser()
    const setProjects = useProject(state => state.setProjects)
    const [loading, setLoading] = useState(false)
    //const tagsDB = useTags(state => state.tags)
    //const [tagText, setTagText] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    // const [tags, setTags] = useState<{ name: string, id: string, colors: string }[]>([])

    const saveProject = async () => {
        setLoading(true)
        try {
            if (user?.email) {
                const project = await supabaseClient.from('projects').insert({
                    name,
                    publicateBy: user.id,
                    description,
                })
                if (!project.error) {
                    if (closeModal) {
                        closeModal()
                    }
                }
                if (project.data) {
                    alert('Se creo el projecto, redirigiendo...')
                }

            }
        }
        catch (err) {
            console.log(err)
        }
        const projects = await supabaseClient.from('projects').select()
        if (projects.data) {
            setProjects(projects.data)
        }
        setLoading(false)
    }


    return (
        <Modal
            onClose={closeModal}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            open={true}>
            <Paper sx={{ width: '400px', height: '300px', p: 2 }}>
                <Grid container>
                    <Grid item xs={12} sx={{ mb: 2 }} >
                        <Typography variant="overline">Configura tu primer Proyecto</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ my: 1.3 }} >
                        <TextField disabled={loading} value={name} onChange={(e) => setName(e.target.value)} fullWidth label='Nombre de projecto' required size='small' />
                    </Grid>
                    {/* <Grid item xs={12} sx={{ my: 1.3 }} >
                        <Grid display={'flex'} >

                            <Autocomplete
                                className="left-radius-none"
                                disablePortal
                                options={tagsDB}
                                renderOption={(params, data) => <MenuItem {...params}>{data.name}</MenuItem>}
                                disabled={tags.length >= 3}
                                renderInput={(params) => <TextField {...params}
                                    disabled={tags.length >= 3} value={tagText} onChange={(e) => {
                                        setTagText(e.target.value.toLowerCase())
                                    }}
                                    fullWidth
                                    label='Etiquetas'
                                    required
                                    size='small'
                                />}

                                fullWidth

                            />
                            <Button
                                onClick={() => {
                                    const index = random(0, colors.length - 1);
                                    if (tags.length < 3) {
                                        if (tags.find(e => e.name === tagText)) {
                                            alert('El elemento ya existe')
                                            return;
                                        }
                                        setTags(state => state.concat({ name: tagText, id: '', colors: colors[index] }))
                                        setTagText('')
                                    }
                                }}
                                size="large" sx={{ height: '100%', borderLeft: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                                <Check />
                            </Button>
                        </Grid>
                        <FormHelperText sx={{ fontSize: 10 }}>Maximo 3 etiquetas por projecto</FormHelperText>
                        {
                            tags.map(e => (
                                <Chip key={e.name} sx={{ mx: 1, mt: 1, fontSize: '13px', bgcolor: e.colors }} clickable label={e.name} onClick={() => {
                                    const data = tags.concat();
                                    const index = data.findIndex(i => i.name === e.name);
                                    if (index != -1) {
                                        data.splice(index, 1)
                                        setTags(data)
                                    }
                                }} />
                            ))
                        }
                    </Grid> */}
                    <Grid item xs={12} sx={{ my: 1.3 }} >
                        <TextField disabled={loading} value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={3} fullWidth label='Descripcion' size='small' />
                    </Grid>
                    <Grid item xs={12} sx={{ my: 1.3 }} >
                        <Button fullWidth
                            endIcon={loading && <CircularProgress size={'20px'} />}
                            disabled={loading}
                            onClick={saveProject}
                        >Guardar</Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}
