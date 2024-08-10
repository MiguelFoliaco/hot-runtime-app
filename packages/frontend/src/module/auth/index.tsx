import { Google } from "@mui/icons-material"
import { Alert, Button, CircularProgress, Divider, Grid, Snackbar, TextField, Typography } from "@mui/material"
import { supabaseClient } from "../../data/supabase"
import { useState } from "react"
import { useUser } from "./context/user.context"
import { useNavigate } from "react-router-dom"

async function signUpNewUser({ email, password }: { email: string, password: string }) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    })

    return { data, error }
}

export const AuthPage = () => {

    const [user, setUser] = useState({ email: '', password: '' })
    const setSession = useUser(state => state.actions.setSession)
    const _setUser = useUser(state => state.actions.setUser)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState({ show: false, msg: '' })

    const login = async () => {
        setLoading(true)
        const data = await signUpNewUser(user)
        if (data.data.session && data.data.user) {
            setSession(data.data.session)
            _setUser(data.data.user)
            navigate('/home')
        }
        if (data.error) {
            setErrorMsg({
                msg: `${data.error.code || 'Error'} : ${data.error.message}`,
                show: true
            })
        }
        setLoading(false)
        console.log("Data mi perro", data)
    }


    return (
        <Grid sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Grid
                className="fondo-animado"
                sx={{
                    width: '400px', height: '400px', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'secondary.main',
                    borderRadius: 1
                }}>
                <Grid sx={{ borderRadius: 1, width: '395px', height: '395px', bgcolor: 'background.default', p: 2 }}>

                    <Typography
                        variant="h5"
                        textAlign={'center'}
                    >
                        Builder Runtime App
                    </Typography>
                    <Typography
                        variant="h5"
                        textAlign={'center'}
                        sx={{
                            mb: 5
                        }}
                    >
                        Sign In
                    </Typography>

                    <TextField disabled={loading} label='Username' value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} fullWidth size='small' color="secondary" sx={{ mb: 3 }} />
                    <TextField disabled={loading} type='password' value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} label='Password' fullWidth size='small' color="secondary" sx={{ mb: 3 }} />
                    <Button disabled={loading} onClick={login} endIcon={loading && <CircularProgress size={'20px'} />} variant="outlined" color="secondary" sx={{ width: '200px', margin: 'auto', display: 'flex' }}>Login</Button>
                    <Divider sx={{ my: 2 }}>
                        <Typography variant="body1" >o</Typography>
                    </Divider>
                    <Button variant="outlined" color="secondary" sx={{ width: '200px', margin: 'auto', display: 'flex' }} endIcon={
                        <Google />
                    } >Sign In </Button>
                </Grid>
            </Grid>
            <Snackbar open={errorMsg.show} autoHideDuration={5000}>
                <Alert severity="error">
                    {errorMsg.msg}
                </Alert>
            </Snackbar>
        </Grid>
    )
}
