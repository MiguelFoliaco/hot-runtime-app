import { Button, Divider, FormControl, Grid, InputLabel, MenuItem, Modal, Select, Typography } from "@mui/material"
import { useState } from "react"
import { useRols } from "../context/rol.context"
import { Tables } from "../../../database.types"
import { useAlert } from "../../../layouts/components/AlertGlobal"

export const ModalActions = ({ show, setRol, rolId, hidden }: { hidden: () => void, show: boolean, rolId: number, setRol: (rol: Tables<'rols'>) => Promise<void> }) => {
    const { openAlert } = useAlert()
    const { actions, rols, fill } = useRols()
    const [actionSelect, setActionSelect] = useState<Tables<'actions'>>()

    const onClose = () => {
        hidden()
    }

    const addActions = async () => {
        if (!actionSelect) return;
        const rol = rols.find(e => e.id === rolId);
        if (rol) {
            if (rol.actions.includes(actionSelect.id)) {
                return openAlert({
                    msg: 'El rol ya tiene asignado esta acción',
                    severity: 'info'
                })
            }
            await setRol({
                ...rol,
                actions: rol.actions.concat(actionSelect.id)
            })
            openAlert({
                msg: 'Se actualizo el rol correctamente',
                severity: 'success'
            })
            fill()
        }
    }

    return (
        <Modal
            open={show}
            onClose={onClose}
        >
            <Grid sx={{ p: 2, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, margin: 'auto', width: '30vw', height: '30vw', bgcolor: 'background.paper', borderRadius: '10px' }}>
                <Grid item xs={12}>
                    <Typography variant="overline">Acciones</Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <FormControl sx={{ mt: 2, width: '100%' }}>
                        <InputLabel color='secondary' size='small' id='rol-label'>Rol</InputLabel>
                        <Select
                            fullWidth
                            labelId='rol-label'
                            label='Rol'
                            color='secondary'
                            size='small'
                            value={actionSelect?.id}
                            onChange={(event) => {
                                const item = actions.find(e => e.id === event.target.value)
                                if (item) {
                                    setActionSelect(item)
                                }
                            }}
                        >
                            {
                                actions.map(e => (
                                    <MenuItem value={e.id} key={e.code}>{e.code}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sx={{ py: 2, my: 3 }}>
                    <Typography fontSize={'10px'} fontWeight={'bold'} variant='overline'>Descripción: </Typography>
                    <Typography variant="caption">
                        {actionSelect?.description}
                    </Typography>
                </Grid>
                <Grid>
                    <Button size='small' fullWidth sx={{ mt: 1 }} onClick={addActions}>Añadir</Button>
                </Grid>
            </Grid>
        </Modal>
    )
}
