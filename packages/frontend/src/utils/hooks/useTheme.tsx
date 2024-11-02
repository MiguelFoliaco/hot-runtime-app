import { create } from "zustand";
import { androidTheme, begona, draculaTheme, excelTheme, iosTheme, Otono, serverlessTheme, themePrimary, themeSecondary, threeecondary } from "../../themes/primary";
import { Theme } from "@mui/material";

export type ThemeMap = 'primary' | 'secondary' | 'light' | 'BayronTheme' | 'begoña' | 'Otoño' | 'Dracula' | 'excel' | 'IOS' | 'Android' | 'Serverless'
export const themeNames: ThemeMap[] = ['BayronTheme', 'light', 'primary', 'secondary', 'begoña', 'Otoño', 'Dracula', 'excel', 'IOS', 'Android', 'Serverless']
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
        BayronTheme: threeecondary,
        'begoña': begona,
        'Otoño': Otono,
        Dracula: draculaTheme,
        excel: excelTheme,
        IOS: iosTheme,
        Android: androidTheme,
        Serverless: serverlessTheme
    },
    setTheme: (theme: ThemeMap) => {
        localStorage.setItem('theme', theme)
        set({ themeSelected: theme })
    }
}))