import { Button, Grid, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { useComponents } from "../../../../utils/hooks/useComponent"
import { InterfaceSchema, TypeData, Form as F, useForm } from "schema-interface-generator"
import { TypeView } from "schema-interface-generator/src/types/schema"
import { supabaseClient } from "../../../../data/supabase"
import { useAlert } from "../../../../layouts/components/AlertGlobal"


export const Form = () => {

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
        console.log(match, "Match")
        if (!match) return;
        const text = match[0]
        if (text !== null) {
            const properties = text.replace('/*@json-form', '').replace('*/', '').replace('\n', '').trim().split('\n').map(e => e.trim());
            const formScheam: InterfaceSchema = {
                properties: {},
                type: 'object'
            }

            properties.forEach(e => {
                //  text:string|Texto
                // color:string|Color|color
                const parse2 = e.split('|');
                formScheam.properties[parse2[0]] = {
                    type: parse2[1] as TypeData,
                    title: parse2[2],
                    config: {
                        type: parse2[3] as TypeView || undefined
                    }
                }
            })

            setFormSchema(formScheam)
        }

    }, [componentSelected])

    const onSubmit = async (e: any) => {
        if (!componentSelected) return;
        if (!formSchema) return;
        const data = form(e, formSchema)
        console.log(data)
        if (data instanceof Array) {
            console.log(data)
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
            {
                formSchema &&
                <F
                    onSubmit={onSubmit}
                    schema={formSchema}
                    theme={{ ...theme, components: { MuiTextField: { defaultProps: { size: 'small' } } } }}
                    defaultValue={JSON.parse(componentSelected?.props || '{}')}
                >
                    <Button size='small' sx={{ mt: 2 }} fullWidth color='secondary' type='submit'>Guardar</Button>
                </F>
            }
        </Grid>
    )
}