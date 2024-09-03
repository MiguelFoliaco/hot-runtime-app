import { Button, Grid, Typography, useTheme } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import { useComponents } from "../../../../utils/hooks/useComponent"
import { InterfaceSchema, TypeData, Form as F, useForm } from "schema-interface-generator"
import { TypeView } from "schema-interface-generator/src/types/schema"
import { supabaseClient } from "../../../../data/supabase"
import { useAlert } from "../../../../layouts/components/AlertGlobal"
import { LockOutlined } from "@mui/icons-material"


type props = {
    setInfoCompilation?: (text: string) => void
}
export const Form = ({ setInfoCompilation }: props) => {

    const theme = useTheme()
    const { openAlert } = useAlert()
    const { componentSelected } = useComponents()
    const [formSchema, setFormSchema] = useState<InterfaceSchema>()
    const form = useForm();

    useEffect(() => {
        if (!componentSelected) return;
        const str = componentSelected.codeJSX;
        const reg = /\/\*@json-form[\s\S]*?\*\//g
        const match = str.match(reg);
        if (!match) {
            setFormSchema(undefined)
            return;
        };
        const text = match[0]
        if (text !== null) {
            const properties = text.replace('/*@json-form', '').replace('*/', '').replace('\n', '').trim().split('\n').map(e => e.trim());
            const formScheam: InterfaceSchema = {
                properties: {},
                type: 'object',
                required: []
            }

            properties.forEach(e => {
                const parse2 = e.split('|');
                //  text:string|Texto
                // color:string|Color|color
                if (parse2[4]) {
                    if (parse2[4] === 'true') {
                        formScheam?.required?.push(parse2[0])
                    }
                }
                formScheam.properties[parse2[0]] = {
                    type: parse2[1] as TypeData,
                    title: parse2[2],
                    config: {
                        type: parse2[3] as TypeView || undefined,
                    }
                }
            })

            setFormSchema(formScheam)
        }
        else {
            setFormSchema(undefined)
        }

    }, [componentSelected])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (!componentSelected) return;
        if (!formSchema) return;
        const data = form(e, formSchema)
        console.log(data)
        if (data instanceof Array) {
            console.log(data)
            if (setInfoCompilation) {
                setInfoCompilation(JSON.stringify(data, null, 3))
            }
            return;
        }
        const update = await supabaseClient.from('components').update({
            props: JSON.stringify(data)
        }).eq("id", componentSelected.id);

        if (update.error === null) {
            openAlert({
                msg: "Componente actualizado con exito",
                severity: 'success'
            })
        }
    }

    return (
        <Grid sx={{ width: '100%', height: '350px', bgcolor: '#1f1f1f', borderRadius: 2, p: 2 }}>
            <Grid sx={{ width: '50%', margin: 'auto' }}>
                {
                    formSchema ?
                        <F
                            className="form scroll"
                            onSubmit={onSubmit}
                            schema={formSchema}
                            theme={{ ...theme, components: { MuiTextField: { defaultProps: { size: 'small' } } } }}
                            defaultValue={JSON.parse(componentSelected?.props || '{}')}
                        >
                            <Button size='small' sx={{ mt: 2 }} variant='contained' fullWidth color='secondary' type='submit'>Guardar</Button>
                        </F>
                        :
                        <Grid sx={{ m: 3, alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Typography>No se encontraron formularios</Typography>
                            <LockOutlined color='secondary' fontSize="large" />
                        </Grid>

                }
            </Grid>
        </Grid>
    )
}