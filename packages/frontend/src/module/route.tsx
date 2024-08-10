import { createBrowserRouter, Navigate } from "react-router-dom";
import { Builder } from "./builder";
import { NoTransferRounded } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { LayoutBuilder } from "../layouts/builders";
import { ListComponents } from "./builder/ListComponents";
import { Session } from "@supabase/supabase-js";
import { ReactNode, useEffect, useState } from "react";
import { supabaseClient } from "../data/supabase";
import { AuthPage } from "./auth";
import { useUser } from "./auth/context/user.context";
import { Home } from "./home";


export const SessionValidation = ({ children, loginPage }: { children: ReactNode, loginPage?: boolean }) => {
    const [session, setSession] = useState<Session | null>(null)
    const { actions: { setSession: _setSession, setUser } } = useUser()

    useEffect(() => {
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            if (session) {
                _setSession(session)
                setUser(session.user)
            }
        })

        const {
            data: { subscription },
        } = supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session) {
                _setSession(session)
                setUser(session.user)
            }
        })
        return () => subscription.unsubscribe()
    }, [])

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
            listItemsLeft={<ListComponents />}
        >
            <Builder />
        </LayoutBuilder>
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
