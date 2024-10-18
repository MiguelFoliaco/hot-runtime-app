import { LayoutBuilder } from "../../layouts/builders"
import { LeftBar } from "../home/components/LeftBar"
import { ListComponents } from "./components/ListComponents"

export const Store = () => {
    return (
        <LayoutBuilder
            listItemsLeft={LeftBar}
        >
            <p>Hola</p>

            <ListComponents />
        </LayoutBuilder>
    )
}
