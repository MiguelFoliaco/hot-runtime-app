/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Grid, Typography, Link, List, ListItem, Table, TableBody, TableCell, TableRow, TableHead, useTheme, LinearProgress } from '@mui/material';
import { useParams } from "react-router-dom"
import { LayoutBuilder } from "../../layouts/builders"
import { LeftBar } from "../home/components/LeftBar"
import { supabaseClient } from "../../data/supabase"
import { Tables } from "../../database.types"
import { useEffect, useState } from "react"
import Markdown from "react-markdown"
import remakeGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { WithoutDocumentation } from './components/WithoutDocumentation';
// Estilos personalizados con Material UI
const components = {
    h1: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h3" gutterBottom>
            {children}
        </Typography>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h4" gutterBottom>
            {children}
        </Typography>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="h5" gutterBottom>
            {children}
        </Typography>
    ),
    p: ({ children }: { children: React.ReactNode }) => (
        <Typography variant="body1" paragraph>
            {children}
        </Typography>
    ),
    a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
        <Link href={href} target="_blank" rel="noopener">
            {children}
        </Link>
    ),
    ul: ({ children }: { children: React.ReactNode }) => (
        <List style={{ paddingLeft: '20px' }}>
            {children}
        </List>
    ),
    ol: ({ children }: { children: React.ReactNode }) => (
        <List style={{ paddingLeft: '20px' }} component="ol">
            {children}
        </List>
    ),
    li: ({ children }: { children: React.ReactNode }) => (
        <ListItem style={{ display: 'list-item' }}>
            {children}
        </ListItem>
    ),
    table: ({ children }: { children: React.ReactNode }) => (
        <Table style={{ marginBottom: '16px' }}>
            {children}
        </Table>
    ),
    thead: ({ children }: { children: React.ReactNode }) => (
        <TableHead>{children}</TableHead>
    ),
    tbody: ({ children }: { children: React.ReactNode }) => (
        <TableBody>{children}</TableBody>
    ),
    tr: ({ children }: { children: React.ReactNode }) => (
        <TableRow>{children}</TableRow>
    ),
    th: ({ children }: { children: React.ReactNode }) => (
        <TableCell style={{ fontWeight: 'bold' }}>{children}</TableCell>
    ),
    td: ({ children }: { children: React.ReactNode }) => <TableCell>{children}</TableCell>,
};

const getComponent = async (id: number, setItem: (data: Tables<'components'>) => void) => {
    const item = await supabaseClient.from('components').select().eq('id', id)
    console.log(item)
    if (item.data) {
        if (item.data.length > 0) {
            setItem(item.data[0])
        }
    }
}
export const ComponentDetails = () => {
    const { palette: { mode } } = useTheme()
    const params = useParams();
    const [component, setComponent] = useState<Tables<'components'>>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        console.log(params.id)
        if (params.id) {
            setLoading(true)
            getComponent(parseInt(params.id), setComponent).finally(() => {
                setLoading(false)
            })
        }
    }, [])

    if (loading) return <Grid sx={{ height: '100vh', width: '100vw' }}>
        <LinearProgress />
    </Grid>

    return (
        <LayoutBuilder
            listItemsLeft={LeftBar}
        >
            <Grid sx={{ px: 10, py: 2, height: '90vh', overflowY: 'scroll' }} className='scroll'>
                {
                    component?.description ?
                        <Markdown
                            //@ts-ignore
                            components={{
                                ...components,
                                code: (props) => {
                                    //@ts-ignore
                                    const { children, className, ...rest } = props
                                    const match = /language-(\w+)/.exec(className || '')
                                    return match ? (
                                        //@ts-ignore
                                        <SyntaxHighlighter
                                            {...rest}
                                            PreTag="div"
                                            // eslint-disable-next-line react/no-children-prop
                                            children={String(children).replace(/\n$/, '')}
                                            language={match[1]}
                                            style={mode === 'dark' ? vscDarkPlus : materialLight}
                                        />
                                    ) : (
                                        <code {...rest} className={className}>
                                            {children}
                                        </code>
                                    )
                                }
                            }} remarkPlugins={[remakeGfm]}>{component?.description}</Markdown>
                        :
                        <WithoutDocumentation />
                }
            </Grid>
        </LayoutBuilder>
    )
}
