import {
    Grid,
    // IconButton,
    // Tooltip
} from "@mui/material"
// import { useComponents } from "../../../../utils/hooks/useComponent"
// import { Build } from "@mui/icons-material"
// import { api } from "../../services/http"
// import { useUser } from "../../../auth/context/user.context"

export const Preview = () => {
    // const { componentSelected } = useComponents()
    // const { values: { session } } = useUser()
    // console.log('Component selected', componentSelected)

    // const getView = async () => {
    //     api.method = 'post'
    //     api.bodyInit = { jsx: componentSelected?.codeJSX ?? '' }
    //     const code = await api.rest<{ warning: string[], code: string, map: string }>('/compile', {
    //         headers: {
    //             Authorization: `Bearer ${session?.access_token}`
    //         }
    //     })
    // }
    return (
        <Grid sx={{ position: 'relative', transition: '200ms', width: '50%', height: '160px', borderRadius: 3, bgcolor: 'background.paper', border: t => `1px solid ${t.palette.text.secondary}30` }}>
            {/* <span style={{ position: 'absolute', top: 0, right: 0 }}>
                <Tooltip title='Preview'>
                    <IconButton onClick={getView}>
                        <Build />
                    </IconButton>
                </Tooltip>
            </span> */}
        </Grid>
    )
}
