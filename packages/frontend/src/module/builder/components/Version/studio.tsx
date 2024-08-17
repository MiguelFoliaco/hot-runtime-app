import { Grid, LinearProgress, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useProject } from "../../../../utils/hooks/useProjects"
import { getVersions } from "../../services/getVersions"
import { Tables } from "../../../../database.types"
import { useVersion } from "../../../../utils/hooks/useVersion"
import moment from "moment"
import { Edit, Save } from "@mui/icons-material"
import { DateTimePicker } from "@mui/x-date-pickers"
import { User } from "@supabase/supabase-js"
import { getOS } from "../../../home/services/version"

export const VersionsStudio = () => {

    const { projectSelected } = useProject(state => state)
    const { oss, setVersions, versions, setVersion, versionSelected, setOSs } = useVersion(state => state)
    const [versionEdit, setVersionEdit] = useState(versionSelected)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        if (oss.length == 0) {
            getOS(setOSs)
        }
    }, [])
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
                                            <Typography onClick={() => setVersion(version)} key={`version-id-key-${version.id}`} sx={{ fontSize: '12px', pl: version.id === versionSelected?.id ? 1 : undefined, color: version.id === versionSelected?.id ? 'secondary.main' : undefined, transition: '200ms', py: 0.5, ':hover': { pl: 1, cursor: 'pointer' } }}>{version.name.length > 25 ? version.name.substring(0, 26) + '...' : version.name}</Typography>
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        ))
                    }
                </Grid>
            </Grid>
            {
                versionSelected &&
                <Grid item xs={10} sx={{ px: 2 }}>
                    <Grid sx={{ width: '100%', bgcolor: '#1f1f1f', borderRadius: 2, p: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant='overline'>Projecto: {projectSelected?.name}</Typography>
                        <Typography variant='overline'>Author: {versionSelected?.publicate_by_email}</Typography>
                    </Grid>
                    <Grid sx={{ width: '100%', p: 0.5, my: 1 }}>
                        <Grid sx={{ p: 1, bgcolor: '#1f1f1f', borderRadius: 2, width: '320px', display: 'flex', alignItems: 'center' }}>
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
                                    <Save onClick={() => setEdit(false)} fontSize="small" color="secondary" sx={{ ml: 2 }} />
                                    :
                                    <Edit onClick={() => setEdit(true)} fontSize="small" color="warning" sx={{ ml: 2 }} />
                            }
                        </Grid>

                    </Grid>
                </Grid>
            }
        </Grid>
    )
}
