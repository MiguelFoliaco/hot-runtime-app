import { create } from "zustand";
import { Tables } from "../../database.types";

type IVersion = {
    versions: Tables<'version-code'>[]
    oss: Tables<'OS'>[]
    versionSelected?: Tables<'version-code'>;
    setVersions: (data: Tables<'version-code'>[]) => void
    setVersion: (data: Tables<'version-code'>) => void
    setOSs: (data: Tables<'OS'>[]) => void
}

export const useVersion = create<IVersion>(set => ({
    versions: [],
    setVersion: (data) => set({ versionSelected: data }),
    setVersions: (versions) => set({ versions }),
    oss: [],
    setOSs: (oss) => set({ oss })
}))