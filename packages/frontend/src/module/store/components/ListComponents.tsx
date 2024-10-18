import { Grid, IconButton } from '@mui/material'
import { supabaseClient } from '../../../data/supabase'
import { Tables } from '../../../database.types'
import { useEffect, useState } from 'react'
import { ComponentCard } from './ComponentCard'
import { Replay } from '@mui/icons-material'


const listComponents = async (setComponents: (data: Tables<'components'>[]) => void) => {
    const components = await supabaseClient.from('components').select('id,name,created_at,owner,type').eq('public', true)
    if (components.data) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setComponents(components.data)
    }
}

export const ListComponents = () => {

    const [components, setComponents] = useState<Tables<'components'>[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        listComponents(setComponents)
            .finally(() => setLoading(false))
    }, [])

    return (
        <Grid sx={{ p: 1 }}>
            <Grid item xs={12}>
                <IconButton onClick={() => {
                    setLoading(true)
                    listComponents(setComponents)
                        .finally(() => setLoading(false))
                }} disabled={loading} className={loading ? `rotation` : undefined} >
                    <Replay />
                </IconButton>
            </Grid>

            <Grid item xs={12} sx={{ display: 'grid', gap: 3, height: '70vh', gridTemplateColumns: 'repeat(2,1fr)', gridTemplateRows: 'repeat(4,1fr)' }}>
                {
                    components.map(e => <ComponentCard key={`component-item-list-${e.id}`} component={e} />)
                }
            </Grid>
        </Grid>
    )
}
