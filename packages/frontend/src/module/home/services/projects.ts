import { supabaseClient } from "../../../data/supabase"
import { Tables } from "../../../database.types";

export const getProjects = async ({ setProjevt }: { setProjevt: (data: Tables<'projects'>[]) => void }) => {
    const projects = await supabaseClient.from('projects').select('*');
    if (projects?.data) {
        setProjevt(projects.data)
    }
}

export const getTags = async ({ setTags }: { setTags: (data: Tables<'targets'>[]) => void }) => {

    const tags = await supabaseClient.from('targets').select()

    if (tags.data) {
        setTags(tags.data)
    }
}