import { createTheme } from "@mui/material";

export const themePrimary = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#D941FF',
            light: '#e26fff',
            dark: '#871ba2',
        },
        secondary: {
            main: '#82FFC1',
            light: '#a8ffd4',
            dark: '#18c56e'
        },
        text: {
            disabled: '#4e4e4e',
            primary: '#FFFFFF',
            secondary: '#c5c5c5'
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
                    backdropFilter: 'blur(3px)'
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
                     backdropFilter: 'blur(3px)'
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
            primary: '#e6e6e6',
            secondary: '#a0a0a0'
        },
        background: {
            paper: '#2a2a2a',
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
                     backdropFilter: 'blur(3px)'
                    // backgroundColor: '#d941ff21',
                    // border: '2px solid #d941ff'
                },
            },
        }
    }
})
export const begona = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#5d5c31',
            light: '#93925b',
            dark: '#4d4c24',
            contrastText: '#efefef'
        },
        secondary: {
            main: '#8c2b32',
            light: '#b6474e',
            dark: '#961010'
        },
        text: {
            primary: '#0d0d0d',
            secondary: '#3d3d3d'
        },
        background: {
            paper: '#ffffff',
            default: '#f7efef'
        }
    },
    typography: {
        allVariants: {
            fontFamily: 'open sans',
            color: '#0d0d0d'
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'outlined',
                style: {
                     backdropFilter: 'blur(3px)'
                    // backgroundColor: '#d941ff21',
                    // border: '2px solid #d941ff'
                },
            },
        }
    }
})
export const Otono = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#E94823',
            light: '#f56e50',
            dark: '#ae3014',
            contrastText: '#f1f1f1'
        },
        secondary: {
            main: '#d8d8d8',
            light: '#e9dddd',
            dark: '#c0abab',
            contrastText: '#292929'
        },
        text: {
            primary: '#0d0d0d',
            secondary: '#3d3d3d'
        },
        background: {
            paper: '#ffffff',
            default: '#f7efef'
        }
    },
    typography: {
        allVariants: {
            fontFamily: 'open sans',
            color: '#0d0d0d'
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'outlined',
                style: {
                     backdropFilter: 'blur(3px)'
                    // backgroundColor: '#d941ff21',
                    // border: '2px solid #d941ff'
                },
            },
        }
    }
})

export const draculaTheme = createTheme({
    palette: {
        mode: 'dark', // Dracula theme is a dark theme
        primary: {
            main: '#bd93f9', // Purple
            light: '#ceaffa',
            dark: '#602fa5',
            contrastText: '#f8f8f2'
        },
        secondary: {
            main: '#ff79c6', // Pink
            light: '#ff9ad3',
            dark: '#bc257a'
        },
        background: {
            default: '#282a36', // Background color
            paper: '#44475a', // Paper background
        },
        text: {
            primary: '#f8f8f2', // Text color
            secondary: '#6272a4', // Secondary text color
        },
        error: {
            main: '#ff5555', // Error color
        },
    },
    typography: {
        allVariants: {
            fontFamily: 'open sans',
            color: '#f8f8f2'
        }
    },
});

export const excelTheme = createTheme({
    palette: {
        mode: 'light', // Excel theme is a light theme
        primary: {
            main: '#0078d4', // Excel blue
            light: '#2ea2fa',
            dark: '#04599a',
            contrastText: '#000000'
        },
        secondary: {
            main: '#00bfae', // Excel teal
            light: '#2ff3e2',
            dark: '#028b7f',
            contrastText: '#f8f8f2'
        },
        background: {
            default: '#ffffff', // Background color
            paper: '#f3f3f3', // Paper background
        },
        text: {
            primary: '#000000', // Text color
            secondary: '#333333', // Secondary text color
        },
        error: {
            main: '#d83b01', // Error color
        },
    },
    typography: {
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    components: {
        // Customizing components to match Excel theme
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '2px', // Excel buttons have rounded corners
                    textTransform: 'none', // Preserve text case
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '4px', // Excel cards have slightly rounded corners
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // Subtle shadow
                },
            },
        },
    },
});


export const iosTheme = createTheme({
    palette: {
        mode: 'light', // iOS theme is a light theme
        primary: {
            main: '#007aff', // iOS blue
        },
        secondary: {
            main: '#34c759', // iOS green
        },
        background: {
            default: '#f9f9f9', // Light background
            paper: '#ffffff', // Paper background
        },
        text: {
            primary: '#000000', // Text color
            secondary: '#8e8e93', // Secondary text color
        },
        error: {
            main: '#ff3b30', // Error color
        },
    },
    typography: {
        fontFamily: 'Helvetica Neue, Arial, sans-serif',
        button: {
            textTransform: 'none', // Preserve text case
        },
    },
    components: {
        // Customizing components to match iOS theme
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px', // Rounded corners similar to iOS buttons
                    padding: '8px 16px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '10px', // Rounded corners for cards
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Subtle shadow
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '10px', // Rounded corners for paper
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // Subtle shadow
                },
            },
        },
    },
});

export const androidTheme = createTheme({
    palette: {
        mode: 'light', // Android theme is a light theme
        primary: {
            main: '#6200ea', // Android purple
        },
        secondary: {
            main: '#03dac6', // Android teal
        },
        background: {
            default: '#ffffff', // Light background
            paper: '#f5f5f5', // Paper background
        },
        text: {
            primary: '#000000', // Text color
            secondary: '#616161', // Secondary text color
        },
        error: {
            main: '#b00020', // Error color
        },
    },
    typography: {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        button: {
            textTransform: 'none', // Preserve text case
        },
    },
    components: {
        // Customizing components to match Android theme
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '4px', // Android buttons have slightly rounded corners
                    padding: '8px 16px',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '4px', // Rounded corners for cards
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // Subtle shadow
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: '4px', // Rounded corners for paper
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // Subtle shadow
                },
            },
        },
    },
});

export const serverlessTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FF5E5B', // Rojo brillante, estilo acento
        },
        secondary: {
            main: '#FF5E5B', // Cian vibrante para contrastes
        },
        warning: {
            main: '#FF5E5B'
        },
        background: {
            // default: '#1F1F1F', // Fondo oscuro
            // paper: '#2B2B2B',   // Fondo ligeramente más claro para elementos
        },
        text: {
            primary: '#FFFFFF', // Texto claro
            secondary: '#A0A0A0', // Texto en gris para menor importancia
            disabled: '#111'
        },
        divider: '#3A3A3A', // Divisor para separar secciones
    },
    typography: {
        fontFamily: '"Roboto", sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 700,
            color: '#FF5E5B',
        },
        h2: {
            fontSize: '1.8rem',
            fontWeight: 600,
            color: '#FF5E5B',
        },
        h3: {
            fontSize: '1.6rem',
            fontWeight: 500,
            color: '#FFFFFF',
        },
        body1: {
            fontSize: '1rem',
            color: '#A0A0A0',
        },
        button: {
            textTransform: 'none', // Mantener el texto de botones sin transformar a mayúsculas
        },
        allVariants: {
            color: '#A0A0A0'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    backgroundColor: '#FF5E5B',
                    '&:hover': {
                        backgroundColor: '#FF3D3B',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#2B2B2B',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1F1F1F',
                },
            },
        },
    },
});