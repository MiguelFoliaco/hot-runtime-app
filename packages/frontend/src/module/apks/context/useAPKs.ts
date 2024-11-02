import { supabaseClient } from "../../../data/supabase";
import { FileObject } from '@supabase/storage-js'
import { create } from "zustand";
type APKsContext = {
    builds: FileObject[]
    setAPKs: (data: FileObject[]) => void
    fillBuilds: (projectName: string) => Promise<void>
}
export const useAPKs = create<APKsContext>((set) => ({
    apks: [],
    builds: [],
    setAPKs: (data) => set({ builds: data }),
    fillBuilds: async (projectName: string) => {
        const data = await supabaseClient.storage.from('apks').list(`debugs/${projectName}`);
        console.log(data)
        if (data.data) {
            set({ builds: data.data })
        }
    }
}))