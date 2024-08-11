import { create } from "zustand";
import { Tables } from "../../database.types";

type IProject = {
    projects: Tables<'projects'>[]
    projectSelected?: Tables<'projects'>;
    setProjects: (data: IProject['projects']) => void
    setProject: (data: IProject['projectSelected']) => void
}

export const useProject = create<IProject>(set => ({
    projects: [],
    setProject: (data) => set({ projectSelected: data }),
    setProjects: (projects) => set({ projects })
}))