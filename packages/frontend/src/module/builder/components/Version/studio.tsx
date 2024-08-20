import { CircularProgress, Grid, MenuItem, Select, TextField, Tooltip, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useProject } from "../../../../utils/hooks/useProjects"
import { getVersions } from "../../services/getVersions"
import { Tables } from "../../../../database.types"
import { useVersion } from "../../../../utils/hooks/useVersion"
import moment from "moment"
import { Edit, Save } from "@mui/icons-material"
import { DateTimePicker } from "@mui/x-date-pickers"
import { isEqual } from "lodash"
import { useAlert } from "../../../../layouts/components/AlertGlobal"
import { supabaseClient } from "../../../../data/supabase"

export const VersionsStudio = () => {

    const { projectSelected } = useProject(state => state)
    const { openAlert } = useAlert()
    const { oss, setVersions, versions, setVersion, versionSelected, versionInProduction } = useVersion(state => state)
    const [versionEdit, setVersionEdit] = useState(versionSelected)
    const [edit, setEdit] = useState(false)
    const [loadingSave, setLoadingSave] = useState(false)

    const versionsList = useMemo(() => {
        const obj: Record<string, Tables<'version-code'>[]> = {};
        for (const v of versions) {
            const name = oss.find(e => e.id === v.os_id)?.name || 'Without OS';
            obj[name] = obj[name] ? obj[name].concat(v) : [v]
        }
        return obj
    }, [projectSelected, versions, oss]);

    const keysVersions = useMemo(() => {
        return Object.keys(versionsList || '{}')
    }, [versionsList])

    useEffect(() => {
        if (projectSelected) {
            getVersions(setVersions, projectSelected.id)
        }
    }, [projectSelected])
    useEffect(() => {
        setVersionEdit(versionSelected)
    }, [versionSelected])

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (edit) {
                if (event.key === 'Escape') {
                    setEdit(false)
                    setVersionEdit(versionEdit)
                }
            }
        })
        return () => {
            document.removeEventListener('keypress', () => { })
        }
    }, [])

    const onSave = async () => {
        if (!versionEdit) return;
        const check = isEqual(versionEdit, versionSelected)
        if (check) {
            openAlert({
                msg: 'No hay nada que cambiar',
                severity: 'info'
            })
            setEdit(false);
            setVersionEdit(versionEdit)
        }
        try {
            setLoadingSave(true)
            const data = await supabaseClient.from('version-code').update({
                name: versionEdit.name
            }).eq('id', versionEdit.id)
            console.log("Update", data)
            if (data.error) {
                openAlert({
                    msg: 'Error al actualizar la version: ' + data.error,
                    severity: 'error'
                })
            } else {
                openAlert({
                    msg: 'Cambios guardados con exito',
                    severity: 'success'
                })
                setVersion(versionEdit)
            }
        }
        catch (err) {
            openAlert({
                msg: 'Error al realizar el proceso: ' + String(err),
                severity: 'error'
            })
        }
        finally {
            setLoadingSave(false)
        }
    }

    return (
        <Grid container sx={{ height: '100%', width: '100%' }}>
            <Grid item xs={2} sx={{ width: '100%', bgcolor: '#1f1f1f', borderRadius: 2, p: 1 }}>
                <Typography variant="overline">Versiones</Typography>
                <Grid container>
                    {
                        keysVersions.map((e, i) => (
                            <Grid key={`item-key-${e}`}
                                sx={{
                                    borderTop: i == 0 ? '1px dashed #484848' : 'none',
                                    borderBottom: '1px dashed #484848',
                                    width: '100%',
                                }}
                            >
                                <Typography variant="overline">{e}</Typography>
                                <Grid sx={{ ml: 1 }}>
                                    {
                                        versionsList[e].map(version => (
                                            <div key={`version-id-key-${version.id}`} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Typography onClick={() => setVersion(version)} sx={{ fontSize: '12px', pl: version.id === versionSelected?.id ? 1 : undefined, color: version.id === versionSelected?.id ? 'secondary.main' : undefined, transition: '200ms', py: 0.5, ':hover': { pl: 1, cursor: 'pointer' } }}>{version.name.length > 25 ? version.name.substring(0, 26) + '...' : version.name}</Typography>
                                                {
                                                    versionInProduction.find(e => e.id === version.id) && <Grid sx={{ height: '10px', width: '10px', borderRadius: '100px', bgcolor: 'success.main' }} ></Grid>
                                                }
                                            </div>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            {
                loadingSave ? <CircularProgress sx={{ position: 'absolute', top: 0, left: 0, margin: 'auto', right: 0, bottom: 0 }} />
                    :
                    versionSelected &&
                    <Grid item xs={10} sx={{ px: 2, }} >
                        <Grid container>
                            <Grid item xs={12} sx={{ width: '100%', height: '50px !important', bgcolor: '#1f1f1f', borderRadius: 2, p: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant='overline'>Projecto: {projectSelected?.name}</Typography>
                                {
                                    edit && <Typography sx={{ display: 'flex' }} variant="caption">Presione
                                        <Grid sx={{
                                            mx: 1, px: 2,
                                            transition: '200ms',
                                            cursor: 'pointer',
                                            border: '1px solid #FFFFFF40 ', borderRadius: 1, fontWeight: 'bold', color: '#FFFFFF80', ':hover': {
                                                bgcolor: '#00000050',
                                                color: '#FFFFFF',
                                                transform: 'scale(0.95)'
                                            }
                                        }}
                                            onClick={() => {
                                                setEdit(false)
                                                setVersionEdit(versionSelected)
                                            }}
                                        >scape</Grid>
                                        para no guardar cambios</Typography>
                                }
                                <Typography variant='overline'>Author: {versionSelected?.publicate_by_email}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ width: '100%', p: 0.5, my: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Grid sx={{ p: 1, mb: 0.5, bgcolor: '#1f1f1f', borderRadius: 2, width: 'fit-content', display: 'flex', alignItems: 'center' }}>
                                    {
                                        edit ?

                                            <TextField
                                                size='small'
                                                value={versionEdit?.name}
                                                onChange={(e) => versionEdit && setVersionEdit({ ...versionEdit, name: e.target.value })}
                                            />

                                            :
                                            <Typography variant='caption' >Nombre: <strong>{versionSelected.name}</strong></Typography>
                                    }
                                    {
                                        versionInProduction.find(e => e.id === versionSelected.id) && <Tooltip title='Version en producción'>
                                            <Grid sx={{ ml: 2, height: '10px', width: '10px', borderRadius: '100px', bgcolor: 'success.main' }} ></Grid>
                                        </Tooltip>
                                    }
                                    {
                                        edit ?
                                            <Save onClick={() => onSave()} fontSize="small" color="secondary" sx={{ ml: 2 }} />
                                            :
                                            <Edit onClick={() => setEdit(true)} fontSize="small" color="warning" sx={{ ml: 2 }} />
                                    }
                                </Grid>
                                <Grid sx={{ p: 1, mb: 0.5, bgcolor: '#1f1f1f', borderRadius: 2, width: '320px', display: 'flex', alignItems: 'center' }}>
                                    {
                                        edit ?
                                            <Select
                                                size='small'
                                                fullWidth
                                                value={String(versionEdit?.os_id)}
                                                onChange={(e) => {
                                                    if (versionEdit) {
                                                        setVersionEdit({ ...versionEdit, os_id: parseInt(e.target.value) })
                                                    }
                                                }}>
                                                {
                                                    oss.map(e => (
                                                        <MenuItem key={`menu-item-oss-${e.id}`} value={e.id}>{e.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            :
                                            <Typography variant='caption' >OS:  {oss.find(e => e.id === versionSelected?.os_id)?.name}</Typography>
                                    }
                                    {
                                        edit ?
                                            <Save onClick={() => onSave()} fontSize="small" color="secondary" sx={{ ml: 2 }} />
                                            :
                                            <Edit onClick={() => setEdit(true)} fontSize="small" color="warning" sx={{ ml: 2 }} />
                                    }
                                </Grid>
                                <Grid sx={{ p: 1, mb: 0.5, bgcolor: '#1f1f1f', borderRadius: 2, width: '320px', display: 'flex', alignItems: 'center' }}>
                                    {
                                        edit ?
                                            <DateTimePicker
                                                slotProps={{
                                                    textField: {
                                                        size: 'small'
                                                    }
                                                }}
                                                value={moment(versionEdit?.programing_date)}
                                                onChange={(e) => {
                                                    if (e && versionEdit) {
                                                        setVersionEdit({ ...versionEdit, programing_date: e.toISOString() })
                                                    }
                                                }}
                                            />
                                            :
                                            <Typography variant='caption' >Programado para el {moment(versionSelected?.programing_date).format('DD-MM-YYYY - hh:mm a')}</Typography>
                                    }
                                    {
                                        edit ?
                                            <Save onClick={() => onSave()} fontSize="small" color="secondary" sx={{ ml: 2 }} />
                                            :
                                            <Edit onClick={() => setEdit(true)} fontSize="small" color="warning" sx={{ ml: 2 }} />
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
            }
        </Grid>
    )
}
