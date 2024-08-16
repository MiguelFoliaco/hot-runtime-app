import { Grid } from '@mui/material';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Controls,
    MiniMap,
    Background,
    BackgroundVariant
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo } from 'react';
import { ComponentNode } from './Component';

const initialNodes = [
    { id: 'header#ido', type: 'componentNode', position: { x: 0, y: 100 }, data: { name: 'Header' } },
    { id: 'search#buscador_home', type: 'componentNode', position: { x: 250, y: 0 }, data: { name: 'Search' } },
    { id: 'logo#home', type: 'componentNode', position: { x: 250, y: 200 }, data: { name: 'Logo' } },
];
const initialEdges = [
    { id: 'header->search', source: 'header#ido', target: 'search#buscador_home' },
    { id: 'header->logo', source: 'header#ido', target: 'logo#home' }
];

export const Flows = () => {

    const [nodes, setAllNodesChange, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const nodeTypes = useMemo(() => ({ componentNode: ComponentNode }), [])

    const onConnect = useCallback(
        (params: Connection) => {
            setEdges(eds => addEdge(params, eds));
        }, [setEdges])

    useEffect(() => {
        setAllNodesChange(initialNodes)
    }, [])
    return (
        <Grid sx={{ width: '100%', height: '350px', bgcolor: '#1f1f1f', borderRadius: 2 }}>
            <ReactFlow
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodes={nodes}
                edges={edges}
                onConnect={onConnect}
                colorMode='dark'
                nodeTypes={nodeTypes}
            >
                <Controls />
                <MiniMap nodeColor={'#D941FF50'} />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />

            </ReactFlow>
        </Grid>
    )
}
