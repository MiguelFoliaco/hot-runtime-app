import { GitHub } from "@mui/icons-material"
import { Alert, Button, CircularProgress, Divider, Grid, Snackbar, TextField, Typography } from "@mui/material"
import { supabaseClient } from "../../data/supabase"
import { useState } from "react"
import { useUser } from "./context/user.context"
import { redirect, useNavigate } from "react-router-dom"

async function signUpNewUser({ email, password }: { email: string, password: string }) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
    })

    return { data, error }
}

async function loginWithGithub() {
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'github',
        options: {
        }
    })

    return { data, error }
}

export const AuthPage = () => {

    const [user, setUser] = useState({ email: '', password: '' })
    const setSession = useUser(state => state.actions.setSession)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState({ show: false, msg: '' })

    const login = async () => {
        setLoading(true)
        const data = await signUpNewUser(user)
        if (data.data.session && data.data.user) {
            setSession(data.data.session)
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

    const loginGithub = async () => {
        setLoading(true)
        const data = await loginWithGithub()
        if (data.error) {
            setErrorMsg({
                msg: `${data.error.code || 'Error'} : ${data.error.message}`,
                show: true
            })
        }
        if (data.data.url) {
            return redirect(data.data.url)
        }
        console.log(data)
        setLoading(false)
    }

    return (
        <Grid sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>

            <Grid className="fondo-animado" sx={{ position: 'absolute', bottom: 0, left: 0, width: '50px', height: '50px', bgcolor: 'secondary.main', display: 'flex', borderRadius: 0, alignItems: 'center', justifyContent: 'center', p: '3px', pb: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                {/* <Grid sx={{ p: 0, bgcolor: 'background.default', padding: 1, borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> */}
                <img src={'/ICON.svg'} height={'100%'} style={{ objectFit: 'contain', }} />
                {/* </Grid> */}
            </Grid>

            <Grid
                className="fondo-animado"
                sx={{
                    width: '400px', height: '400px', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'secondary.main',
                    borderRadius: 1,
                    position: 'relative'
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
                    <Button
                        onClick={loginGithub}
                        variant="outlined" color="secondary" sx={{ width: '200px', margin: 'auto', display: 'flex' }} endIcon={
                            <GitHub />
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
