import { createTheme } from "@mui/material";

export const themePrimary = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#D941FF',
            light: '#e26fff',
            dark: '#871ba2'
        },
        secondary: {
            main: '#82FFC1',
            light: '#a8ffd4',
            dark: '#18c56e'
        }
    },
    typography: {
        allVariants: {
            fontFamily: 'open sans',
            color: '#EEEEEE'
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'outlined',
                style: {
                    // backgroundColor: '#d941ff21',
                    // border: '2px solid #d941ff'
                },
            },
        }
    }
})