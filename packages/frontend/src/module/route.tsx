import { createBrowserRouter, Navigate } from "react-router-dom";
import { Builder } from "./builder";
import { NoTransferRounded } from "@mui/icons-material";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { LayoutBuilder } from "../layouts/builders";
import { ListComponents } from "./builder/components/ListComponents";
import { Session } from "@supabase/supabase-js";
import { ReactNode, useEffect, useState } from "react";
import { supabaseClient } from "../data/supabase";
import { AuthPage } from "./auth";
import { useUser } from "./auth/context/user.context";
import { Home } from "./home";
import { Workspace } from "./builder/workspace";


export const SessionValidation = ({ children, loginPage }: { children: ReactNode, loginPage?: boolean }) => {
    const [session, setSession] = useState<Session | null>(null)
    const { actions: { setSession: _setSession, setUser } } = useUser()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true)
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session) {
                _setSession(session)
                setUser(session.user)
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
                setUser(session.user)

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
        element: <SessionValidation loginPage children={<AuthPage />} />
    },
    {
        path: '/builder',
        element: <LayoutBuilder
            listItemsLeft={ListComponents}
        >
            <Builder />
        </LayoutBuilder>
    },
    {
        path: '/workspace',
        element: <SessionValidation>
            <Workspace />
        </SessionValidation>
    },
    {
        path: '/home',
        element: <SessionValidation>
            <Home />
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
