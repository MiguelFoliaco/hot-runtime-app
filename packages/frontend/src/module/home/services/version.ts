import { supabaseClient } from "../../../data/supabase"
import { Tables } from "../../../database.types"

export const getOS = async (setOS: (data: Tables<'OS'>[]) => void) => {
    const request = await supabaseClient.from('OS').select()
    console.log("Request --->", request)
    if (request.data) {
        setOS(request.data)
    }
}