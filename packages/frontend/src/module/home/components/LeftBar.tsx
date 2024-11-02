import { Fragment } from 'react'
import { Grid, IconButton, SvgIconTypeMap, Tooltip, useTheme } from '@mui/material'
import { Link } from '../../../layouts/components/Link'
import { AndroidOutlined, ColorLens, ForkLeft, KeyboardCommandKey, Store, Workspaces } from '@mui/icons-material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { useNavigate } from 'react-router-dom'

export const LeftBar = ({ open }: { open: boolean }) => {
    const theme = useTheme()
    const navigate = useNavigate()
    const keys = Object.keys(options) as [keyof typeof options]

    return (
        <Grid sx={{ height: '100%', bgcolor: 'background.main', px: 1 }}>
            {
                keys.map((e, i) => (
                    <Grid key={`item-menu-group-${e}`} sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', py: 1, border: (theme) => `2px solid ${theme.palette.text.secondary}30`, borderTop: i === 0 ? 'inherit' : 'none', borderInline: 'none' }}>
                        {
                            options[e].map(Item => (
                                <Fragment key={`item-menu-group-${e}-item-${Item.path}`}>
                                    {
                                        open ?
                                            <Grid sx={{ px: 1, py: 2 }} >
                                                <Link to={Item.path} color={theme.palette.text.primary}>{Item.title}</Link>
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
                                                                    <Item.Icon color={Item.path.trim() === location.pathname.trim() ? 'primary' : 'disabled'} />
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
            img: '/ICON.svg',
            typeIcon: 'img',
            title: 'Inicio',
            height: '40px',
            width: '40px'
        },
        // {
        //     path: '/project',
        //     typeIcon: 'icon',
        //     title: 'Proyectos',
        //     Icon: BookOnline
        // }
    ],
    development: [
        {
            path: '/',
            title: 'Zona de trabajo',
            typeIcon: 'icon',
            Icon: Workspaces
        },
        {
            path: '/workspace/versions',
            title: 'Versiones',
            typeIcon: 'icon',
            Icon: ForkLeft
        },
        {
            path: '/APKS',
            title: 'APKs',
            typeIcon: 'icon',
            Icon: AndroidOutlined
        },
        {
            path: '/store-component',
            title: 'Tienda de componentes',
            typeIcon: 'icon',
            Icon: Store
        }
    ],
    services: [
        // {
        //     path: '/notify',
        //     title: 'Notificaciones',
        //     typeIcon: 'icon',
        //     Icon: NotificationAddOutlined
        // },
        {
            path: '/cli',
            title: 'CLI',
            typeIcon: 'icon',
            Icon: KeyboardCommandKey
        }
        // {
        //     path: '/db',
        //     title: 'Base de datos',
        //     typeIcon: 'icon',
        //     Icon: StorageOutlined
        // },
        // {
        //     path: '/settings',
        //     title: 'Configuraciones',
        //     typeIcon: 'icon',
        //     Icon: Settings
        // },
    ],
    others: [
        {
            path: '/config/theme',
            title: 'Temas',
            typeIcon: 'icon',
            Icon: ColorLens,
        }
    ]
}