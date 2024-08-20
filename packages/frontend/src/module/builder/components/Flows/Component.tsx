import { ExtensionOutlined } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"
import { Handle, Position, NodeProps } from "@xyflow/react"
import { useComponents } from "../../../../utils/hooks/useComponent"
import { Tables } from "../../../../database.types"

type propsNode = NodeProps & {
    data: Tables<'components'>
}

export const ComponentNode = ({ data }: propsNode) => {

    const { setComponent, componentSelected } = useComponents(state => state)

    const generateForm = (data: Tables<'components'>) => {
        const str = data.codeJSX;
        const reg = /\/\*@json-form[\s\S]*?\*\//g
        const match = str.match(reg);
        console.log(match, "Match")
        if (!match) return;
        const text = match[0]
        if (text !== null) {
            const properties = text.replace('/*@json-form', '').replace('*/', '').replace('\n', '').trim().split('\n').map(e => e.trim());
            console.log(properties)
        }
    }


    return (
        <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            {/* <Handle type='target' position={Position.Top} id={'LeftParent'} /> */}
            <Grid
                onClick={() => {
                    setComponent(data)
                    generateForm(data)
                }}
                sx={{
                    bgcolor: t => data.name === componentSelected?.name ? t.palette.primary.main + '20' : t.palette.background.default + '30',
                    height: '100px',
                    width: '200px',
                    borderRadius: 2,
                    border: t => `2px solid ${data.name === componentSelected?.name ? t.palette.primary.main : "#FFFFFF50"}`,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <ExtensionOutlined fontSize="large" color={data.name === componentSelected?.name ? 'primary' : 'disabled'} />
                <Typography color={data.name === componentSelected?.name ? 'primary.main' : '#FFFFFF50'}>{data.name}</Typography>
            </Grid>
            {
                componentSelected?.id === data.id &&
                <Grid sx={{
                    ml: 3,
                    bgcolor: (t) => t.palette.background.default,
                    height: '300px',
                    width: '200px',
                    borderRadius: 2,
                    border: "#FFFFFF50",
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}>

                </Grid>
            }
            {/* <Handle type='target' position={Position.Bottom} id='RightParent' /> */}

            <Handle
                onClick={(e) => console.log(e)}
                type='target' position={Position.Left} id={'Pather'} />
            <Handle type='source' position={Position.Right} id='Children' />
        </Grid>
    )
}
