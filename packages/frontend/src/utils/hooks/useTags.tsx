import { create } from "zustand";
import { Tables } from "../../database.types";

type ITargets = {
    tags: Tables<'targets'>[]
    setTags: (data: ITargets['tags']) => void
}

export const useTags = create<ITargets>(set => ({
    tags: [],
    setTags: (data) => set({ tags: data }),
}))