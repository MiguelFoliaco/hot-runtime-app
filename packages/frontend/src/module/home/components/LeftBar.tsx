import { Fragment } from 'react'
import { Grid, IconButton, SvgIconTypeMap, Tooltip } from '@mui/material'
import imgLogo from '../../../assets/ICON.svg'
import { Link } from '../../../layouts/components/Link'
import { BookOnline, DataObject, ForkLeft, Settings, StorageOutlined, Workspaces } from '@mui/icons-material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { useNavigate } from 'react-router-dom'
export const LeftBar = ({ open }: { open: boolean, toggle: () => void }) => {

    const navigate = useNavigate()
    const keys = Object.keys(options) as [keyof typeof options]
    return (
        <Grid sx={{ height: '100%', bgcolor: '#1f1f1f', px: 1 }}>
            {
                keys.map((e, i) => (
                    <Grid key={`item-menu-group-${e}`} sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', py: 1, border: '2px solid #4b4b4b', borderTop: i === 0 ? 'inherit' : 'none', borderInline: 'none' }}>
                        {
                            options[e].map(Item => (
                                <Fragment key={`item-menu-group-${e}-item-${Item.path}`}>
                                    {
                                        open ?
                                            <Grid sx={{ px: 1, py: 2 }} >
                                                <Link to={Item.path}>{Item.title}</Link>
                                            </Grid>
                                            :
                                            <>
                                                {
                                                    Item.Icon ?
                                                        <span onClick={() => {
                                                            navigate(Item.path)
                                                        }}>
                                                            <Tooltip placement='left-end' title={Item.title}>
                                                                <IconButton sx={{ my: 0.5 }}>
                                                                    <Item.Icon color='disabled' />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </span>
                                                        :
                                                        <Grid sx={{ my: 0.5, cursor: 'pointer', display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                            <img onClick={() => {
                                                                navigate(Item.path)
                                                            }} src={Item.img} width={Item.width} height={Item.height} />
                                                        </Grid>
                                                }
                                            </>

                                    }
                                </Fragment>
                            ))
                        }
                    </Grid>
                ))
            }
        </Grid>
    )
}

type menuItem = {
    path: string;
    img?: string;
    typeIcon: 'img' | 'icon';
    title: string;
    width?: string;
    height?: string;
    Icon?: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
        muiName: string;
    }
}
const options: Record<string, menuItem[]> = {
    superior: [
        {
            path: '/home',
            img: imgLogo,
            typeIcon: 'img',
            title: 'Inicio',
            height: '40px',
            width: '40px'
        },
        {
            path: '/project',
            typeIcon: 'icon',
            title: 'Proyectos',
            Icon: BookOnline
        }
    ],
    development: [
        {
            path: '/workspace',
            title: 'Zona de trabajo',
            typeIcon: 'icon',
            Icon: Workspaces
        },
        {
            path: '/code',
            title: 'Componentes',
            typeIcon: 'icon',
            Icon: DataObject
        },
        {
            path: '/versions',
            title: 'Versiones',
            typeIcon: 'icon',
            Icon: ForkLeft
        },
    ],
    services: [
        {
            path: '/db',
            title: 'Base de datos',
            typeIcon: 'icon',
            Icon: StorageOutlined
        },
        {
            path: '/settings',
            title: 'Configuraciones',
            typeIcon: 'icon',
            Icon: Settings
        },
    ]
}