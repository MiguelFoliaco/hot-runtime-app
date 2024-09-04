import { Box, Grid, Typography } from "@mui/material"
import { LayoutBuilder } from "../../layouts/builders"
import { LeftBar } from "../home/components/LeftBar"
import { Outlet } from "react-router-dom"

export const Config = () => {
    return (
        <LayoutBuilder
            listItemsLeft={LeftBar}
        >
            <Grid container>
                <Grid item xs={12} sx={{ mb: 1 }}>
                    <Typography>Configuracion</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Outlet />
                </Grid>
            </Grid>
        </LayoutBuilder>
    )
}
