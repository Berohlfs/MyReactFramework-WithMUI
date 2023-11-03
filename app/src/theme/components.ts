// https://mui.com/material-ui/customization/theme-components/

// MUI
import { Components } from "@mui/material"

export const components = (): Components => ({

    MuiPaper: {
        defaultProps: {
            elevation: 0
        },
        styleOverrides:{
            root: ({theme}: any)=> ({
                borderRadius: 8,
                border: '1px solid',
                borderColor: theme.palette.divider
            })
        }
    },
    MuiTableCell: {
        styleOverrides: {
            head: {
                fontSize: '12px',
                padding: '8px 12px',
            },
            body: {
                padding: '5px 12px',
                fontSize: '10px',
            },
            root: ({theme}: any)=> ({
                whiteSpace: 'nowrap',
                borderColor: theme.palette.divider,
                color: theme.palette.text.secondary
            })
        }
    },
    MuiFormControl: {
        defaultProps: {
            size: 'small'
        }
    },
    MuiSelect: {
        styleOverrides: {
            outlined: {
                padding: '5px 15px',
            }
        }
    },
    MuiOutlinedInput: {
        styleOverrides: {
            input: {
                fontSize: 11,
            },
        }
    },
    MuiInputLabel: {
        styleOverrides:{
            root:{
                fontSize: 11,
            },
            shrink: {
                fontSize: 16
            }
        }
    },
    MuiFormHelperText: {
        styleOverrides: {
            root: {
                fontSize: 10
            }
        }
    },
    MuiCheckbox: {
        defaultProps: {
            size: 'small'
        },
        styleOverrides: {
            root: {
                paddingLeft: 10
            }
        }
    },
    MuiFormControlLabel: {
        styleOverrides:{
            label:{
                fontSize: 11,
            }
        }
    },
    MuiButton: {
        defaultProps: {
            size: 'small',
            variant: 'contained',
            disableElevation: true
        },
        styleOverrides: {
            root: {
                textTransform: 'none',
                fontSize: 11
            }
        }
    },
    MuiChip: {
        defaultProps: {
            size: 'small',
            variant: 'outlined'
        },
        styleOverrides: {
            root: {
                fontSize: '10px',
                fontWeight: 'bold'
            }
        }
    },
    MuiMenu: {
        defaultProps: {
            slotProps: {
                paper: {
                    elevation: 0
                }
            }
        }
    },
    MuiMenuItem: {
        styleOverrides: {
            root: {
                fontSize: 11,
            }
        }
    },
    MuiAlert: {
        styleOverrides: {
            root: {
                border: 'none',
            },
        }
    },
    MuiFormLabel: {
        styleOverrides: {
            root: {
                fontSize: 11
            }
        }
    },
    MuiRadio: {
        defaultProps: {
            size: 'small'
        },
        styleOverrides: {
            root: {
                marginLeft: 5
            }
        }
    },
    MuiSwitch: {
        defaultProps: {
            size: 'small'
        }
    }
})
