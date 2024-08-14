import { Alert, AlertColor, Button, Checkbox, CircularProgress, FormControlLabel, Grid, IconButton, Snackbar, TextField, Typography } from "@mui/material"
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { Tables } from "../../../../database.types";
import { useEffect, useState } from "react";
import { useProject } from "../../../../utils/hooks/useProjects";
import { Adjust, Close, Public } from "@mui/icons-material";
import { supabaseClient } from "../../../../data/supabase";
import { useUser } from "../../../auth/context/user.context";
import { useComponents } from "../../../../utils/hooks/useComponent";

const initialComponent: Tables<'components'> = {
    code: '',
    codeJSX: `// No import react o react native, use RN.Component, React.useState or useState

const ComponentName=()=>{
  return <RN.Text>Hola mundo</RN.Text>
}`,
    componentParent: null,
    componentParentLeft: null,
    componentParentRight: null,
    componentsChildren: null,
    created_at: new Date().toISOString(),
    id: 0,
    name: '',
    owner: '',
    projectHostory: '',
    projectid: 0,
    public: false,
    main_component: false
}
export const EditorJSX = () => {
    const project = useProject(state => state.projectSelected!)
    const user = useUser(state => state.values.user!)
    const { setComponents, componentSelected: component, setComponent: _setComponent, } = useComponents(state => state!)
    //const [component, _setComponent] = useState<Tables<'components'>>(componentSelected || initialComponent)
    const [msgInfo, setMsgInfo] = useState({ msg: '', show: false, severity: 'success' })
    const [loadingComponent, setLoadingComponent] = useState(false);


    useEffect(() => {
        if (!component) {
            _setComponent(initialComponent)
        }
    }, [])

    function onChange(newValue: string) {
        if (component) {
            _setComponent({
                ...component,
                codeJSX: newValue
            })
        }
    }

    const save = async () => {
        if (!component) return
        if (component?.name.trim() === '') {
            setMsgInfo({
                show: true,
                msg: 'Por favor agrege un nombre al componente',
                severity: 'error'
            })
            return
        }
        setLoadingComponent(true)
        if (component?.id === 0) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const saveProcess = await supabaseClient.from('components').insert({
                //...component,
                projectid: project.id,
                codeJSX: component.codeJSX,
                name: component.name,
                owner: user.email,
                projectHostory: project.name,
                code: '',
                main_component: component.main_component ? true : null
            }, { count: "exact" })
            if (saveProcess.error) {
                if (saveProcess.error.message.includes('duplicate key value violates unique constrain')) {
                    setMsgInfo({
                        msg: "Existe otro componente marcado como punto de entrada, por favor deseleccionelo y vuelva a intentarlo",
                        severity: 'error',
                        show: true
                    })
                }
                else {
                    setMsgInfo({
                        msg: saveProcess.error.message,
                        severity: 'error',
                        show: true
                    })
                }
            } else {
                setMsgInfo({
                    msg: "Se creo el componente correctamente",
                    severity: 'success',
                    show: true
                })
            }

        } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const saveProcess = await supabaseClient.from('components').update({
                //...component,
                projectid: project.id,
                codeJSX: component?.codeJSX,
                name: component?.name,
                owner: user.email,
                projectHostory: project.name,
                code: '',
                main_component: component.main_component ? true : null
            },).eq('id', component?.id)

            console.log(component.main_component === false ? null : true)
            if (saveProcess.error) {
                if (saveProcess.error.message.includes('duplicate key value violates unique constrain')) {
                    setMsgInfo({
                        msg: "Existe otro componente marcado como punto de entrada, por favor deseleccionelo y vuelva a intentarlo",
                        severity: 'error',
                        show: true
                    })
                } else {

                    setMsgInfo({
                        msg: saveProcess.error.message,
                        severity: 'error',
                        show: true
                    })
                }
            } else {
                setMsgInfo({
                    msg: "Se actualizo el componente correctamente",
                    severity: 'success',
                    show: true
                })
            }
        }

        const data = await supabaseClient.from('components').select().eq('projectid', project.id)
        if (data.data) {
            setComponents(data.data)
        }
        setLoadingComponent(false)
    }

    return (
        <Grid sx={{ height: '350px', pl: 2, display: 'flex', gap: 2 }}>
            <AceEditor
                value={component?.codeJSX}
                style={{
                    height: '100%',
                    width: '100%',
                    maxWidth: '750px',
                    borderRadius: '8px'
                }}
                readOnly={loadingComponent}
                mode="javascript"
                theme="monokai"
                enableSnippets
                onChange={onChange}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true, }}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
            <Grid container sx={{ width: '300px', height: '350px', bgcolor: '#1f1f1f', borderRadius: 2, }} alignItems={'self-start'}>
                <Grid item xs={12} p={1}>
                    <Typography variant='overline'>Configuracion adicional</Typography>
                </Grid>
                <Grid item xs={12} p={1}>
                    <TextField disabled={loadingComponent} size='small' label='Nombre' value={component?.name} onChange={(e) => {
                        if (component) {
                            _setComponent({ ...component, name: e.target.value })
                        }
                    }} />
                </Grid>
                <Grid item xs={12} p={1}>
                    <TextField size='small' disabled label='Projecto Padre' focused value={project.name} aria-readonly />
                </Grid>
                <Grid item container xs={12} p={0}>
                    <Grid item xs={12}>
                        <FormControlLabel
                            labelPlacement="start"
                            control={
                                <Checkbox
                                    disabled={loadingComponent}
                                    sx={{ ml: 2 }}
                                    icon={<Public />}
                                    checkedIcon={<Public color="secondary" />}
                                    onChange={() => {
                                        if (component) {
                                            _setComponent({ ...component, public: !component.public })
                                        }
                                    }}
                                    checked={component?.public}
                                />
                            }
                            label="Publico?" />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            labelPlacement="start"
                            control={
                                <Checkbox
                                    disabled={loadingComponent}
                                    sx={{ ml: 2 }}
                                    icon={<Adjust />}
                                    checkedIcon={<Adjust color="secondary" />}
                                    onChange={() => {
                                        if (component) {
                                            _setComponent({ ...component, main_component: !component.main_component })
                                        }
                                    }}
                                    checked={component?.main_component || false}
                                />
                            }
                            label="Punto de entrada" />
                    </Grid>
                    {/* <TextField size='small' disabled label='Projecto Padre' value={project.name} aria-readonly /> */}
                </Grid>
                <Grid item xs={12} p={1}>
                    <Button endIcon={loadingComponent && <CircularProgress size={'20px'} />} disabled={loadingComponent} fullWidth size='small' onClick={save}>Guardar</Button>
                    <Button sx={{ mt: 1 }} endIcon={loadingComponent && <CircularProgress size={'20px'} />} disabled={loadingComponent} fullWidth size='small' onClick={() => {
                        _setComponent(initialComponent)
                    }}>Deseleccionar</Button>
                </Grid>
            </Grid>
            <Snackbar open={msgInfo.show} autoHideDuration={5000}>
                <Alert severity={msgInfo.severity as AlertColor}>{msgInfo.msg}

                    <IconButton onClick={() => setMsgInfo({ show: false, msg: '', severity: 'info' })} size='small' sx={{ ml: 2 }} color={msgInfo.severity === 'error' ? 'error' : 'success'}>
                        <Close fontSize="small" />
                    </IconButton>
                </Alert>
            </Snackbar>
        </Grid>
    )
}
