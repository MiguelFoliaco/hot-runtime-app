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
        },
        text: {
            disabled: '#4e4e4e'
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

export const themeSecondary = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#ff4141',
            light: '#ff6f6f',
            dark: '#a21b1b'
        },
        secondary: {
            main: '#82ecff',
            light: '#a8fff8',
            dark: '#18bcc5'
        },
        text: {
            primary: '#1f1f1f',
            secondary: '#a0a0a0'
        },
        background: {
            paper: '#FFFFFF',
            default: '#fcfcfc'
        }
    },
    typography: {
        allVariants: {
            fontFamily: 'open sans',
            color: '#1f1f1f'
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
export const threeecondary = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ffef41',
            light: '#ecff6f',
            dark: '#92a21b',
            contrastText: '#1f1f1f'
        },
        secondary: {
            main: '#ff8282',
            light: '#ffa8a8',
            dark: '#c51818'
        },
        text: {
            primary: '#1f1f1f',
            secondary: '#a0a0a0'
        },
        background: {
            paper: '#000000',
            default: '#3d3d3d'
        }
    },
    typography: {
        allVariants: {
            fontFamily: 'open sans',
            color: '#ececec'
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