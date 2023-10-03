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
            head: ({theme}: any)=> ({
                fontSize: '12px',
                padding: '10px 12px',
                color: theme.palette.text.secondary
            }),
            body: ({theme}: any)=> ({
                padding: '8px 12px',
                fontSize: '11px',
                color: theme.palette.text.secondary
            }),
            root: ({theme}: any)=> ({
                whiteSpace: 'nowrap',
                borderColor: theme.palette.divider,
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
                padding: '5px', // 6 for 'inter'
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
                fontSize: 11, // 12 for 'inter'
            },
            shrink: {
                fontSize: 15 // 16 for 'poppins'
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
    MuiFormControlLabel: {
        styleOverrides:{
            label:{
                fontSize: 11,
                marginLeft: 5
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
    MuiSwitch: {
        defaultProps: {
            size: 'small'
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
                textTransform: 'none'
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
                fontSize: 12,
            }
        }
    }
})
