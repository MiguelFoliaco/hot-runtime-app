import { Button, Grid, Skeleton, Typography, useTheme } from "@mui/material"
import { FormEvent, useEffect, useState } from "react"
import { useComponents } from "../../../../utils/hooks/useComponent"
import { InterfaceSchema, TypeData, Form as F, useForm } from "schema-interface-generator"
import { TypeView } from "schema-interface-generator/src/types/schema"
import { supabaseClient } from "../../../../data/supabase"
import { useAlert } from "../../../../layouts/components/AlertGlobal"
import { LockOutlined } from "@mui/icons-material"
import { Json, Tables } from "../../../../database.types"


type props = {
    setInfoCompilation?: (text: string) => void
}
export const Form = ({ setInfoCompilation }: props) => {

    const theme = useTheme()
    const { openAlert } = useAlert()
    const { componentSelected } = useComponents()
    const [formSchema, setFormSchema] = useState<InterfaceSchema>()
    const [loadingProps, setLoadingProps] = useState(true)
    const [content, setContent] = useState<Tables<'content'>>()
    const form = useForm<Json>();

    useEffect(() => {
        if (!componentSelected) {
            setLoadingProps(false);
            return
        };
        setLoadingProps(true)
        getProps(componentSelected.id).then((res) => {
            if (res) {
                setContent(res)
                return;
            }
            openAlert({
                msg: 'Ocurrio un error al extraer los datos',
                severity: 'error'
            })
        })
            .finally(() => {
                setLoadingProps(false)
            })
        const str = componentSelected.codeJSX;
        const reg = /\/\*@json-form[\s\S]*?\*\//g
        const match = str.match(reg);
        if (!match) {
            setFormSchema(undefined)
        }
        else {
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
        }

    }, [componentSelected])

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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
        if (content) {
            const update = await supabaseClient.from('content').update({
                data
            }).eq("id", content.id);

            if (update.error === null) {
                openAlert({
                    msg: "Componente actualizado con exito",
                    severity: 'success'
                })
            }
        }
        else {
            const update = await supabaseClient.from('content').insert({
                componentId: componentSelected.id,
                title: '',
                data,
                date_plublish: new Date().toISOString(),
            })
            if (update.error === null) {
                openAlert({
                    msg: "Componente actualizado con exito",
                    severity: 'success'
                })
            }
        }

    }

    return (
        <Grid sx={{ width: '100%', height: '350px', bgcolor: 'background.paper', borderRadius: 2, p: 2, border: t => `1px solid ${t.palette.text.secondary}30` }}>
            {
                loadingProps ? <Skeleton width={'100%'} height='350px' />
                    :
                    <Grid sx={{ width: '50%', margin: 'auto' }}>
                        {
                            formSchema ?
                                <F
                                    className="form scroll"
                                    onSubmit={onSubmit}
                                    schema={formSchema}
                                    theme={{ ...theme, components: { MuiTextField: { defaultProps: { size: 'small' } } } }}
                                    defaultValue={content?.data}
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
            }
        </Grid>
    )
}


const getProps = async (id: number, date: string = new Date().toISOString()) => {
    const getData = async () => await supabaseClient.from('content').select().eq('componentId', id)
        .gte('date_plublish', '1999-01-01T00:00:00z')
        .lte('date_plublish', date)

    const key = `props#${id}`;
    const prevSave = localStorage.getItem(key)
    console.log("pre save", prevSave)
    if (prevSave) {
        const contentPrev = JSON.parse(prevSave) as Tables<'content'> & { cache_control: number };
        if (contentPrev.cache_control > new Date().getTime() + (60 * 60 * 10 * 1000)) {
            const item = await getData()
            if (item.data) {
                return item?.data[0]
            }
            return null;
        }
        return contentPrev;
    }
    const item = await getData();
    if (item.data) {
        localStorage.setItem(key, JSON.stringify({ ...item.data[0], cache_control: new Date().getTime() + (60 * 60 * 10 * 1000) }))
        return item?.data[0];
    }
    return null;


}