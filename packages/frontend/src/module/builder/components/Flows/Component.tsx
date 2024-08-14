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

    return (
        <>
            {/* <Handle type='target' position={Position.Top} id={'LeftParent'} /> */}
            <Grid
                onClick={() => {
                    setComponent(data)
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
            {/* <Handle type='target' position={Position.Bottom} id='RightParent' /> */}

            <Handle
                onClick={(e) => console.log(e)}
                type='target' position={Position.Left} id={'Pather'} />
            <Handle type='source' position={Position.Right} id='Children' />
        </>
    )
}
