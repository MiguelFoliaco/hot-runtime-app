import { Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'

type IUseHook = {
    actions: {
        setSession: (session?: Session) => void;
    },
    values: {
        user?: User;
        session?: Session;
    }
}

export const useUser = create<IUseHook>(set => ({
    actions: {
        setSession: (data) => set({ values: { user: data?.user, session: data } })
    },
    values: {}
}))