import '@fontsource/open-sans'
import './App.css'
import { ModuleEntry } from './module'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Alert, Snackbar } from '@mui/material'
import { useAlert } from './layouts/components/AlertGlobal'
import { useEffect } from 'react'
import { socket } from './services/socket.io'

function App() {

  const state = useAlert()
  useEffect(() => {
    socket.on("connection", (data) => {
      console.log("Socket", data)
    })

    return () => {
      socket.close()
    }
  }, [])
  return <LocalizationProvider
    dateAdapter={AdapterMoment}
  >
    <ModuleEntry />
    <Snackbar open={state.show} autoHideDuration={state.autoHidden || 5000} onClose={state.close}>
      <Alert severity={state.severity}>{state.msg}</Alert>
    </Snackbar>
  </LocalizationProvider>
}

export default App
