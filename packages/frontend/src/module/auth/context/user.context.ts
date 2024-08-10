import { Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'

type IUseHook = {
    actions: {
        setUser: (user?: User) => void;
        setSession: (session?: Session) => void;
    },
    values: {
        user?: User;
        session?: Session;
    }
}

export const useUser = create<IUseHook>(set => ({
    actions: {
        setSession: (data) => set({ values: { session: data } }),
        setUser: (data) => set({ values: { user: data } }),
    },
    values: {}
}))