import { createBrowserRouter, Navigate } from "react-router-dom";
import { NoTransferRounded } from "@mui/icons-material";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Session } from "@supabase/supabase-js";
import { ReactNode, useEffect, useState } from "react";
import { supabaseClient } from "../data/supabase";
import { AuthPage } from "./auth";
import { useUser } from "./auth/context/user.context";
import { Home } from "./home";
import { Workspace } from "./builder/workspace";
import { Versions } from "./builder/versions";
import { APKs } from "./apks";
import { Config } from "./config/Config";
import { ThemeConfigModule } from "./config/theme";
import { CLI } from "./develop/cli";
import { Store } from "./store";
import { ComponentDetails } from "./store/ComponentDetails";


export const SessionValidation = ({ children, loginPage }: { children: ReactNode, loginPage?: boolean }) => {
    const [session, setSession] = useState<Session | null>(null)
    const { actions: { setSession: _setSession } } = useUser()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session) {
                console.log('session', session)
                _setSession(session)
            }
        }).finally(() => {
            setLoading(false)
        })

        const {
            data: { subscription },
        } = supabaseClient.auth.onAuthStateChange(async (_event, session) => {
            setSession(session)
            if (session) {
                _setSession(session)

                setLoading(false)
            }
        })
        return () => subscription.unsubscribe()
    }, [])


    if (loading && !session) {
        return <Grid sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <Typography sx={{ mb: 1 }} variant='overline'>Cargando...</Typography>
            <CircularProgress color="secondary" />
        </Grid>
    }

    if (!session) {
        return (<AuthPage />)
    }
    else if (session && loginPage === true) {
        return <Navigate to='/home' />
    }
    else {
        return children
    }
}


export const route = createBrowserRouter([
    {
        path: '/',
        element: <SessionValidation loginPage>
            <AuthPage />
        </SessionValidation>
    },
    {
        path: '/workspace',
        element: <SessionValidation>
            <Workspace />
        </SessionValidation>
    },
    {
        path: '/workspace/versions',
        element: <SessionValidation>
            <Versions />
        </SessionValidation>
    },
    {
        path: '/home',
        element: <SessionValidation>
            <Home />
        </SessionValidation>
    },
    {
        path: '/apks',
        element: <SessionValidation>
            <APKs />
        </SessionValidation>
    },
    {
        path: '/config',
        element: <SessionValidation>
            <Config />
        </SessionValidation>,
        children: [
            {
                path: 'theme',
                element: <ThemeConfigModule />
            }
        ]
    },
    {
        path: '/store-component',
        element: <SessionValidation>
            <Store />
        </SessionValidation>
    },
    {
        path: '/store-component/:id',
        element: <SessionValidation>
            <ComponentDetails />
        </SessionValidation>
    },
    {
        path: '/cli',
        element: <SessionValidation>
            <CLI />
        </SessionValidation>
    },
    {
        path: '/*',
        element: <Grid>
            <Typography>Pagina No encontrado</Typography>
            <NoTransferRounded />
        </Grid>
    }
])
