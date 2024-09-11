import { create } from "zustand";
import { Tables } from "../../../database.types";
import { supabaseClient } from "../../../data/supabase";

type RolContext = {
    rols: Tables<'rols'>[];
    actions: Tables<'actions'>[]
    loading: boolean;
    fill: () => Promise<void>
    setRols: (data: Tables<'rols'>[]) => void
    setActions: (data: Tables<'actions'>[]) => void
}
export const useRols = create<RolContext>((set) => ({
    fill: async () => {
        set({ loading: true })
        const actions = await supabaseClient.from('actions').select()
        const rols = await supabaseClient.from('rols').select()
        set({ actions: actions.data || [], rols: rols.data || [] })
        set({ loading: false })
    },
    loading: false,
    rols: [],
    actions: [],
    setRols(data) {
        set({ rols: data })
    },
    setActions(data) {
        set({ actions: data })
    }
}))