import { AlertColor } from "@mui/material";
import { create } from "zustand";

type IAlertConfig = {
    msg: string
    show: boolean;
    severity: AlertColor
    autoHidden?: number
    close: () => void
    openAlert: (data: {
        msg: string
        show?: boolean;
        severity: AlertColor
        autoHidden?: number
    }) => void
}
export const useAlert = create<IAlertConfig>(set => ({
    msg: '',
    openAlert: ({ msg, severity, show, autoHidden }) => {
        set({
            autoHidden,
            severity: severity,
            show: show || true,
            msg
        })
    },
    severity: 'info',
    show: false,
    close: () => {
        set({ show: false })
        const id = setTimeout(() => {
            set({ msg: '', severity: 'info', autoHidden: 5000 })
            clearTimeout(id)
        }, 500)

    }
}))