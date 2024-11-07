import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

export class CMSServices {
    constructor(private readonly client: SupabaseClient<Database, 'public'>) { }


    getComponents = async (projectId: number) => {
        const components = await this.client.from('components').select('id').eq('projectid', projectId)
        if (!components.data) return components;
        const data = await this.client.from('content').select().in("componentId", components.data.map(e => e.id))
        return data
    }
}