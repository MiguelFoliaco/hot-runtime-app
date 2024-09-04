import { create } from "zustand";
import { themePrimary, themeSecondary, threeecondary } from "../../themes/primary";
import { Theme } from "@mui/material";

export type ThemeMap = 'primary' | 'secondary' | 'light' | 'BayronTheme'
export const themeNames: ThemeMap[] = ['BayronTheme', 'light', 'primary', 'secondary']
type ThemeHook = {
    themeSelected: ThemeMap,
    themeList: Record<ThemeMap, Theme>
    setTheme: (theme: ThemeMap) => void
}
export const useThemeClient = create<ThemeHook>(set => ({
    themeSelected: 'primary',
    themeList: {
        light: themeSecondary,
        primary: themePrimary,
        secondary: themeSecondary,
        BayronTheme: threeecondary
    },
    setTheme: (theme: ThemeMap) => {
        localStorage.setItem('theme', theme)
        set({ themeSelected: theme })
    }
}))