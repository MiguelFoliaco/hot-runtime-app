import { create } from "zustand";
import { Tables } from "../../database.types";

type IComponent = {
    components: Tables<'components'>[]
    componentSelected?: Tables<'components'>;
    setComponents: (data: IComponent['components']) => void
    setComponent: (data: IComponent['componentSelected']) => void
}

export const useComponents = create<IComponent>(set => ({
    components: [],
    setComponent: (data) => set({ componentSelected: data }),
    setComponents: (components) => set({ components })
}))