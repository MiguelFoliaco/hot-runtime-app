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
    BackgroundVariant,
    Node
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { useCallback, useEffect, useMemo } from 'react';
import { ComponentNode } from './Component';
import { useComponents } from '../../../../utils/hooks/useComponent';
import { random } from '../../../../utils/random';

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
    const components = useComponents(state => state.components)
    const [nodes, setAllNodesChange, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    const nodeTypes = useMemo(() => ({ componentNode: ComponentNode }), [])

    const onConnect = useCallback(
        (params: Connection) => {
            setEdges(eds => addEdge(params, eds));
        }, [setEdges])

    useEffect(() => {
        if (components) {
            const newNodes = components.map(e => {
                const item: Node = {
                    id: `${e.name}-${e.id}`,
                    data: e,
                    type: 'componentNode',
                    position: {
                        x: random(0, 500),
                        y: random(0, 500)
                    }
                }
                return item as Node;
            })
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            setAllNodesChange(newNodes)
        }
    }, [components])
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
