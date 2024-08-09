import { Grid, Typography } from "@mui/material"
import { useLocalStorage } from "../../utils/hooks/useLocalStorage"

export const ListComponents = () => {

    const components = useLocalStorage<{ name: string }[]>('LIST-COMPONENTS', [])

    return (
        <Grid>
            {
                components.current.map(e => (
                    <Grid key={e.name} sx={{ p: 1, ':hover': { pl: 2 }, transition: '200ms', cursor: 'pointer' }}>
                        <Typography color='#eee' variant="overline">{e.name}</Typography>
                    </Grid>
                ))
            }
        </Grid>
    )
}
