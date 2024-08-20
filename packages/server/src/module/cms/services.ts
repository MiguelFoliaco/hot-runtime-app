import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

export class CMSServices {
    constructor(private client: SupabaseClient<Database, 'public'>) { }


    getComponents = async (projectId: number) => {
        return await this.client.from('components').select('id,props,name').eq('projectid', projectId)
    }
}