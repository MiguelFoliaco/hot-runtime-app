import { supabaseClient } from "../../../data/supabase"
import { Tables } from "../../../database.types"

export const getVersions = async (setVersions: (data: Tables<'version-code'>[]) => void, projectId: number) => {
    const data = await supabaseClient.from('version-code').select().eq('projectid', projectId)
    if (data.data) {
        setVersions(data.data)
    }
    return data.data || []
}