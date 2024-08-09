import { createBrowserRouter } from "react-router-dom";
import { Builder } from "./builder";
import { NoTransferRounded } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { LayoutBuilder } from "../layouts/builders";
import { ListComponents } from "./builder/ListComponents";

export const route = createBrowserRouter([
    {
        path: '/builder',
        element: <LayoutBuilder
            listItemsLeft={<ListComponents />}
        >
            <Builder />
        </LayoutBuilder>
    },
    {
        path: '/*',
        element: <Grid>
            <Typography>Pagina No encontrado</Typography>
            <NoTransferRounded />
        </Grid>
    }
])