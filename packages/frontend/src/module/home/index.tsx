import { Typography } from "@mui/material"
import { LayoutBuilder } from "../../layouts/builders"
import { LeftBar } from "./components/LeftBar"

export const Home = () => {
    return (
        <LayoutBuilder
            listItemsLeft={<LeftBar />}
        >
            <Typography>Hola</Typography>
        </LayoutBuilder>
    )
}
