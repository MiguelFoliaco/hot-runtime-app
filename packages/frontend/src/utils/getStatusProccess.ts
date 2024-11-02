import { supabaseClient } from "../data/supabase";
import { Tables } from "../database.types";
import { PROCESS_TYPE } from "../types/proccess_enums";

export const statusProccess = async (processID: PROCESS_TYPE, setData: (data: Tables<'process'>) => void) => {
    const process = await supabaseClient.from('process').select().eq('process_id', processID);
    if (process.data) {
        setData(process.data[0])
        return;
    }
    if (process.error) {
        console.log(process.error)
    }
}