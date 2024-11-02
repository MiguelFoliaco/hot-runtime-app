import { Chip, Grid, Typography } from "@mui/material"
import { SettingsInputComponent } from "@mui/icons-material"
import { Tables } from "../../../database.types"
import moment from "moment";
import { useNavigate } from "react-router-dom";

export const ComponentCard = ({ component }: { component: Tables<'components'> }) => {
    const navigate = useNavigate()
    return (
        <Grid onClick={() => { navigate(`/store-component/${component.id}`) }} container sx={{ ':hover': { transform: 'scale(0.9)' }, transition: '200ms', cursor: 'pointer', width: '40vw', p: 1, height: '100px', border: t => `1px solid ${t.palette.text.secondary}50` }}>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <Grid sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#151530', padding: '15px', borderRadius: '20px' }} >
                    <SettingsInputComponent htmlColor='#dbdbdb' />
                </Grid>
            </Grid>
            <Grid item xs={9} sx={{ position: 'relative' }}>
                <Chip label={component.type} size="small" sx={{ fontSize: '10px', position: 'absolute', right: '10px', bgcolor: 'transparent', fontWeight: 'bold', color: t => `${t.palette.text.secondary}80`, border: t => `2px solid ${t.palette.text.secondary}50` }} />
                <Typography fontSize={'13px'} fontWeight={'bold'} variant="overline">{component.name}</Typography>
                <Typography fontSize={'10px'} >Create by: {component.owner}</Typography>
                <Typography fontSize={'10px'} sx={{ mt: 1 }}>Create at: {moment(component.created_at).format('YYYY/MM/DD')}</Typography>
            </Grid>
        </Grid>
    )
}
